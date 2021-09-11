import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../auth/customAxios';

function VocaFormPage() {

    const [hanzi, setHanzi] = useState('');
    const [intonation, setIntonation] = useState('');
    const [story, setStory] = useState('');
    const [group, setGroup] = useState('');
    
    const [meaning, setMeaning] = useState('');
    const [wordClass, setWordClass] = useState('');
    const [extraMeanings, setExtraMeanings] = useState([]);
    const [extraNum, setExtraNum] = useState(0);

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
                addMeaning(wordId);
            })
        })
    }

    const addMeaning = async (id) => {
        let newArr = [...extraMeanings];
        newArr.map(obj => {
            delete obj.index
        })
        console.log('newArr: ', newArr);
        let list = [{meanings: meaning}, ...newArr]
        console.log('list: ', list);
        
        customAxios().then(res => {
            res.post('/privateWord/addMeanings', {list: JSON.stringify(list), wordId: id})
            .then(res => {
                console.log('wordId: ', res.data)
                const wordId = parseInt(res.data);
            })
        })
        setMeaning('');
        setHanzi('');
        setIntonation('');
        setExtraMeanings([]);
    }

    const addMeaningBox = () => {
        console.log("before: ", extraMeanings)
        console.log("extra num: ", extraNum)
        setExtraMeanings(oldArray => [...oldArray, {index: extraNum, meanings: ''}])
        setExtraNum(extraNum+1)
        console.log("after: ", extraMeanings)
    }

    const deleteMeaningBox = (index) => {
        setExtraMeanings(extraMeanings.filter(item => item.index !== index))
    }

    const handleText = (item, text) => {
        let updateArr = [...extraMeanings];
        console.log('item.index: ', item.index)
        let index = extraMeanings.findIndex(obj => obj.index === item.index);
        updateArr[index].meanings = text;
        setExtraMeanings(updateArr);
    }

    let meaningCards = extraMeanings.map((data, index) => {
        console.log('test: ', extraMeanings.find(item => item.index === data.index).meanings)
        return (
            <View key={index} style={styles.meaningBox}>
                <TextInput
                    value={data.meanings}
                    onChangeText={(text) => {handleText(data, text)}}
                    placeholder='의미'
                    placeholderTextColor='lightgray'
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => {deleteMeaningBox(data.index)}}>
                    <View style={styles.plusButton}>
                        <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })

    return (
        <View style={styles.container}>
            <TextInput
                value={hanzi}
                onChangeText={setHanzi}
                placeholder='단어'
                placeholderTextColor='lightgray'
                style={styles.input}
            />
            <View style={styles.meaningBox}>
                <TextInput
                    value={meaning}
                    onChangeText={setMeaning}
                    placeholder='의미'
                    placeholderTextColor='lightgray'
                    style={styles.input}
                />
                <TouchableOpacity onPress={addMeaningBox}>
                    <View style={styles.plusButton}>
                        <Text style={{ color: 'white' }}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {meaningCards}
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

export default VocaFormPage
