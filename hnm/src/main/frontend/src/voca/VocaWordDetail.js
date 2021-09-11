import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View, Text, Dimensions, Image } from 'react-native';
import customAxios from '../auth/customAxios';

import Images from '../ImageIndex';

function VocaWordDetail({ route }) {
    const { hanzi, intonation } = route.params;
    console.log("hanzi: ", hanzi);
    console.log("intonation: ", intonation);

    const [meaningList, setMeaningList] = useState([]);
    const [loading, setLoading] = useState(true);


    let meanings = <Text>loading</Text>


    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.hanziCard}>
                <Text style={styles.hanzi}>{hanzi}</Text>
                <Text style={styles.intonation}>{intonation}</Text>
            </View>
            <View style={styles.meaningCard}>
                {meanings}
            </View>
            <View style={styles.explanationCard}>
                <Text style={styles.explanation}>explanation</Text>
            </View>
        </View>
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D14124',
        paddingTop: 10,
        paddingBottom: 30
    },
    hanziCard: {
        width: (width * 84) / 100,
        height: (height * 23.5) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        paddingTop: 17.73,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'  
    },
    icon: {
        width: 34.67,
        height: 40,
        position: 'absolute',
        top: (((height * 32.68) / 100) * 8.13) / 100,
        right: (((width * 58) / 100) * 5.6) / 100
    },
    hanzi: {
        fontSize: 60,
        fontFamily: 'MicrosoftJhengHeiUIBold-02',
        color: '#3E3A30',
        marginBottom: -10,
    },
    intonation: {
        fontSize: 30,
        fontFamily: 'KoPubWorld Dotum Medium',
        color: '#D14124',
        marginTop: 10,
        marginBottom: 5,
    },
    meaningCard: {
        width: (width * 84) / 100,
        minHeight: (height * 12.9) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        paddingTop: 23,
        paddingBottom: 13,
        paddingLeft: 20,
        marginBottom: 20
    },
    meaningContainer: {
        width: (((width * 84) / 100) * 77.7) / 100,
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
        marginBottom: 10,
    },
    wordClassIcon: {
        width: (((width * 84) / 100) * 11.1) / 100,
        height: (((width * 84) / 100) * 11.1) / 100,
        marginRight: 15,
    },
    meaning: {
        fontSize: 25,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#3E3A30'
    },
    explanationCard: {
        width: (width * 84) / 100,
        height: (height * 40) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 20,
    },
    explanation: {
        fontSize: 25,
        fontFamily: 'TmoneyRoundWindRegular',
        lineHeight: 40,
        color: '#3E3A30'
    }

});

export default VocaWordDetail;
