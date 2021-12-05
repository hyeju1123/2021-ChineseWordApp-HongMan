import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import SkeletonCard from '../skeleton/SkeletonCard';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MakeGroupPage from '../block/MakeGroupPage';
import styles from './styles/VocabGroupPageStyle';
import Edit from '../../images/module/edit.png';


const VocabGroupPage = ({ navigation }) => {

    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [makingGroup, setMakingGroup] = useState(false);
    const color = useSelector(state => state.color.theme);
    let theme =  {
        r: '#D14124',
        w: '#FFFFFF'
    }

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
            <TouchableOpacity activeOpacity={0.85} key={index} onPress={() => navigation.navigate('VocabList', {
                groupId: data.vocabGroupId,
                groupName: data.name,
                color: color
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
        loading ? <SkeletonCard /> :
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color]}]}>
            {
                makingGroup && <MakeGroupPage hideFunction={setMakingGroup} />
            }
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    {renderCards}
                </View>    
            </ScrollView>
            {
                !makingGroup &&
                <TouchableOpacity style={[styles.plusButton, color === 'w' && {borderWidth: 0.8, borderColor: '#3E3A39'}]} onPress={() => setMakingGroup(true)}>
                    <Text style={[styles.plusButtonText, {color: color === 'r' ? '#D14124' : '#3E3A39'}]}>+</Text>
                </TouchableOpacity>
            }
            
        </SafeAreaView>
    );
};

export default VocabGroupPage;
