import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'


function QuizTypePage({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.card} onPress={() => {navigation.navigate('ListeningTypePage')}}>
                        <Text style={styles.text}>듣기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.card}>
                        <Text style={styles.text}>받아쓰기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.card}>
                        <Text style={styles.text}>짝 맞추기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.card}>
                        <Text style={styles.text}>듣기</Text>
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
    text: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.07,
        color: '#8E8E8E',
        marginBottom: width * 0.03
    },
});

export default QuizTypePage
