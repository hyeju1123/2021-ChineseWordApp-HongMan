import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import SignatureScreen from 'react-native-signature-canvas';
import * as RNFS from 'react-native-fs'
import { LOCAL_FLASK } from '../../ipConfig';

import Erase from '../../images/module/erase.png';
import Backspace from '../../images/module/backspace.png';

const CustomCanvasPage = forwardRef((props, forRef) => {

    const ref = useRef();
    const { wordObj, handleWordObj } = props
    const [showCanvas, setShowCanvas] = useState(false)
    const [predicted, setPredicted] = useState('')

    useImperativeHandle(forRef, () => ({
        showCanvas(onOff) {
            setShowCanvas(onOff)
        }
    }));

    let formData = new FormData();
    
    const width = Dimensions.get('window').width;
    const style = `
        .m-signature-pad {border: none; margin: 0px;}
        .m-signature-pad--body {border: none; margin: 0px;}
        .m-signature-pad--footer {display: none; margin: 0px;}
        body,html {
        width: ${width * 0.7}px; height: ${width * 0.7}px;}`;


    /* 캔버스 펜 사이즈 조정 */
    const handlePenSizeChange = () => {
        ref.current.changePenSize(10, 10)
    }

    /* 한 획 지우기 */
    const handleUndo = () => {
        ref.current.undo();
    }

    /* 모든 획 지우기 */
    const handleClearSignature = () => {
        ref.current.clearSignature();
    }

    /* onOK 프로퍼티 작동시킴 => createFile 함수 실행 */
    const handleTriggerOnOk = () => {
        ref.current.readSignature()
    }

    /* 필기 사진 생성 => 성조 예측 */
    const createFile = (signature) => {
        let time = new Date().getTime()
        let path = 'file://' + RNFS.DocumentDirectoryPath + `/${time}.png`;
        RNFS.writeFile(
            path, 
            signature.replace("data:image/png;base64,", ""),
            'base64'
        )
        .then(() => {
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
                setPredicted(res.data)
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const backspaceInput = () => {
        let backspaced = wordObj.pinyin;
        backspaced = backspaced.slice(0,-1)
        handleWordObj({...wordObj, pinyin: backspaced});
    }

    /* 성조 선택 및 입력 */
    const addPinyinInput = (input) => {
        let inputed = wordObj.pinyin;
        inputed = inputed + input;
        handleClearSignature();
        handleWordObj({...wordObj, pinyin: inputed});
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


    return (
        showCanvas &&
        <View style={styles.canvasContainer}>
            <View style={styles.canvasBar}>
                {handleCanvasBarContents()}
            </View>
            <View style={styles.canvasBox}>
                <View style={styles.canvasWrapper}>
                    <SignatureScreen
                        ref={ref}
                        onBegin={handlePenSizeChange}
                        onOK={createFile}
                        onEnd={handleTriggerOnOk}
                        descriptionText="Sign"
                        clearText="Clear"
                        webStyle={style}
                        backgroundColor='#ffffff'
                        minWidth={10}
                        maxWidth={10}
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
                    <TouchableOpacity onPress={() => setShowCanvas(false)}>
                        <View style={styles.canvasButtonWrapper} backgroundColor='#D14124'>
                        <Text style={styles.closeText}>닫기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>   
    )
});

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    canvasContainer: {
        width: '100%',
        height: width * 0.95,
        display: 'flex',
        backgroundColor: 'rgba(221, 221, 221, 0.8)',
        position: 'absolute',
        bottom: 0,
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
 
})

export default CustomCanvasPage
