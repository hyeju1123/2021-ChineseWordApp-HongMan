import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Image, TextInput, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions, Button, Touchable } from 'react-native';
import axios from 'axios';
import SignatureScreen from 'react-native-signature-canvas';
import * as RNFS from 'react-native-fs'
import { LOCAL_FLASK } from '../../ipConfig';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HanziPencil from '../../images/module/pencil_h.png';
import PinyinPencil from '../../images/module/pencil_e.png';
import Edit_White from '../../images/module/edit_white.png';
import Erase from '../../images/module/erase.png';
import Backspace from '../../images/module/backspace.png';
import Images from '../ImageIndex';

function UpdateVocaPage({ route, navigation }) {

    let { hskId, word, intonation, wordC, mean, explanation, includedVocab, updateHskWordList } = route.params;
    let wcList = ['명사', '대명사', '동사', '조동사', '형용사', '수사', '양사', '부사', '개사', '조사', '접속사', '감탄사', '성어'];
    const ref = useRef();
    const [checkingWordClass, setCheckingWordClass] = useState(wcList.filter(x => !wordC.includes(x)))
    const [checkedWordClass, setCheckedWordClass] = useState(wordC)
    const [showCanvas, setShowCanvas] = useState(false)
    const [showWordClassInput, setShowWordClassInput] = useState(false)
    const [hanzi, setHanzi] = useState(word)
    const [pinyin, setPinyin] = useState(intonation)
    const [predicted, setPredicted] = useState('')
    const [meaning, setMeaning] = useState(mean)
    const [memo, setMemo] = useState(explanation)


    let formData = new FormData();
    
    const width = Dimensions.get('window').width;
    const style = `
        .m-signature-pad {border: none; margin: 0px;}
        .m-signature-pad--body {border: none; margin: 0px;}
        .m-signature-pad--footer {display: none; margin: 0px;}
        body,html {
        width: ${width * 0.7}px; height: ${width * 0.7}px;}`;

    const showWordClass = (wordClass, index, checking) => {
        return (<TouchableOpacity key={index} onPress={checking ? () => addWordClass(wordClass) : () => deleteWordClass(wordClass)}>
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

    const handleChange = () => {
        ref.current.changePenSize(10, 10)
    }

    const createFile = (signature) => {
        let time = new Date().getTime()
        let path = 'file://' + RNFS.DocumentDirectoryPath + `/${time}.png`;
        RNFS.writeFile(
            path, 
            signature.replace("data:image/png;base64,", ""),
            'base64'
        )
        .then(() => {
            console.log('img path: ', path)
            formData.append('image', {
                uri: path,
                type: 'image/png',
                name: 'myImage.png'
            })
            axios.post(`${LOCAL_FLASK}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }   
            }).then(res => {
                console.log('predicted: ', res.data)
                setPredicted(res.data)

            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const handleCanvasBarContents = () => {
        let contents = []
        for (let i = 0; i < predicted.length; i++) {
            contents.push(
                <TouchableOpacity key={i} onPress={() => addPinyinInput(predicted.charAt(i))} style={styles.canvasBarTextWrapper}>
                    <Text style={styles.canvasBarText}>{predicted.charAt(i)}</Text>
                </TouchableOpacity>
            )
        }
        return contents
    }

    const handlePinyin = () => {
        ref.current.readSignature()
    }

    const handleUndo = () => {
        ref.current.undo();
    }

    const handleClearSignature = () => {
        ref.current.clearSignature();
    }

    const backspaceInput = () => {
        let backspaced = pinyin
        backspaced = backspaced.slice(0,-1)
        setPinyin(backspaced)
    }

    const addPinyinInput = (input) => {
        let inputed = pinyin;
        inputed = inputed + input;
        handleClearSignature()
        setPinyin(inputed)
    }

    const editHskWord = async (pinyin) => {
        let memberId = await AsyncStorage.getItem('memberId');
        
        let config = { hskId: hskId,
              memberId: memberId,
              intonation: pinyin,
              wordClass: checkedWordClass.join(', '),
              meaning: meaning,
              explanation: memo,
              includedVocab: includedVocab
            }
        customAxios().then(res => {
            res.post('/hskWord/updateHskWord', config)
            .then(res => {
                console.log(res.data);
                navigation.goBack();
                navigation.goBack();
                updateHskWordList(hskId, {
                    intonation: pinyin,
                    wordClass: checkedWordClass.join(', '),
                    meaning: meaning,
                    explanation: memo,
                })
            })
            .catch(e => console.log(e))
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => editHskWord(pinyin)}>
                    <Image style={styles.editIcon} source={Edit_White}/>
                </TouchableOpacity>
            ),
        })
    }, [editHskWord])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.inputConatiner}>
                    <View style={styles.inputWrapper}>
                        <TextInput 
                            value={hanzi}
                            onChangeText={text => setHanzi(text)}
                            onFocus={() => {setShowCanvas(false); setShowWordClassInput(false);}}
                            style={styles.textInputCard}
                            placeholder="단어를 입력하세요"
                            placeholderTextColor="#8E8E8E"
                        />   
                        <TouchableOpacity activeOpacity={1} onPress={() => {setShowCanvas(true)}} style={styles.pencilWrapper}>
                            <Image source={HanziPencil} style={styles.pencilIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput 
                            value={pinyin}
                            onChangeText={text => setPinyin(text)}
                            onFocus={() => {setShowCanvas(false); setShowWordClassInput(false);}}
                            style={styles.textInputCard}
                            placeholder="발음을 입력하세요"
                            placeholderTextColor="#8E8E8E"
                        />       
                        <TouchableOpacity activeOpacity={1} onPress={() => {setShowCanvas(true); setShowWordClassInput(false)}} style={styles.pencilWrapper}>
                            <Image source={PinyinPencil} style={styles.pencilIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.wordClassContainer} onPress={() => {setShowWordClassInput(true); setShowCanvas(false)}}>
                        {
                            checkedWordClass.length === 0 ?
                            (<View style={styles.wordClassTextWrapper}>
                                <Text style={styles.wordClassText}>품사를 입력하세요</Text> 
                            </View>) :
                            (<View style={styles.wordClassWrapper}>
                                {checkedWordClass.map((data, index) => {
                                    return showWordClass(data, index, false)
                                })}
                            </View>)
                        }
                        <Image source={Backspace} style={styles.pencilIcon} />
                    </TouchableOpacity>
                    <TextInput 
                        value={meaning}
                        onChangeText={text => setMeaning(text)}
                        onFocus={() => {setShowCanvas(false); setShowWordClassInput(false);}}
                        style={styles.meaningInputCard}
                        placeholder="뜻을 입력하세요"
                        placeholderTextColor="#8E8E8E"
                        multiline={true}
                    />
                    <TextInput 
                        value={memo}
                        onChangeText={text => setMemo(text)}
                        onFocus={() => {setShowCanvas(false); setShowWordClassInput(false);}}
                        style={styles.meaningInputCard}
                        placeholder="#메모"
                        placeholderTextColor="#8E8E8E"
                        multiline={true}
                    />
                </View>
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
                            return showWordClass(data, index, true)
                        })
                    }
                </View>
            }
            {
                showCanvas &&
                <>
                <View style={styles.canvasContainer}>
                    <View style={styles.canvasBar}>
                        {handleCanvasBarContents()}
                    </View>
                    <View style={styles.canvasBox}>
                        <View style={styles.canvasWrapper}>
                            <SignatureScreen
                                ref={ref}
                                onBegin={handleChange}
                                onOK={createFile}
                                onEnd={handlePinyin}
                                descriptionText="Sign"
                                clearText="Clear"
                                webStyle={style}
                                backgroundColor='#ffffff'
                                minWidth={15}
                                maxWidth={15}
                            />
                        </View>
                        <View style={styles.canvasButtonContainer}>
                            <TouchableOpacity onPress={backspaceInput}>
                                <View style={styles.canvasButtonWrapper}>
                                    <Image source={Backspace} style={styles.canvasButtonIcon} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleClearSignature}>
                                <View style={styles.canvasButtonWrapper}>
                                    <Text style={styles.clearText}>전체 지우기</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleUndo}>
                                <View style={styles.canvasButtonWrapper}>
                                    <Image source={Erase} style={styles.canvasButtonIcon} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setShowCanvas(false)}}>
                                <View style={styles.canvasButtonWrapper} backgroundColor='#D14124'>
                                <Text style={styles.closeText}>닫기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </>
            }
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    editIcon: {
        width: width * 0.08,
        height: width * 0.08,
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
          paddingRight: width * 0.03,
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
    canvasContainer: {
        width: '100%',
        height: width * 0.95,
        display: 'flex',
        backgroundColor: 'rgba(221, 221, 221, 0.8)',
        position: 'absolute',
        bottom: 0
      },
    canvasBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: width * 0.03
    },
    canvasBar: {
        width: '100%',
        height: width * 0.15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(204, 206, 211, 0.7)'
    },
    canvasBarTextWrapper: {
        borderRightWidth: 1,
        borderRightColor: '#C0C0C0',
        paddingRight: '4%',
        paddingLeft: '4%',
      },
    canvasBarText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
    },
    canvasBarPillar: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.055,
        color: '#C0C0C0',
        marginTop: '3%',
    },
      canvasWrapper: {
        width: width * 0.7,
        height: width * 0.7,
      },
      canvasButtonContainer: {
        width: width * 0.15,
        height: width * 0.7,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: width * 0.04        
      },
      canvasButtonWrapper: {
        width: width * 0.15,
        height: width * 0.15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      canvasButtonIcon: {
        width: width * 0.085,
        height: width * 0.085,
      },
      clearText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.038,
        color: '#D14124',
        textAlign: 'center',
        marginTop: '8%'
      },
      closeText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.04,
        color: '#ffffff',
        marginTop: '10%'
      },
      input: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: 25,
        paddingTop: 10,
        paddingLeft: 15,
        marginTop: 10,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
      },
      button: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        backgroundColor: '#D14124',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 40
      },
      buttonText: {
        fontSize: 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff'
      },
      meaningBox: {
          flexDirection: 'row',
      },
      plusButton: {
          width: 30, 
          height: 30,
          borderRadius: 15,
          backgroundColor: '#D14124',
          alignItems: 'center',
          justifyContent: 'center'
      }
})

export default UpdateVocaPage
