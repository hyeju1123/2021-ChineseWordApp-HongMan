import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import Splash from '../main/Splash';
import StudyWordCard from './StudyWordCard';
import customAxios from '../auth/customAxios';

const StudyDayList = ({ route, navigation }) => {

    const { dayNum } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getWordList = () => {
        let config = { params: { dayNum: dayNum }}
        customAxios().then(res => {
            res.get('/defaultWord/getWordList', config)
            .then(res => {
                console.log(res.data);
                setWordList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
        
    }

    // const getWordList = () => {
    //     let config = { params: { dayNum: dayNum }}
    //     axios.get(`${LOCAL}/defaultWord/getWordList`, config)
    //         .then(res => {
    //             console.log(res.data);
    //             setWordList(res.data);
    //             setLoading(false);
    //         })
    //         .catch(e => console.log(e))
    // }

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

    if (loading) {
        return <Splash />
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {renderCards}
                </View>
            </ScrollView>
        )
    }


    // return (
    //     <ScrollView>
    //         <View style={styles.container}>
    //             {
    //                 loading ?
    //                 <Text>loading...</Text> :
    //                 renderCards
    //             }
    //         </View>
    //     </ScrollView>
    // );
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
