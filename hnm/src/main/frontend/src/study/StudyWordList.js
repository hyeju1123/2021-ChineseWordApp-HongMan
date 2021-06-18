import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import StudyDayCard from './StudyDayCard';

const StudyDayList = ({ navigation }) => {

  return (

    <ScrollView>
        <View style={styles.container}>
            {/* <StudyDayCard day='1' name='사람1' />
            <StudyDayCard day='2' name='사람2' />
            <StudyDayCard day='3' name='가족' />
            <StudyDayCard day='4' name='몸 ` 머리' />
            <StudyDayCard day='5' name='이목구비1' /> */}
            <Text>word list</Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D14124',
        paddingTop: 30,
        paddingBottom: 30
    },
  
    partCard: {
        width: 315,
        height: 156,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 48,
        paddingRight: 48
    },
    partNum: {
        fontSize: 50,
        fontFamily: 'TmoneyRoundWindExtraBold',
        color: '#3F4443'
    },
    partName: {
        fontSize: 40,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#75787B',
        top: 10
    }
});

export default StudyDayList;
