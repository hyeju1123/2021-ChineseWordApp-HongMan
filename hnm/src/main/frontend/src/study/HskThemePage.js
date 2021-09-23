import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';

const HskThemePage = ({ route, navigation }) => {

    const { level } = route.params;
    const [themeList, setThemeList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getThemeList = () => {
        let config = { params: { hskLevel: level }}
        customAxios().then(res => {
            res.get('/hskWord/getTheme', config)
            .then(res => {
                console.log(res.data);
                setThemeList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const renderCards = themeList.map((data, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => {navigation.navigate('HskWordPage', { title: data, level: level })}}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>{data}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        getThemeList();
    }, [])

    return (
        loading ? <Splash navigation={navigation} /> :
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    cardContainer: {
        width: '85%',
        marginTop: width * 0.02
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.05,
        elevation: 8
    },
    cardText: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.1,
        color: '#655858',
        marginTop: width * 0.03,
        marginBottom: width * 0.03
    }
});

export default HskThemePage;
