import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HskWordPage = ({ route, navigation }) => {

    const { title, level } = route.params;
    const [wordList, setWordList] = useState([{}]);
    const [loading, setLoading] = useState(true);

    const getHskWordsList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { hskLevel: level, theme: title, id: memberId }}
        customAxios().then(res => {
            res.get('/hskWord/getWordsByLevel', config)
            .then(res => {
                console.log(res.data);
                setWordList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const renderCards = wordList.map((data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('HskWordDetail', {
                list: wordList,
                wordNum: index,
                memo: data.memo
                // word: data.word, 
                // intonation: data.intonation, 
                // wordClass: data.wordClass, 
                // meaning: data.meaning,
                // newMeaning: data.memo !== null ? data.memo.meaning : '',
                // explanation: data.memo !== null ? data.memo.explanation : ''
            })}>
                <View style={styles.card}>
                    <Text style={styles.hanziText}>{data.word}</Text>
                    <Text style={styles.intonationText}>{data.intonation}</Text>
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
    }, [])



    return (
        loading ? <Splash navigation={navigation} /> :
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    }
});

export default HskWordPage;
