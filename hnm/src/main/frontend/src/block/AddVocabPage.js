import React, { useEffect, useState, useRef } from 'react';
import { LogBox, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text, Image, TextInput } from 'react-native';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import Images from '../ImageIndex';
import CustomCanvasPage from './CustomCanvasPage';
import HanziPencil from '../../images/module/pencil_h.png';
import PinyinPencil from '../../images/module/pencil_e.png';
import styles from './styles/AddVocabPageStyle';

const width = Dimensions.get('window').width;
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
    const dispatch = useDispatch();
    const color = useSelector(state => state.color.theme);

    const canvasRef = useRef()

    const addVocab = async () => {
        if (wordObj.group === '') {
            dispatch(handleAlertOn('그룹을 선택해주세요', '그룹 선택은 필수입니다.', ()=>{} ));
            return
        }
        if (wordObj.hanzi === '') {
            dispatch(handleAlertOn('단어를 입력해주세요', '단어 입력은 필수입니다.', ()=>{} ));
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
            res !== undefined &&
            res.post('/vocabWord/makeVocab', config)
            .then(res => {
                dispatch(handleAlertOn('저장 성공!', '이어서 저장해주세요.', ()=>{} ));
                setWordObj({...wordObj, 
                            hanzi: '',
                            pinyin: '', 
                            meaning: '', 
                            memo: ''
                           })
                setCheckedWordClass([])     
                setCheckingWordClass(wcList)
            })
            .catch(e => console.log(e))
        })
    }

    const addHskVocab = async () => {
        if (wordObj.group === '') {
            dispatch(handleAlertOn('그룹을 선택해주세요', '그룹 선택은 필수입니다.', ()=>{} ));
            return
        }
        if (wordObj.hanzi === '') {
            dispatch(handleAlertOn('단어를 입력해주세요', '단어 입력은 필수입니다.', ()=>{} ));
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
            res !== undefined &&
            res.post('/vocabWord/makeHskVocab', body, {params: { nonInserted: nonInsertedMemo, hskId: hskId }})
            .then(res => {
                dispatch(handleAlertOn('저장 성공!', `'${wordObj.hanzi}'가 내 단어장에 저장되었습니다.`, ()=>{} ));
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
                <TouchableOpacity 
                    style={[styles.completeButton, {borderColor: color === 'r' ? '#FFFFFF' : '#D14124'}]}
                    onPress={() => {
                        if (hskId === 0) addVocab();
                        else addHskVocab();
                    }}
                >
                    <Text style={[styles.completeText, {color: color === 'r' ? '#FFFFFF' : '#D14124'}]}>完</Text>
                </TouchableOpacity>
            ),
        })
    }, [addVocab, addHskVocab, selectGroup])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: color === 'r' ? '#D14124' : '#FFFFFF'}]}>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
            >
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                    <View style={styles.inputContainer}>
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
                        <View style={styles.textInputWrapper}>
                            <TextInput 
                                    value={wordObj.hanzi}
                                    onChangeText={text => setWordObj({...wordObj, hanzi: text})}
                                    onFocus={() => {canvasRef.current.showCanvas(false); setShowWordClassInput(false);}}
                                    style={styles.textInputCard}
                                    placeholder="단어를 입력하세요 (필수)"
                                    placeholderTextColor="#8E8E8E"
                                    underlineColorAndroid="transparent"
                            />
                            <TouchableOpacity activeOpacity={1} style={styles.pencilWrapper} onPress={() => {canvasRef.current.showCanvas(true); canvasRef.current.setPredictedOne(true); setShowWordClassInput(false);}}>
                                <Image source={HanziPencil} style={styles.pencilIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textInputWrapper}>
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
                            style={[styles.meaningInputCard, 
                                    showWordClassInput && {marginBottom: width * 0.85},
                                    ]}
                            placeholder="#메모"
                            placeholderTextColor="#8E8E8E"
                            multiline={true}
                        />

                    </View>
                    
            </ScrollView>
            </TouchableOpacity>
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
        </SafeAreaView>
    );
};

export default AddVocabPage;
