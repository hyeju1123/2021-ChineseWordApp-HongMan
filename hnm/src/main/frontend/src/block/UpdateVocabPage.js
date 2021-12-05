import React, { useEffect, useState, useRef } from 'react';
import { LogBox, SafeAreaView, ScrollView, TouchableOpacity, View, Dimensions, Text, Image, TextInput, Alert } from 'react-native';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Images from '../ImageIndex';
import CustomCanvasPage from './CustomCanvasPage';
import HanziPencil from '../../images/module/pencil_h.png';
import PinyinPencil from '../../images/module/pencil_e.png';
import styles from './styles/AddVocabPageStyle';

const width = Dimensions.get('window').width;
const UpdateVocabPage = ({ route, navigation }) => {

    let {   hskId, 
            vocabId,
            word, 
            intonation, 
            wordC, 
            mean, 
            explanation, 
            updateHskWordList   } = route.params;
    
    let wcList = ['명사', '대명사', '동사', '조동사', '형용사', '수사', '양사', '부사', '개사', '조사', '접속사', '감탄사', '성어', '기타'];
    const [checkingWordClass, setCheckingWordClass] = useState(wcList.filter(x => !wordC.includes(x)))
    const [checkedWordClass, setCheckedWordClass] = useState(wordC);
    const [showWordClassInput, setShowWordClassInput] = useState(false);
    const [wordObj, setWordObj] = useState({
        hanzi: word, 
        pinyin: intonation, 
        meaning: mean, 
        memo: explanation
    });
    const color = useSelector(state => state.color.theme);

    const canvasRef = useRef()

    const editHskVocab = async () => {

        if (wordObj.hanzi === '') {
            Alert.alert("단어를 입력해주세요")
            return
        }

        let memberId = await AsyncStorage.getItem('memberId');
        let config = { 
                hskId: hskId,
                memberId: memberId,
                intonation: `[${wordObj.pinyin}]`,
                wordClass: checkedWordClass.join(', '),
                meaning: wordObj.meaning,
                explanation: wordObj.memo,
            }
        customAxios().then(res => {
            res !== undefined &&
            res.post('/hskWord/updateHskWord', config)
            .then(res => {
                Alert.alert('수정되었습니다.')
                navigation.goBack();
                navigation.goBack();
                updateHskWordList(hskId, {
                    intonation: wordObj.pinyin,
                    wordClass: checkedWordClass.join(', '),
                    meaning: wordObj.meaning,
                    explanation: wordObj.memo,
                })
            })
            .catch(e => console.log(e))
        })
    }

    const editVocab = async () => {

        if (wordObj.hanzi === '') {
            Alert.alert("단어를 입력해주세요")
            return
        }

        let memberId = await AsyncStorage.getItem('memberId');
        let config = { 
                vocabId: vocabId,
                memberId: memberId,
                word: wordObj.hanzi,
                intonation: `[${wordObj.pinyin}]`,
                wordClass: checkedWordClass.join(', '),
                meaning: wordObj.meaning,
                explanation: wordObj.memo,
            }
        customAxios().then(res => {
            res !== undefined &&
            res.post('/vocabWord/updateVocabWord', config)
            .then(res => {
                Alert.alert('수정되었습니다.')       
                navigation.goBack();
                navigation.goBack();
            })
            .catch(e => console.log(e))
        })
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
            headerTitle: '단어 수정',
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity 
                    style={[styles.completeButton, {borderColor: color === 'r' ? '#FFFFFF' : '#D14124'}]}
                    onPress={() => {
                        if (hskId === 0) editVocab();
                        else editHskVocab()
                    
                    }}
                >
                    <Text style={[styles.completeText, {color: color === 'r' ? '#FFFFFF' : '#D14124'}]}>完</Text>
                </TouchableOpacity>
            ),
        })
    }, [editHskVocab])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: color === 'r' ? '#D14124' : '#FFFFFF'}]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                    <View style={styles.inputContainer}>
                        {
                            hskId === 0 ?
                            (<View style={styles.textInputWrapper}>
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
                            </View>)    :
                            (<View style={styles.inputWrapper}>
                                <View style={styles.hskWordCard}>
                                    <Text style={styles.hskWordText}>{wordObj.hanzi} (수정 불가)</Text>
                                </View>
                            </View>)
                        }
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


export default UpdateVocabPage;
