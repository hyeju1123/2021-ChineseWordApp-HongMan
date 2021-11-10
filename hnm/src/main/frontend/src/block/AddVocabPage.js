import React, { useEffect, useState, useRef } from 'react';
import { LogBox, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text, Image, TextInput, Alert } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../ImageIndex';
import CustomCanvasPage from './CustomCanvasPage';
import HanziPencil from '../../images/module/pencil_h.png';
import PinyinPencil from '../../images/module/pencil_e.png';
import Edit_White from '../../images/module/edit_white.png';
import CompleteIcon from '../../images/module/check_w.png';

const AddVocabPage = ({ route, navigation }) => {

    let { hskId, word, intonation, wordC, mean, explanation, groupId, groupName, nonInsertedMemo, handleMarking } = route.params;
    
    let wcList = ['명사', '대명사', '동사', '조동사', '형용사', '수사', '양사', '부사', '개사', '조사', '접속사', '감탄사', '성어', '기타'];
    const [checkingWordClass, setCheckingWordClass] = useState(wcList.filter(x => !wordC.includes(x)))
    const [checkedWordClass, setCheckedWordClass] = useState(wordC);
    const [showWordClassInput, setShowWordClassInput] = useState(false);
    const [wordObj, setWordObj] = useState({
        group: groupName, 
        groupVocabId: groupId,
        hanzi: word, 
        pinyin: intonation, 
        meaning: mean, 
        memo: explanation

    });

    const canvasRef = useRef()

    const addVocab = async () => {
        if (wordObj.group === '') {
            Alert.alert("그룹을 선택해주세요")
            return
        }
        if (wordObj.hanzi === '') {
            Alert.alert("단어를 입력해주세요")
            return
        }
        
        let memberId = await AsyncStorage.getItem('memberId');
        let config = {
            word: wordObj.hanzi,
            meaning: wordObj.meaning,
            intonation: `[${wordObj.pinyin}]`,
            wordClass: checkedWordClass.join(', '),
            explanation: wordObj.memo,
            memberId: memberId,
            vocabGroupId: wordObj.groupVocabId
        }
        customAxios().then(res => {
            res.post('/vocabWord/makeVocab', config)
            .then(res => {
                Alert.alert('저장되었습니다.')
                setWordObj({...wordObj, 
                            hanzi: '',
                            pinyin: '', 
                            meaning: '', 
                            memo: ''
                           })
                setCheckedWordClass([])     
                setCheckingWordClass(wcList)
                // navigation.goBack()
            })
            .catch(e => console.log(e))
        })
    }

    const addHskVocab = async () => {
        if (wordObj.group === '') {
            Alert.alert("그룹을 선택해주세요")
            return
        }
        if (wordObj.hanzi === '') {
            Alert.alert("단어를 입력해주세요")
            return
        }

        let memberId = await AsyncStorage.getItem('memberId');
        let body = {
            word: wordObj.hanzi,
            meaning: wordObj.meaning,
            intonation: `[${wordObj.pinyin}]`,
            wordClass: checkedWordClass.join(', '),
            explanation: wordObj.memo,
            memberId: memberId,
            vocabGroupId: wordObj.groupVocabId
        }
        customAxios().then(res => {
            res.post('/vocabWord/makeHskVocab', body, {params: { nonInserted: nonInsertedMemo, hskId: hskId }})
            .then(res => {
                Alert.alert('저장되었습니다.')
                navigation.goBack();
                navigation.goBack();
                handleMarking(hskId, nonInsertedMemo)
            })
            .catch(e => console.log(e))
        })
    }

    const selectGroup = (id, groupName) => {
        setWordObj({...wordObj, group: groupName, groupVocabId: id})
        groupId = id;
        console.log(groupName, groupId)
    }

    const showDeletedWordClass = (wordClass, index) => {
        return (<TouchableOpacity key={index} onPress={() => deleteWordClass(wordClass)}>
                    <Image style={wordClass.length === 2 ? styles.deletedWordClassIcon : styles.deletedLongWordClassIcon} source={Images.deleteWordClass[wordClass]} />
                </TouchableOpacity>);
                
    }

    const showWordClass = (wordClass, index) => {
        return (<TouchableOpacity key={index} onPress={() => addWordClass(wordClass)}>
                    <Image style={wordClass.length === 2 ? styles.wordClassIcon : styles.longWordClassIcon} source={Images.wordClass[wordClass]} />
                </TouchableOpacity>);        
    }

    const addWordClass = (wordClass) => {
        setCheckedWordClass(checkedWordClass => [...checkedWordClass, wordClass])
        setCheckingWordClass(checkingWordClass.filter(item => item !== wordClass))
    }

    const deleteWordClass = (wordClass) => {
        setCheckedWordClass(checkedWordClass.filter(item => item !== wordClass))
        setCheckingWordClass(checkingWordClass => [...checkingWordClass, wordClass])
    }
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '내 단어장에 추가',
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    if (hskId === 0) addVocab();
                    else addHskVocab();
                }}>
                    <Image style={styles.editIcon} source={CompleteIcon}/>
                </TouchableOpacity>
            ),
        })
    }, [addVocab, addHskVocab, selectGroup])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                    <View style={styles.inputConatiner}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={styles.wordClassContainer} 
                            onPress={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false); navigation.navigate('SelectGroupPage', {selectGroup: selectGroup})}}>
                            <View style={styles.wordClassTextWrapper}>
                                {
                                    wordObj.group === '' 
                                    ? <Text style={styles.wordClassText}>그룹을 선택하세요 (필수)</Text> 
                                    : <Text style={styles.wordClassText}>{wordObj.group}</Text> 
                                }
                            </View>
                        </TouchableOpacity>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                value={wordObj.hanzi}
                                onChangeText={text => setWordObj({...wordObj, hanzi: text})}
                                onFocus={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
                                style={styles.textInputCard}
                                placeholder="단어를 입력하세요 (필수)"
                                placeholderTextColor="#8E8E8E"
                            />
                            <TouchableOpacity activeOpacity={1} style={styles.pencilWrapper} onPress={() => {canvasRef.current.showCanvas(true); canvasRef.current.setPredictedOne(true); setShowWordClassInput(false);}}>
                                <Image source={HanziPencil} style={styles.pencilIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                value={wordObj.pinyin}
                                onChangeText={text => setWordObj({...wordObj, pinyin: text})}
                                onFocus={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
                                style={styles.textInputCard}
                                placeholder="발음을 입력하세요"
                                placeholderTextColor="#8E8E8E"
                            />
                            <TouchableOpacity activeOpacity={1} style={styles.pencilWrapper} onPress={() => {canvasRef.current.showCanvas(true); canvasRef.current.setPredictedOne(false); setShowWordClassInput(false);}}>
                                <Image source={PinyinPencil} style={styles.pencilIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={styles.wordClassContainer} onPress={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(true);}}>
                        {
                            checkedWordClass.length === 0 ?
                            (<View style={styles.wordClassTextWrapper}>
                                <Text style={styles.wordClassText}>품사를 입력하세요</Text> 
                            </View>) :
                            (<View style={styles.wordClassWrapper}>
                                {checkedWordClass.map((data, index) => {
                                    return showDeletedWordClass(data, index)
                                })}
                            </View>)
                        }
                        </TouchableOpacity>
                        <TextInput 
                            value={wordObj.meaning}
                            onChangeText={text => setWordObj({...wordObj, meaning: text})}
                            onFocus={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
                            style={styles.meaningInputCard}
                            placeholder="뜻을 입력하세요"
                            placeholderTextColor="#8E8E8E"
                            multiline={true}
                        />
                        <TextInput 
                            value={wordObj.memo}
                            onChangeText={text => setWordObj({...wordObj, memo: text})}
                            onFocus={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
                            style={styles.meaningInputCard}
                            placeholder="#메모"
                            placeholderTextColor="#8E8E8E"
                            multiline={true}
                        />

                    </View>
                    <CustomCanvasPage ref={canvasRef} handleWordObj={setWordObj} wordObj={wordObj} />
                    {
                        showWordClassInput &&
                        <View style={styles.wordClassCheckContainer}>
                            <View style={styles.closeButtonWrapper}>
                                <View style={styles.closeButton}>
                                <Text style={styles.closeButtonText} onPress={() => setShowWordClassInput(false)}>x</Text>
                                </View>
                            </View>
                            {
                                checkingWordClass.map((data, index) => {
                                    return showWordClass(data, index)
                                })
                            }
                        </View>
                    }
                    
            </ScrollView>
        </SafeAreaView>
    );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    editIcon: {
        width: width > 500 ? width * 0.05 : width * 0.08,
        height: width > 500 ? width * 0.05 : width * 0.08,
        marginTop: width * 0.028,
        marginBottom: width * 0.028,
        marginRight: width * 0.03
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    inputConatiner: {
        width: '85%',
        marginTop: width * 0.03,
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    textInputCard: {
        width: '85%',
        height: width * 0.2,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: width * 0.05,
        paddingLeft: width * 0.03,
        paddingRight: width * 0.05,
        paddingBottom: 0,
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
    },
    pencilWrapper: {
        display: 'flex',
        height: width * 0.2,
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    pencilIcon: {
        width: width * 0.08,
        height: width * 0.08,
        position: 'absolute',
        top: width * 0.05,
        right: width * 0.02
    },
    wordClassContainer: {
        width: '100%',
        minHeight: width * 0.2,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: width * 0.05,
        paddingTop: width * 0.01
    },
    wordClassWrapper: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    wordClassTextWrapper: {
        width: '100%',
        height: width * 0.2,
        display: 'flex',
        justifyContent: 'center'
    },
    wordClassText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
        marginLeft: width * 0.03,
        color: '#8E8E8E',
    },
    wordClassCheckContainer: {
        width: '100%',
        height: width * 0.8,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(221, 221, 221, 0.8)',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 0
    },
    closeButtonWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    closeButton: {
        width: width * 0.08,
        height: width * 0.08,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (width * 0.08) / 2,
        backgroundColor: 'white',
        borderColor: '#D14124',
        borderWidth: 2,
        marginRight: width * 0.03,
        marginTop: width * 0.035
    },
    closeButtonText: {
        fontFamily: 'TmoneyRoundWindRegular',
        marginTop: '20%',
        fontSize: width * 0.08,
        color: '#D14124'
    },
    deletedWordClassIcon: {
        width: width * 0.173,
        height: width * 0.11,
        marginTop: width * 0.035,
        marginBottom: width * 0.035,
        marginLeft: width * 0.035,
    },
    deletedLongWordClassIcon: {
        width: width * 0.24,
        height: width * 0.11,
        marginTop: width * 0.035,
        marginBottom: width * 0.035,
        marginLeft: width * 0.03,
    },
    wordClassIcon: {
        width: width * 0.17,
        height: width * 0.1,
        marginTop: width * 0.035,
        marginBottom: width * 0.035,
        marginLeft: width * 0.035,
    },
    longWordClassIcon: {
        width: width * 0.24,
        height: width * 0.1,
        marginTop: width * 0.035,
        marginBottom: width * 0.035,
        marginLeft: width * 0.03,
    },
    meaningInputCard: {
        width: '100%',
        minHeight: width * 0.3,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: width * 0.05,
        paddingLeft: width * 0.03,
        paddingRight: width * 0.05,
        paddingBottom: 0,
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
        textAlignVertical: 'top'
    },
});

export default AddVocabPage;
