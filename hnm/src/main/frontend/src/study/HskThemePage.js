import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import SkeletonCard from '../skeleton/SkeletonCard';
import { useSelector } from 'react-redux';
import customAxios from '../auth/customAxios';
import styles from './styles/HskThemePageStyle';

const HskThemePage = ({ route, navigation }) => {

    const { level } = route.params;
    const [themeList, setThemeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const color = useSelector(state => state.color.theme);
    let theme =  {
        r: {
            back: '#D14124',
            big: '#BEBEBE',
            small: '#FFFFFF',
            text: '#655858'
        },
        w: {
            back: '#FFFFFF',
            big: '#AA351D',
            small: '#D14124',
            text: '#FFFFFF'
        },
    }

    const getThemeList = () => {
        let config = { params: { hskLevel: level }}
        customAxios().then(res => {
            res !== undefined &&
            res.get('/hskWord/getTheme', config)
            .then(res => {
                setThemeList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const renderCards = themeList.map((data, index) => {
        return (
            <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => {navigation.navigate('HskWordPage', { title: data, level: level })}}>
                <View style={[styles.bottomCard, {backgroundColor: theme[color].big}]}>
                    <View style={[styles.topCard, {backgroundColor: theme[color].small}]}>    
                        <Text style={[styles.text, {color: theme[color].text}]}>{data}</Text>                
                    </View>
                </View>
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `HSK ${level}급`,
            headerTitleAlign: 'center',
        })
        getThemeList();
    }, [])

    return (
        loading ? <SkeletonCard /> :
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color].back}]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default HskThemePage;
