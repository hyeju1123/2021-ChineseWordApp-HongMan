import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions, Image, TextInput } from 'react-native';
import customAxios from '../auth/customAxios';

import Edit from '../../images/module/edit.png';
import LanternOn from '../../images/lantern/lanternOn.png';
import LanternOff from '../../images/lantern/lanternOff.png';
import Next from '../../images/module/next.png';
import Images from '../ImageIndex';

function HskWordDetail({ route, navigation }) {
    // const { word, intonation, wordClass, meaning, newMeaning, explanation } = route.params;
    let { list, wordNum, memo } = route.params;
    console.log('list: ', list[wordNum])
    console.log('wordNum: ', wordNum)

    const [marking, setMarking] = useState(memo !== null ? memo.includedVocab : false);
    const [meaningValue, setMeaningValue] = useState(
        memo !== null && memo.meaning !== '' ?
        memo.meaning :
        list[wordNum].meaning
    )
    const [explanationValue, setExplanationValue] = useState(
        memo !== null ?
        memo.explanation :
        ''
    )

    // const getMeaningList = () => {
    //     let config = { params: { wordNum: wordId }}
    //     customAxios().then(res => {
    //         res.get('/defaultWord/getWordMeanings', config)
    //         .then(res => {
    //             console.log(res.data);
    //             setMeaningList(res.data);
    //             // setLoading(false);
    //         })
    //         .catch(e => console.log(e))    
    //     })
    // }

    // const getHskMeaning = () => {
    //     customAxios().then(res => {
    //         res.get('/hskWord/findMeaning')
    //             .then(res => {
    //                 console.log(res.data);
    //                 setHskMeaning(res.data);
    //             })
    //             .catch((e => console.log(e)))
    //     })
    // }

    const handleMarking = () => {
        setMarking(!marking);
    }

    const showWordClass = (wordClass, index) => {
        switch (wordClass) {
            case "명사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.noun} />;
            case "대명사":
                return <Image key={index} style={styles.longWordClassIcon} source={Images.wordClass.pronoun} />;
            case "동사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.verb} />;
            case "형용사":
                return <Image key={index} style={styles.longWordClassIcon} source={Images.wordClass.adjective} />;
            case "부사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.adverb} />;
            case "개사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.preposition} />;
            case "접속사":
                return <Image key={index} style={styles.longWordClassIcon} source={Images.wordClass.conjunction} />;
            case "양사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.quantifier} />;
            case "조사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.postposition} />;
            case "조동사":
                return <Image key={index} style={styles.longWordClassIcon} source={Images.wordClass.auxiliary} />;
            case "감탄사":
                return <Image key={index} style={styles.longWordClassIcon} source={Images.wordClass.exclamation} />;
            case "성어":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.idiom} />;
            case "수사":
                return <Image key={index} style={styles.wordClassIcon} source={Images.wordClass.numeral} />;
            default:
                break;
        }
    }

    const goForward = () => {
        if ((wordNum + 1) === list.length) {
            return 
        } else {
            navigation.navigate('HskWordDetail', {
                list: list,
                wordNum: wordNum + 1,
                memo: list[wordNum + 1].memo
            });
        }
    }
    const goBackward = () => {
        if (wordNum === 0) {
            return
        } else {
            navigation.navigate('HskWordDetail', {
                list: list,
                wordNum: wordNum - 1,
                memo: list[wordNum - 1].memo
            });
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${wordNum+1}/${list.length}`,
            headerTitleAlign: 'center',
        })
        setMeaningValue(
            memo !== null && memo.meaning !== '' ?
            memo.meaning :
            list[wordNum].meaning
        )
        setExplanationValue(
            memo !== null ?
            memo.explanation :
            ''
        )
        setMarking(
            memo !== null ?
            memo.includedVocab :
            false
        )
        return () => {
            wordNum = 0;
            navigation.setOptions({
                headerTitle: ''
              })
        };
    }, [wordNum])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <View style={styles.wordCard}>
                        <Text style={styles.wordText}>{list[wordNum].word}</Text>
                        <Text style={styles.intonationText}>{list[wordNum].intonation}</Text>
                    </View>
                    <View style={styles.wordClassCard}>
                        {list[wordNum].wordClass.split(', ').map((data, index) => {
                            return showWordClass(data, index)
                        })}
                    </View>
                    <View style={styles.meaningCard}>
                        <Text style={styles.meaningText}>
                            {
                                memo !== null && memo.meaning !== '' ?
                                memo.meaning :
                                list[wordNum].meaning
                            }
                        </Text>
                        <Image style={styles.editIcon} source={Edit} />
                    </View>
                    <TextInput 
                        value={explanationValue}
                        onChangeText={setExplanationValue}
                        style={styles.explanationCard} 
                        placeholder='#메모' 
                        placeholderTextColor='lightgray'
                        multiline={true}
                    />
                    <View style={styles.wordNavigation}>
                        <TouchableOpacity onPress={goBackward}>
                            <Image style={styles.previousIcon} source={Next} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleMarking}>
                            {marking ?
                            <Image style={styles.lanternOnIcon} source={LanternOn} /> :
                            <Image style={styles.lanternOffIcon} source={LanternOff} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goForward}>
                            <Image style={styles.nextIcon} source={Next} />
                        </TouchableOpacity>
                    </View>
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
        marginTop: width * 0.03
    },
    wordCard: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        elevation: 10,
        marginBottom: width * 0.05
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
        marginBottom: width * 0.05,
        paddingRight: width * 0.03
    },
    wordClassIcon: {
        width: width * 0.17,
        height: width * 0.1,
        marginTop: width * 0.02,
        marginBottom: width * 0.02,
        marginLeft: width * 0.03,
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
        marginBottom: width * 0.05,
    },
    meaningText: {
        color: '#3E3A39',
        flex: 1,
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.055,
        lineHeight: 78,
        marginLeft: width * 0.03,
        marginTop: width * 0.02
    },
    editIcon: {
        width: width * 0.08,
        height: width * 0.08,
        marginTop: width * 0.028,
        marginBottom: width * 0.028,
        marginRight: width * 0.03
    },
    explanationCard: {
        width: '100%',
        minHeight: width * 0.15,
        display: 'flex',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
        marginBottom: width * 0.05,
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.045,
        paddingLeft: width * 0.02,
    },
    wordNavigation: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: width * 0.13,
        marginBottom: width * 0.05
    },
    lanternOnIcon: {
        width: width * 0.13,
        height: width * 0.14,
    },
    lanternOffIcon: {
        width: width * 0.12,
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
