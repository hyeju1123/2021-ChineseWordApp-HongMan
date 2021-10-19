import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text, Image } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Search from '../../images/module/search.png';
import EditMenu from '../../images/module/menu_w.png';

const VocabList = ({ route, navigation }) => {

    const { groupId, groupName } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMeaning, setShowMeaning] = useState([]);
    const [showEditBox, setShowEditBox] = useState(false);
    const isVisible = useIsFocused();
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

    console.log('showEditBox: ', showEditBox)

    const getVocabList = async () => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId, groupId: groupId }}
        customAxios().then(res => {
            res.get('/vocabWord/findVocabByGroup', config)
            .then(res => {
                setWordList(res.data.reverse());
                let arr = Array.from({length: res.data.length}, () => false)
                setShowMeaning(arr);
            })
            .catch(e => console.log(e))
        })
    }

    const handleMeaningBox = index => {
        const newMeaningState = showMeaning.map((item, i) => {
            if (i === index) return item = !item;
            else return item;
        })
        setShowMeaning(newMeaningState);
    }

    const renderCards = wordList.map((data, index) => {
        return (
            <View activeOpacity={0.8} key={index}>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.searchIconWrapper} onPress={() => navigation.navigate('HskWordDetail', {
                        hskId: 0,
                        list: wordList,
                        wordNum: index,
                        memo: null,
                        updateHskWordList: null,
                        updateHskMarking: null
                    })}>
                        <Image source={Search} style={styles.searchIcon} />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>{data.word}</Text>
                    {
                        showMeaning[index]
                        ? <TouchableOpacity onPress={() => handleMeaningBox(index)} style={styles.meaningBox}>
                            <Text style={styles.pinyinText}>{data.intonation}</Text>
                            <Text style={styles.meaningText}>{data.meaning}</Text>
                        </TouchableOpacity>    
                        : <TouchableOpacity onPress={() => handleMeaningBox(index)} style={styles.touchBox}>
                            <Text style={styles.touchBoxText}>touch</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: groupName,
            headerTitleAlign: 'center',
            headerRight: () => (
                <TouchableOpacity onPress={() => setShowEditBox(true)}>
                    <Image style={styles.editMenuIcon} source={EditMenu}/>
                </TouchableOpacity>
            ),
        })
        getVocabList();
        if (isVisible) {
            getVocabList();
            setShowEditBox(false);
            console.log('vocablist is mounted')
        }
    }, [isVisible])
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: groupName,
    //         headerTitleAlign: 'center',
    //         headerRight: () => (
    //             <TouchableOpacity>
    //                 <Image style={styles.editMenuIcon} source={EditMenu}/>
    //             </TouchableOpacity>
    //         ),
    //     })
    //     getVocabList();
    //     if (isVisible) {
    //         getVocabList();
    //         console.log('vocablist is mounted')
    //     }
    // }, [isVisible])

    return (
        loading ? <Splash navigation={navigation} /> :
        <SafeAreaView style={styles.container}>
            {showEditBox ?
            (<View style={styles.editMenuContainer}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {navigation.navigate('AddVocabPage', {
                    hskId: 0,
                    word: '',
                    intonation: '',
                    wordC: [],
                    mean: '',
                    explanation: '',
                    groupId: groupId,
                    groupName: groupName,
                    nonInsertedMemo: false,
                    handleMarking: null
                })
            }}>
                    <Text style={styles.editMenuText}>단어 추가</Text>
                    <View style={styles.editMenuBar} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Text style={styles.editMenuText}>단어 삭제</Text>
                    <View style={styles.editMenuBar} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.editMenuText}>그룹 이동</Text>
                </TouchableOpacity>
            </View>) : <></>}
            <ScrollView>
                <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} activeOpacity={1} onPress={() => setShowEditBox(false)}>
                <View style={styles.cardContainer}>    
                    {renderCards}
                </View>    
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.plusButton} onPress={() => {navigation.navigate('AddVocabPage', {
                    hskId: 0,
                    word: '',
                    intonation: '',
                    wordC: [],
                    mean: '',
                    explanation: '',
                    groupId: groupId,
                    groupName: groupName,
                    nonInsertedMemo: false,
                    handleMarking: null
                })
            }}>
                    <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    editMenuIcon: {
        width: width * 0.08,
        height: width * 0.08,
        marginTop: width * 0.028,
        marginBottom: width * 0.028,
        marginRight: width * 0.03
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    editMenuContainer: {
        position: 'absolute',
        zIndex: 7,
        backgroundColor: '#D14124',
        width: '100%',
    },
    editMenuText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: width * 0.05,
        paddingTop: width * 0.023,
    },
    editMenuBar: {
        width: '80%',
        height: 1,
        backgroundColor: '#ffffff'
    },
    cardContainer: {
        width: '85%',
        marginTop: width * 0.02,
    },
    card: {
        minHeight: width * 0.32,
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
        fontFamily: 'PingFangFCLight',
        fontSize: width * 0.12,
        color: '#3E3A39',
        marginBottom: width * 0.03,
        marginTop: width * 0.018
    },
    searchIconWrapper: {
        width: width * 0.1,
        height: width * 0.1,
        position: 'absolute',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        top: width * 0.025,
        right: width * 0.04,
    },
    searchIcon: {
        width: width * 0.055,
        height: width * 0.055,
    },
    touchBox: {
        width: '90%',
        backgroundColor: '#D14124',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: width * 0.005,
        paddingBottom: width * 0.005
    },
    touchBoxText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff',
        fontSize: width * 0.05,
        marginBottom: '-2%'
    },
    meaningBox: {
        width: '90%',
        backgroundColor: '#E4E4E4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: width * 0.03
    },
    pinyinText: {
        fontFamily: 'KoPubWorld Dotum Medium',
        fontSize: width * 0.05,
        marginTop: width * 0.02,
        color: '#8E8E8E'
    },
    meaningText: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
        color: '#3E3A39',
        marginLeft: width * 0.05,
        marginRight: width * 0.05
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

export default VocabList;
