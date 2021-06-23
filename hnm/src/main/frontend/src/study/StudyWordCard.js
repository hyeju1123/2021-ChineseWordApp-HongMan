import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const StudyWordCard = (props) => {

    return (
        <View style={styles.card}>
            <Text style={styles.hanzi}>{props.hanzi}</Text>
            <Text style={styles.intonation}>{props.intonation}</Text>
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
        height: (height * 21.3) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: (((width * 84) / 100) * 19.6) / 100,
        marginBottom: 20
    },
    hanzi: {
        fontSize: 70,
        fontFamily: 'MicrosoftJhengHeiUIBold-02',
        color: '#3F4443'
    },
    intonation: {
        fontSize: 30,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#75787B',
        position: 'absolute',
        left: left,
        top: top
    }
});

export default StudyWordCard;
