import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Dimensions, Image } from 'react-native';

import styles from './styles/HskWordDetailStyle';
import Edit_White from '../../images/module/edit_white.png';
import Edit_Red from '../../images/module/edit.png';
import LanternOn from '../../images/lantern/lanternOn.png';
import LanternOff from '../../images/lantern/lanternOff.png';
import BlackOff from '../../images/lantern/blackLanternOff.png';
import Next from '../../images/module/nextW.png';
import NextB from '../../images/module/nextB.png';
import Images from '../ImageIndex';

function HskWordDetail({ route, navigation }) {
    
    let { hskId, list, wordNum, memo, color, updateHskWordList, updateHskMarking } = route.params;
    let theme =  {
        r: '#D14124',
        w: '#FFFFFF'
    }

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
                    intonation: (memo !== null && memo.intonation !== '')
                                ? memo.intonation.substr(1, memo.intonation.length - 2)
                                : list[wordNum].intonation.substr(1, list[wordNum].intonation.length - 2),
                    wordC: (memo !== null && memo.intonation !== '')
                            ? memo.wordClass.split(', ')
                            : list[wordNum].wordClass.split(', '),
                    mean: memo !== null && memo.meaning !== '' ? memo.meaning : list[wordNum].meaning,
                    explanation: memo !== null ? memo.explanation : (updateHskMarking === null ? list[wordNum].explanation : ''),
                    updateHskWordList: updateHskWordList
                })}}>
                    <Image style={styles.editIcon} source={color === 'r' ? Edit_White : Edit_Red}/>
                </TouchableOpacity>
            ),
        })
        setMarking(
            memo !== null ?
            memo.vocabId !== 0 :    // 0이 아니어야 hsk 단어(0이면 단어장 단어)
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
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color]}]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <View style={[styles.wordCard, color === 'w' && {borderColor: '#3E3A39', borderWidth: 0.5}]}>
                        <Text style={styles.wordText}>{list[wordNum].word}</Text>
                        <Text style={[styles.intonationText, {color: color === 'r' ? '#D14124' : '#707070'}]}>
                            {
                                (memo !== null && memo.intonation !== '')
                                ? memo.intonation
                                : list[wordNum].intonation
                            }
                        </Text>
                    </View>
                    <View style={[styles.wordClassCard, color === 'w' && {borderColor: '#3E3A39', borderWidth: 0.5}]}>
                        {
                            (memo !== null && memo.wordClass !== '')
                            ? memo.wordClass.split(', ').map((data, index) => {return showWordClass(data, index)})
                            : list[wordNum].wordClass.split(', ').map((data, index) => {return showWordClass(data, index)})
                        }
                    </View>
                    <View style={[styles.meaningCard, color === 'w' && {borderColor: '#3E3A39', borderWidth: 0.5}]}>
                        <Text style={styles.meaningText}>
                            {
                                (memo !== null && memo.meaning !== '') 
                                ? memo.meaning 
                                : list[wordNum].meaning
                            }
                        </Text>
                    </View>
                    <View style={[styles.meaningCard, color === 'w' && {borderColor: '#3E3A39', borderWidth: 0.5}]}>
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
                        <Image style={styles.previousIcon} source={color === 'r' ? Next : NextB} />
                    </TouchableOpacity>
                    {
                        updateHskMarking === null
                        ? (<></>)
                        : marking 
                            ? (<TouchableOpacity>
                                <Image style={styles.lanternIcon} source={LanternOn} /> 
                            </TouchableOpacity>) 
                            : (<TouchableOpacity onPress={() =>addHskToVocab()}>
                                <Image style={styles.lanternIcon} source={color === 'r' ? LanternOff: BlackOff} />
                            </TouchableOpacity>)
                    }
                    <TouchableOpacity onPress={goForward}>
                        <Image style={styles.nextIcon} source={color === 'r' ? Next : NextB} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HskWordDetail
