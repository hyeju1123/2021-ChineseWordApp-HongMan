import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, TextInput } from 'react-native';

import Edit_White from '../../images/module/edit_white.png';
import LanternOn from '../../images/lantern/lanternOn.png';
import LanternOff from '../../images/lantern/lanternOff.png';
import Next from '../../images/module/next.png';
import Images from '../ImageIndex';

function HskWordDetail({ route, navigation }) {
    
    let { hskId, list, wordNum, memo, updateHskWordList, updateHskMarking } = route.params;

    const [marking, setMarking] = useState(memo !== null ? memo.vocabId !== 0 : false);

    const addHskToVocab = () => {
        navigation.navigate('AddVocabPage', {
            hskId: hskId,
            word: list[wordNum].word,
            intonation: list[wordNum].intonation.substr(1, list[wordNum].intonation.length - 2),
            wordC: list[wordNum].wordClass.split(', '),
            mean: (memo !== null && memo.meaning !== null && memo.meaning !== '')  ? memo.meaning : list[wordNum].meaning,
            explanation: (memo !== null && memo.explanation !== null && memo.explanation !== '') ? memo.explanation : '',
            groupId: 0,
            groupName: '',
            nonInsertedMemo: memo !== null ? false : true,
            handleMarking: updateHskMarking
        });
    }

    const showWordClass = (wordClass, index) => {
        return <Image key={index} style={wordClass.length === 2 ? styles.wordClassIcon : styles.longWordClassIcon} source={Images.wordClass[wordClass]} />;
    }

    const goForward = () => {
        if ((wordNum + 1) === list.length) {
            return 
        } else {
            navigation.navigate('HskWordDetail', {
                hskId: hskId !== 0 ? hskId + 1 : 0,
                list: list,
                wordNum: wordNum + 1,
                memo: updateHskMarking !== null ? list[wordNum + 1].memo : null
            });
        }
    }
    const goBackward = () => {
        if (wordNum === 0) {
            return
        } else {
            navigation.navigate('HskWordDetail', {
                hskId: hskId !== 0 ? hskId - 1 : 0,
                list: list,
                wordNum: wordNum - 1,
                memo: updateHskMarking !== null ? list[wordNum - 1].memo : null
            });
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${wordNum+1}/${list.length}`,
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity onPress={() => {navigation.navigate('UpdateVocabPage', {
                    hskId: hskId,
                    vocabId: list[wordNum].vocabId,
                    word: list[wordNum].word,
                    intonation: list[wordNum].intonation.substr(1, list[wordNum].intonation.length - 2),
                    wordC: list[wordNum].wordClass.split(', '),
                    mean: memo !== null && memo.meaning !== '' ? memo.meaning : list[wordNum].meaning,
                    explanation: memo !== null ? memo.explanation : (updateHskMarking === null ? list[wordNum].explanation : ''),
                    updateHskWordList: updateHskWordList
                })}}>
                    <Image style={styles.editIcon} source={Edit_White}/>
                </TouchableOpacity>
            ),
        })
        setMarking(
            memo !== null ?
            memo.vocabId !== 0 :
            false
        )
        return () => {
            wordNum = 0;
            navigation.setOptions({
                headerTitle: ''
              })
        };
    }, [wordNum, list])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <View style={styles.wordCard}>
                        <Text style={styles.wordText}>{list[wordNum].word}</Text>
                        <Text style={styles.intonationText}>
                            {
                                (memo !== null && memo.intonation !== '')
                                ? memo.intonation
                                : list[wordNum].intonation
                            }
                        </Text>
                    </View>
                    <View style={styles.wordClassCard}>
                        {
                            (memo !== null && memo.wordClass !== '')
                            ? memo.wordClass.split(', ').map((data, index) => {return showWordClass(data, index)})
                            : list[wordNum].wordClass.split(', ').map((data, index) => {return showWordClass(data, index)})
                        }
                    </View>
                    <View style={styles.meaningCard}>
                        <Text style={styles.meaningText}>
                            {
                                (memo !== null && memo.meaning !== '') 
                                ? memo.meaning 
                                : list[wordNum].meaning
                            }
                        </Text>
                    </View>
                    <View style={styles.meaningCard}>
                        {
                            (memo !== null && memo.explanation !== '')
                            ? <Text style={styles.meaningText}>
                                {memo.explanation}
                              </Text> 
                            : <Text style={styles.explanationText}>
                                {updateHskMarking === null & list[wordNum].explanation !== '' 
                                ? list[wordNum].explanation
                                : '#메모'

                                }
                              </Text>
                        }
                    </View>
                </View>
                <View style={styles.wordNavigation}>
                    <TouchableOpacity onPress={goBackward}>
                        <Image style={styles.previousIcon} source={Next} />
                    </TouchableOpacity>
                    {
                        updateHskMarking === null
                        ? (<></>)
                        : marking 
                            ? (<TouchableOpacity>
                                <Image style={styles.lanternIcon} source={LanternOn} /> 
                            </TouchableOpacity>) 
                            : (<TouchableOpacity onPress={() =>addHskToVocab()}>
                                <Image style={styles.lanternIcon} source={LanternOff} />
                            </TouchableOpacity>)
                    }
                    <TouchableOpacity onPress={goForward}>
                        <Image style={styles.nextIcon} source={Next} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    cardContainer: {
        width: '85%',
        marginTop: width * 0.03,
        marginBottom: width * 0.3
    },
    editButtonWrapper: {
        width: width * 0.15,
        height: width * 0.15,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: (width * 0.15) / 2,
        backgroundColor: '#ffffff',
        elevation: 15,
    },
    wordCard: {
        display: 'flex',
        width: '100%',
        minHeight: width * 0.45,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginBottom: width * 0.07
    },
    wordText: {
        color: '#3E3A39',
        fontFamily: 'PingFangFCLight',
        fontSize: width * 0.2
    },
    intonationText: {
        color: '#D14124',
        fontFamily: 'KoPubWorld Dotum Bold',
        fontSize: width * 0.05,
        marginBottom: width * 0.03
    },
    wordClassCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
        marginBottom: width * 0.07,
        paddingRight: width * 0.035,
        paddingTop: width * 0.015,
        paddingBottom: width * 0.015
    },
    wordClassIcon: {
        width: width * 0.17,
        height: width * 0.1,
        marginTop: width * 0.02,
        marginBottom: width * 0.02,
        marginLeft: width * 0.035,
    },
    longWordClassIcon: {
        width: width * 0.24,
        height: width * 0.1,
        marginTop: width * 0.02,
        marginBottom: width * 0.02,
        marginLeft: width * 0.03,
    },
    meaningCard: {
        width: '100%',
        minHeight: width * 0.15,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
        marginBottom: width * 0.07,
        paddingRight: width * 0.035,
        paddingTop: width * 0.015,
        paddingBottom: width * 0.015
    },
    meaningText: {
        color: '#3E3A39',
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.055,
        lineHeight: 39,
        marginLeft: width * 0.035,
        marginTop: width * 0.02
    },
    explanationText: {
        color: '#8E8E8E',
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.055,
        lineHeight: 39,
        marginLeft: width * 0.035,
        marginTop: width * 0.02
    },
    editIcon: {
        width: width * 0.08,
        height: width * 0.08,
        marginTop: width * 0.028,
        marginBottom: width * 0.028,
        marginRight: width * 0.03
    },
    wordNavigation: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: width * 0.1
    },
    lanternIcon: {
        width: width * 0.13,
        height: width * 0.14,
    },
    previousIcon: {
        width: width * 0.09,
        height: width * 0.09,
        transform: [{ scaleX: -1 }]
    },
    nextIcon: {
        width: width * 0.09,
        height: width * 0.09,
    },
});

export default HskWordDetail
