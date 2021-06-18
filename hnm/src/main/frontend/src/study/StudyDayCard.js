import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const StudyDayCard = (props) => {

    return (
        <View style={styles.card}>
            <Text style={styles.day}>DAY {props.day}</Text>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const top = '37%';
const left = '65%';

const styles = StyleSheet.create({
    card: {
        width: (width * 84) / 100,
        height: (height * 19.3) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        marginBottom: 20
    },
    day: {
        fontSize: 40,
        fontFamily: 'TmoneyRoundWindExtraBold',
        color: '#3F4443'
    },
    name: {
        fontSize: 27,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#3F4443',
        position: 'absolute',
        left: left,
        top: top
    }
});

export default StudyDayCard;
