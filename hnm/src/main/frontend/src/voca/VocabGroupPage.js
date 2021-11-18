import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text, Image } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Edit from '../../images/module/edit.png';

const VocabGroupPage = ({ navigation }) => {

    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getGroupList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId }}
        customAxios().then(res => {
            res !== undefined &&
            res.get('/vocabWord/findGroup', config)
            .then(res => {
                setGroupList(res.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const renderCards = groupList.map((data, index) => {
        return (
            <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('VocabList', {
                groupId: data.vocabGroupId,
                groupName: data.name
            })}>
                <View style={styles.card}>
                    <View style={styles.editIconContainer}>
                        <TouchableOpacity style={styles.editIconWrapper}>
                        <Image source={Edit} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.cardText}>{data.name}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '단어 그룹',
            headerTitleAlign: 'center',
        })
        getGroupList();
    }, [])

    return (
        loading ? <Splash navigation={navigation} /> :
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>    
            </ScrollView>
            <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('MakeGroupPage')}>
                    <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
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
        minHeight: width > 500 ? width * 0.18 : width * 0.32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        marginBottom: width * 0.05,
        elevation: 8
    },
    cardText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width > 500 ? width * 0.08 : width * 0.1,
        color: '#3E3A39',
        marginBottom: width * 0.05,
    },
    editIconContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    editIconWrapper: {
        width: width > 500 ? width * 0.06 : width * 0.08,
        height: width > 500 ? width * 0.06 : width * 0.08,
        marginTop: width * 0.035,
        marginRight: width * 0.035,
    },
    editIcon: {
        width: width > 500 ? width * 0.06 : width * 0.08,
        height: width > 500 ? width * 0.06 : width * 0.08,
    },
    plusButton: {
        width: width * 0.15,
        height: width * 0.15,
        display: 'flex',
        alignItems: 'center',
        borderRadius: (width * 0.15) / 2,
        elevation: 15,
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: width * 0.07,
        marginBottom: width * 0.1
    },
    plusButtonText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124',
        fontSize: width * 0.1,
        marginTop: width * 0.01
    }
});

export default VocabGroupPage;
