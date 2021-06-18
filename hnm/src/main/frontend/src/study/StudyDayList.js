import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';
import StudyDayCard from './StudyDayCard';

const StudyDayList = ({ route, navigation }) => {

    const { partNum } = route.params;
    const [dayList, setDayList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDayList = () => {
        let config = { params: { partNum: partNum }}
        axios.get(`${LOCAL}/defaultWord/getDayList`, config)
            .then(res => {
                console.log(res.data);
                setDayList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
    }

    const renderCards = dayList.map((data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => {navigation.navigate('StudyWordList')}}>
                <StudyDayCard day={data.day} name={data.dayName} navigation={navigation} />
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        getDayList();
    }, [])

    return (

        <ScrollView>
            <View style={styles.container}>
                {/* <StudyDayCard day='1' name='사람1' navigation={navigation} />
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
        justifyContent: 'center',
        backgroundColor: '#D14124',
        paddingTop: 10,
        paddingBottom: 30
    },
  
});

export default StudyDayList;
