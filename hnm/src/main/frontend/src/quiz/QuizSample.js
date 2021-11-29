import React, { useEffect, useState } from 'react'
import { View, 
        Text, 
        Dimensions, 
        StyleSheet, 
        Image, 
        TouchableOpacity,
        ScrollView,
        SafeAreaView } from 'react-native';
import Sound from 'react-native-sound';
import * as RNFS from 'react-native-fs'
import axios from 'axios';
import { LOCAL_FLASK } from '../../ipConfig';
import base64 from 'react-native-base64';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer'

function QuizSample() {

    const [wordList, setWordList] = useState([]);
    const [audio, setAudio] = useState('');
    const [hanzi, setHanzi] = useState('');
    
    const getHskWordsList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { hskLevel: 4, theme: '목표', id: memberId }}
        customAxios().then(res => {
            res !== undefined &&
            res.get('/hskWord/getWordsByLevel', config)
            .then(res => {
                setWordList(res.data);
            })
            .catch(e => console.log(e))
        })
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
                console.log('success')
                let sound = new Sound(path, null, (e) => {
                    if (e) {
                        console.log('error: ', e)
                    } else {
                        RNFS.unlink(path)
                            .then(() => console.log('FILE DELETED'))
                            .catch((e) => console.log(e.message))
                        sound.play();
                    }
                })
                // setAudio(sound)
                // sound.play();
            })
            .catch(e => console.log(e))
            
        })
    }

    const renderCards = wordList.map((data, index) => {
        return (
            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => {getHanziAudio(data.word)}}>
                <View style={styles.card}>
                    <Text style={styles.hanziText}>{data.word}</Text>
                    <Text style={styles.intonationText}>{data.intonation}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        getHskWordsList();
    }, [])

    return (
        // <View>
        //     <Text>Quiz</Text>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('降落')}>
        //         <Text>降落</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('负增长')}>
        //         <Text>负增长</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('应聘')}>
        //         <Text>应聘</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('爱不释手')}>
        //         <Text>爱不释手</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('巴不得')}>
        //         <Text>巴不得</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.word} onPress={()=>setHanzi('败坏')}>
        //         <Text>败坏</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={() => audio.play()}>
        //         <Image style={styles.firstIcon} source={Next} />
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={getAudio}>
        //         <Image style={styles.secondIcon} source={Next} />
        //     </TouchableOpacity>
        // </View>
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
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
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.05,
        elevation: 8
    },
    hanziText: {
        fontFamily: 'PingFangSCLight',
        fontSize: width * 0.1,
        color: '#3E3A39',
        marginBottom: width * 0.01,
        marginTop: width * 0.03,
    },
    intonationText: {
        fontFamily: 'KoPubWorld Dotum Medium',
        fontSize: width * 0.07,
        color: '#8E8E8E',
        marginBottom: width * 0.03
    },
    firstIcon: {
        width: width * 0.15,
        height: width * 0.15,
    }
});


export default QuizSample
