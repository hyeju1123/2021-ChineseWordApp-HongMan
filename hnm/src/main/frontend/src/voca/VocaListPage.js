import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import axios from 'axios';
import { LOCAL } from '../../ipConfig';


const VocaListPage = ({ route, navigation }) => {

    const [dayList, setDayList] = useState([]);
    const [loading, setLoading] = useState(true);

    // const getDayList = () => {
    //     let config = { params: { partNum: partNum }}
    //     axios.get(`${LOCAL}/defaultWord/getDayList`, config)
    //         .then(res => {
    //             console.log(res.data);
    //             setDayList(res.data);
    //             setLoading(false);
    //         })
    //         .catch(e => console.log(e))
    // }

    // const renderCards = dayList.map((data, index) => {
    //     return (
    //         <TouchableOpacity key={index} onPress={() => {navigation.navigate('StudyWordList', { dayNum: data.day })}}>
    //             <StudyDayCard day={data.day} name={data.dayName} />
    //         </TouchableOpacity>
    //     )
    // })

    // useEffect(() => {
    //     getDayList();
    // }, [])

    return (

        <ScrollView>
            <View style={styles.container}>
                
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
