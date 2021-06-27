import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import customAxios from '../auth/customAxios';

function VocaFormPage() {

    const [hanzi, setHanzi] = useState('');
    const [intonation, setIntonation] = useState('');
    const [story, setStory] = useState('');
    const [group, setGroup] = useState('');
    
    const [meaning, setMeaning] = useState('');
    const [wordClass, setWordClass] = useState('');

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const list = [{meanings: '아무거나, 일단 넣어본다', wordId: 1}, {meanings: '두번째 뜻', wordId: 1}]

    const addVoca = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        customAxios().then(res => {
            res.post('/privateWord/addWord', {
                chCharacter: hanzi,
                intonation: intonation,
                story: story,
                savedGroup: group,
                memberId: memberId    
            }).then(res => {
                console.log('wordId: ', res.data)
                const wordId = parseInt(res.data);
            })
        })
        // axios.post(`${LOCAL}/privateWord/addWord`, {
        //     chCharacter: hanzi,
        //     intonation: intonation,
        //     story: story,
        //     savedGroup: group,
        //     memberId: memberId
        // }).then(res => {
        //     console.log('wordId: ', res.data)
        //     wordId = parseInt(res.data)
        // })
    }

    const addMeaning = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        customAxios().then(res => {
            res.post('/privateWord/addMeanings', {list: JSON.stringify(list)})
            .then(res => {
                console.log('wordId: ', res.data)
                const wordId = parseInt(res.data);
            })
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={hanzi}
                onChangeText={setHanzi}
                placeholder='단어'
                placeholderTextColor='lightgray'
                style={styles.input}
            />
            <TextInput
                value={meaning}
                onChangeText={setMeaning}
                placeholder='의미'
                placeholderTextColor='lightgray'
                style={styles.input}
            />
            <TextInput
                value={intonation}
                onChangeText={setIntonation}
                placeholder='발음'
                placeholderTextColor='lightgray'
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {addVoca()}}
            >
                <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {addMeaning()}}
            >
                <Text style={styles.buttonText}>뜻 보내기</Text>
            </TouchableOpacity>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
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
})

export default VocaFormPage
