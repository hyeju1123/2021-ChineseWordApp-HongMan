import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import * as RNFS from 'react-native-fs'
import Next from '../../images/module/next.png';
import axios from 'axios';
import { LOCAL_FLASK } from '../../ipConfig';
import base64 from 'react-native-base64';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function QuizSample() {

    const [audio, setAudio] = useState('');
    const [hanzi, setHanzi] = useState('');
    

    const getAudio = () => {
        
        axios.post(`${LOCAL_FLASK}/getAudio`, JSON.stringify(hanzi), {
            headers: {
                'Content-Type': 'application/json',
            }   
        }).then(res => {
            let time = new Date().getTime()
            let path = 'file://' + RNFS.DocumentDirectoryPath + `/${time}.wav`;
            
            RNFS.writeFile(
                path, 
                res.data,
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
                    }
                })
                setAudio(sound)
            })
            .catch(e => console.log(e))
            

            // let sound = new Sound(responseBlob, null, err => {
            //     if (err) console.log('play failed:: ', err)
            // })
        })
    }

    // const getHskWordsList = async () => {
    //     let memberId = await AsyncStorage.getItem('memberId');
    //     let config = { params: { hskLevel: 4, theme: title, id: memberId }}
    //     customAxios().then(res => {
    //         res.get('/hskWord/getWordsByLevel', config)
    //         .then(res => {
    //             setWordList(res.data);
    //             setLoading(false);
    //         })
    //         .catch(e => console.log(e))
    //     })
    // }

    // useEffect(() => {
    //     getHskWordsList();
    // }, [])

    return (
        <View>
            <Text>Quiz</Text>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('降落')}>
                <Text>降落</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('负增长')}>
                <Text>负增长</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('应聘')}>
                <Text>应聘</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('爱不释手')}>
                <Text>爱不释手</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('巴不得')}>
                <Text>巴不得</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.word} onPress={()=>setHanzi('败坏')}>
                <Text>败坏</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => audio.play()}>
                <Image style={styles.firstIcon} source={Next} />
            </TouchableOpacity>
            <TouchableOpacity onPress={getAudio}>
                <Image style={styles.secondIcon} source={Next} />
            </TouchableOpacity>
        </View>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    firstIcon: {
        width: width * 0.15,
        height: width * 0.15,
        backgroundColor: 'black'
    },
    secondIcon: {
        width: width * 0.15,
        height: width * 0.15,
        backgroundColor: 'green'
    },
    word: {
        width: width * 0.2,
        height: width * 0.2,
        borderColor: 'black',
        borderWidth: 2
    }
});


export default QuizSample
