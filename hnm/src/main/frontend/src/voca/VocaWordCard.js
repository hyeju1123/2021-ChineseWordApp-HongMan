import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';

const VocaWordCard = (props) => {

    const [meaningToggle, setMeaningToggle] = useState(false);
    
    return (
        <View style={styles.card}>
            <View style={styles.hanziCard}>
                <Text style={styles.hanzi}>{props.hanzi}</Text>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('VocaWordDetail', {
                        hanzi: props.hanzi,
                        intonation: props.intonation
                    })}
                >
                    {/* <Image style={{ width: 20, height: 20, marginTop: 7 }} source={require('../../images/vocaCard/search.png')} /> */}
                </TouchableOpacity>
            </View>
            {
                meaningToggle ?
                <TouchableOpacity onPress={() => setMeaningToggle(!meaningToggle)}>
                <View style={styles.touchedBar}>
                    <Text style={styles.touchedText}>{props.meanings.map(item => item.meanings)}</Text>
                </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setMeaningToggle(!meaningToggle)}>
                <View style={styles.unTouchedBar}>
                    <Text style={styles.unTouchedText}>touch</Text>
                </View>
                </TouchableOpacity>
            }
            
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    card: {
        width: (width * 84) / 100,
        minHeight: (height * 21.3) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    hanziCard: {
        width: (((width * 84) / 100) * 87) / 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10
    },
    hanzi: {
        fontSize: 50,
        fontFamily: 'MicrosoftJhengHeiUIBold-02',
        color: '#3E3A30'
    },
    touchedBar: {
        width: (((width * 84) / 100) * 87) / 100,
        minHeight: (((height * 21.3) / 100) * 24.59) / 100,
        backgroundColor: '#DFDFDF',
        alignItems: 'center',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    touchedText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: 20,
        color: '#3E3A30',
    },
    unTouchedBar: {
        width: (((width * 84) / 100) * 87) / 100,
        height: (((height * 23.8) / 100) * 24.59) / 100,
        backgroundColor: '#D14124',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    unTouchedText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: 25,
        color: 'white'
    }
});

export default VocaWordCard;
