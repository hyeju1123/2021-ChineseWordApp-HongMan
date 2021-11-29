import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import soundIcon from '../../../images/module/sound.png';
import Next from '../../../images/module/next.png';
import axios from 'axios';
import * as RNFS from 'react-native-fs'
import { LOCAL_FLASK } from '../../../ipConfig';
import { Buffer } from 'buffer';
import Sound from 'react-native-sound';

function ListeningQuizPage({ route, navigation }) {

    const [randomList, setRandomList] = useState([]);
    const [result, setResult] = useState({loading: false, state: true});
    let { wordNum, wordList, type } = route.params;

    const makeRandomNum = (wordNum) => {
        let nums = [];
        let i = 0;
        while (i < 3) {
            let n = Math.floor(Math.random() * wordList.length);
            if (! sameNum(n)) {
                nums.push(n);
                i++;
            }
        }
        function sameNum (n) {
            return (nums.find((e) => (e === n))) || (wordNum === n);
        }
        return nums;
    }

    const goForward = () => {
        if ((wordNum + 1) === wordList.length) {
            return 
        } else {
            navigation.navigate('ListeningQuizPage', {
                wordNum: wordNum + 1,
                wordList: wordList
            });
        }
    }
    const goBackward = () => {
        if (wordNum === 0) {
            return
        } else {
            navigation.navigate('ListeningQuizPage', {
                wordNum: wordNum - 1,
                wordList: wordList
            });
        }
    }

    const getHanziAudio = character => {
        axios.post(`${LOCAL_FLASK}/getAudio`, JSON.stringify(character), {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer'   
        }).then(res => {
            let buffer = Buffer.from(res.data, 'binary').toString('base64');
            let time = new Date().getTime()
            let path = 'file://' + RNFS.DocumentDirectoryPath + `/${time}.mp3`;

            RNFS.writeFile(
                path, 
                buffer,
                'base64'
            ).then(() => {
                let sound = new Sound(path, Sound.MAIN_BUNDLE, (e) => {
                    if (e) {
                        console.log('error: ', e)
                    } else {
                        sound.play();
                        RNFS.unlink(path)
                            .then(() => console.log('FILE DELETED'))
                            .catch((e) => console.log(e.message))
                    }
                })
            })
            .catch(e => console.log(e))
            
        })
    }

    const checkAnswer = (checked) => {
        if (checked === wordNum) {
            let result = { loading: true, state: true }
            setResult({...result})
        } else {
            let result = { loading: true, state: false }
            setResult({...result})
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${wordNum+1}/${wordList.length}`,
            headerTitleAlign: 'center',
        });
        getHanziAudio(wordList[wordNum].word);
        let rn = makeRandomNum(wordNum);
        let n = Math.floor(Math.random() * 4);
        rn.splice(n, 0, wordNum)
        setRandomList([...rn])
        setResult({...result, loading: false})

    }, [wordNum])

    return (
        <SafeAreaView style={styles.container}>
            {result.loading && 
                <View style={styles.resultPage}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                        <View style={styles.resultBox}>
                            {
                                result.state 
                                ? <Text style={styles.result}>o</Text>
                                : <Text style={styles.result}>x</Text>
                            }
                                <TouchableOpacity onPress={goForward} style={styles.nextButton}>
                                    <Text style={styles.hanziText}>다음 문제</Text>
                                </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            }
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <View style={styles.infoMentBox}>
                        <Text style={styles.infoMent}>소리를 듣고 맞는 답을 고르세요.{wordList[wordNum][type]}</Text>
                    </View>
                    <View style={styles.soundBox}>
                        <Image source={soundIcon} style={styles.icon} />
                    </View>
                    <View style={styles.exampleContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => checkAnswer(randomList[0])} style={styles.exampleCard}>
                            <Text style={type === 'word' ? styles.hanziText : styles.meaningText}>
                                {wordList[randomList[0]] && wordList[randomList[0]][type]}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => checkAnswer(randomList[1])} style={styles.exampleCard}>
                            <Text style={type === 'word' ? styles.hanziText : styles.meaningText}>
                                {wordList[randomList[1]] && wordList[randomList[1]][type]}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => checkAnswer(randomList[2])} style={styles.exampleCard}>
                            <Text style={type === 'word' ? styles.hanziText : styles.meaningText}>
                                {wordList[randomList[2]] && wordList[randomList[2]][type]}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => checkAnswer(randomList[3])} style={styles.exampleCard}>
                            <Text style={type === 'word' ? styles.hanziText : styles.meaningText}>
                                {wordList[randomList[3]] && wordList[randomList[3]][type]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.wordNavigation}>
                        <TouchableOpacity onPress={goBackward}>
                            <Image style={styles.previousIcon} source={Next} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goForward}>
                            <Image style={styles.nextIcon} source={Next} />
                        </TouchableOpacity>
                </View> */}
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
        backgroundColor: '#D14124',
    },
    resultPage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    resultBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    result: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.6,
        color: '#ffffff',
    },
    nextButton: {
        width: width * 0.5,
        height: width * 0.2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff'
    },
    cardContainer: {
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        marginTop: width * 0.01,
        marginBottom: width * 0.3
    },
    infoMentBox: {
        width: '100%',
        marginBottom: width * 0.07,
    },
    infoMent: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.04,
        textAlign: 'center',
        color: '#ffffff'
    },
    soundBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: width * 0.45,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 10,
        marginBottom: width * 0.15,
    },
    icon: {
        width: width * 0.3,
        height: width * 0.3
    },
    exampleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    exampleCard: {
        display: 'flex',
        justifyContent: 'center',
        width: width * 0.4,
        minHeight: width * 0.25,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: width * 0.05,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        elevation: 10
    },
    hanziText: {
        fontFamily: 'PingFangSCLight',
        fontSize: width * 0.1,
        color: '#3E3A39',
        textAlign: 'center',
    },
    meaningText: {
        fontFamily: 'KoPubWorld Dotum Medium',
        fontSize: width * 0.05,
        color: '#3E3A39',
        textAlign: 'center',
        paddingTop: width * 0.03,
        paddingBottom: width * 0.03
    },
    wordNavigation: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: width * 0.1,
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

export default ListeningQuizPage