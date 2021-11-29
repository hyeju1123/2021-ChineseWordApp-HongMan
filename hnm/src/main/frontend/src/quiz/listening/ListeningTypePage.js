import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import HSKImage from '../../../images/mainPage/newStudy.png'
import VocabImage from '../../../images/mainPage/newVoca.png'

function ListeningTypePage({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('ListeningHskThemePage')}}>
                        <Text>HSK</Text>
                        <Image style={styles.image} source={HSKImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Text>Vocab</Text>
                        <Image style={styles.image} source={VocabImage} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    cardContainer: {
        width: '85%'
    },
    card: {
        width: '100%',
        height: width * 0.35,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.05,
        elevation: 8
    },
    image: {
        width: width * 0.4,
        height: width * 0.4
    },
    text: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.07,
        color: '#8E8E8E',
        marginBottom: width * 0.03
    },
});

export default ListeningTypePage
