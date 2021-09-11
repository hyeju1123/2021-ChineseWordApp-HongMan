import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../auth/customAxios';

import VocaWordCard from './VocaWordCard';


const VocaListPage = ({ route, navigation }) => {

    const [vocaList, setVocaList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPrivateWordList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId }}
        customAxios().then(res => {
            res.get('/privateWord/getWordDetailList', config)
                .then(res => {
                    console.log(res.data);
                    setVocaList(res.data);
                    setLoading(false);
                })
                .catch(e => console.log(e))
        })
    }

    const renderCards = vocaList.map((data, index) => {
        return (
            <VocaWordCard 
                key={index} 
                hanzi={data.chCharacter} 
                intonation={data.intonation}
                meanings={data.meanings} 
                navigation={navigation} 
            />
        )
    })

    useEffect(() => {
        getPrivateWordList();
    }, [])

    return (

        <ScrollView>
            <View style={styles.container}>
                {renderCards}
            </View>
        </ScrollView>
    );
};

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D14124',
        paddingTop: 10,
        paddingBottom: 30
    },
   
});

export default VocaListPage;
