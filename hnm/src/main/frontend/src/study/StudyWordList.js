import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import StudyWordCard from './StudyWordCard';

const StudyDayList = ({ route, navigation }) => {

    const { dayNum } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getWordList = () => {
        let config = { params: { dayNum: dayNum }}
        axios.get(`${LOCAL}/defaultWord/getWordList`, config)
            .then(res => {
                console.log(res.data);
                setWordList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
    }

    const renderCards = wordList.map((data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => {navigation.navigate(
                'StudyWordDetail', 
                { wordId: data.defaultWordId,
                  hanzi: data.chCharacter,
                  intonation: data.intonation,
                  sound: data.sound,
                  explanation: data.explanation })}}>
                <StudyWordCard hanzi={data.chCharacter} intonation={data.intonation} />
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        getWordList();
    }, [])


    return (

        <ScrollView>
            <View style={styles.container}>
                {/* <StudyDayCard day='1' name='사람1' />
                <StudyDayCard day='2' name='사람2' />
                <StudyDayCard day='3' name='가족' />
                <StudyDayCard day='4' name='몸 ` 머리' />
                <StudyDayCard day='5' name='이목구비1' /> */}
                {
                    loading ?
                    <Text>loading...</Text> :
                    renderCards
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D14124',
        paddingTop: 20,
        paddingBottom: 30
    },
  
});

export default StudyDayList;
