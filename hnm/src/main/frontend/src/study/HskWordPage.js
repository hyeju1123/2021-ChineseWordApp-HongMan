import React, { useEffect, useState } from 'react';
import { LogBox, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style/HskThemePageStyle';
import { useSelector } from 'react-redux';

const HskWordPage = ({ route, navigation }) => {

    const { title, level } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatedList, setUpdatedList] = useState(false);
    const color = useSelector(state => state.color.theme);
    let theme =  {
        r: '#D14124',
        w: '#FFFFFF'
    }

    const getHskWordsList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { hskLevel: level, theme: title, id: memberId }}
        customAxios().then(res => {
            res !== undefined &&
            res.get('/hskWord/getWordsByLevel', config)
            .then(res => {
                setWordList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const updateHskWordsList = (hskId, memo) => {
        setWordList(
            wordList.map(item => 
                item.hskId === hskId
                ? {...item, ...memo}
                : item)
        )
        setUpdatedList(!updatedList);
    }

    const updateHskMarking = (hskId, nonInserted) => {
        if (nonInserted) {
            let newMemo = { meaning: '', explanation: '', wordClass: '', intonation: '', vocabId: 1 }
            setWordList(
                wordList.map(item =>
                    item.hskId === hskId
                    ? {...item, memo: {...newMemo}}
                    : item)
            )
        } else {
            setWordList(
                wordList.map(item => 
                    item.hskId === hskId
                    ? {...item, memo: {...item.memo, vocabId: 1}}
                    : item)
            )
        }
        setUpdatedList(!updatedList);
    }

    const renderCards = wordList.map((data, index) => {
        let intonation = (data.memo !== null && data.memo.intonation !== '')
                        ? data.memo.intonation
                        : data.intonation
        return (
            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => navigation.navigate('HskWordDetail', {
                hskId: data.hskId,
                list: wordList,
                wordNum: index,
                memo: data.memo,
                color: color,
                updateHskWordList: updateHskWordsList,
                updateHskMarking: updateHskMarking
            })}>
                <View style={[styles.hanziCard, color === 'w' && {borderColor: '#3E3A39', borderWidth: 0.5}]}>
                    <Text style={styles.hanziText}>{data.word}</Text>
                    <Text style={styles.intonationText}>{intonation}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerTitleAlign: 'center',
        })
        getHskWordsList();
        return () => {
            wordNum = 0;
            navigation.setOptions({
                headerTitle: ''
              })
        };
    }, [updatedList])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        loading ? <Splash navigation={navigation} /> :
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color]}]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HskWordPage;
