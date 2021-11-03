import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text, Image, Alert, LogBox } from 'react-native';
import Splash from '../main/Splash';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../../images/module/search.png';
import EditMenu from '../../images/module/menu_w.png';
import Check from '../../images/module/check.png';
import CheckedCheck from '../../images/module/checkedCheck.png';

const VocabList = ({ route, navigation }) => {

    const { groupId, groupName } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMeaning, setShowMeaning] = useState([]);
    const [showEditBox, setShowEditBox] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [check, setCheck] = useState([]);

    const getVocabList = async () => {
        setLoading(true)
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId, groupId: groupId }}
        customAxios().then(res => {
            res.get('/vocabWord/findVocabByGroup', config)
            .then(res => {
                setWordList(res.data.reverse());
                let arr = Array.from({length: res.data.length}, () => false)
                let checkArr = Array.from({length: res.data.length}, () => 0)
                setShowMeaning(arr);
                setCheck(checkArr);
                setLoading(false);
            })
            .catch(e => console.log(e))
        })
    }

    const deleteVocab = async () => {
        
        let memberId = await AsyncStorage.getItem('memberId');
        let vocabIdList = check.filter((item) => {
            return item !== 0
        });
        let stringVocabIdList = vocabIdList.join(',')
        console.log(stringVocabIdList)
        let config = { params: { memberId: memberId, vocabIdList: stringVocabIdList }}
        
        customAxios().then(res => {
            res.post('/vocabWord/deleteVocabWord', null, config)
            .then(() => {
                Alert.alert("삭제되었습니다.");
                getVocabList();
            })
        })
    }

    const handleMeaningBox = index => {
        const newMeaningState = showMeaning.map((item, i) => {
            if (i === index) return item = !item;
            else return item;
        })
        setShowMeaning(newMeaningState);
    }

    const handleCheckIcon = (index, vocabId) => {
        let newCheckState = check.map((item, i) => {
            if (i === index) return item = vocabId;
            else return item;
        })
        setCheck(newCheckState);
    }

    const resetCheckIcon = () => {
        let newCheck = Array.from({length: check.length}, () => 0);
        setCheck(newCheck);
    }

    const selectGroup = async (id, groupName) => {
        
        let memberId = await AsyncStorage.getItem('memberId');
        let vocabIdList = check.filter((item) => {
            return item !== 0
        });
        let stringVocabIdList = vocabIdList.join(',');
        let config = { params: { memberId: memberId, vocabIdList: stringVocabIdList, groupId: id }}
        customAxios().then(res => {
            res.post('/vocabWord/moveVocabGroup', null, config)
            .then(() => {
                Alert.alert("이동하였습니다.")
                getVocabList();
            })
        })
    }

    const renderCards = wordList.map((data, index) => {
        return (
            <View activeOpacity={0.8} key={index}>
                <View style={styles.card}>
                    { !updateMode && 
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
                    } 
                    { updateMode && 
                        (
                            check[index] !== 0
                            ? <TouchableOpacity onPress={() => handleCheckIcon(index, 0)} style={styles.searchIconWrapper}>
                                <Image source={CheckedCheck} style={styles.searchIcon} /> 
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={() => handleCheckIcon(index, data.vocabId)} style={styles.searchIconWrapper}>
                                <Image source={Check} style={styles.searchIcon} /> 
                            </TouchableOpacity>
                        )
                    }
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
        const unsubscribe = navigation.addListener('focus', () => {
            getVocabList();
            setShowEditBox(false);
            console.log('vocablist is mounted');
        })

        return unsubscribe;
    }, [navigation])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        loading ? <Splash navigation={navigation} /> :
        <TouchableOpacity activeOpacity={1} onPress={() => setShowEditBox(false)}>
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
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {setUpdateMode(true); setDeleteState(true); setShowEditBox(false)}}>
                    <Text style={styles.editMenuText}>단어 삭제</Text>
                    <View style={styles.editMenuBar} />
                </TouchableOpacity>
                <TouchableOpacity  style={{ alignItems: 'center' }} onPress={() => {setUpdateMode(true); setDeleteState(false); setShowEditBox(false)}}>
                    <Text style={styles.editMenuText}>그룹 이동</Text>
                </TouchableOpacity>
            </View>) : <></>}
            <ScrollView>
                <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} activeOpacity={1} onPress={() => {setShowEditBox(false);}}>
                <View style={styles.cardContainer}>    
                    {renderCards}
                </View>    
                </TouchableOpacity>
            </ScrollView>
            {/* <TouchableOpacity style={styles.plusButton} onPress={() => {navigation.navigate('AddVocabPage', {
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
            </TouchableOpacity> */}
            {
                updateMode &&  
                <View style={styles.bottomUpdateBox}>
                    {
                        deleteState 
                        ? <TouchableOpacity onPress={() => deleteVocab()}>
                            <Text style={styles.bottomUpdateText}>삭제</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => {navigation.navigate('SelectGroupPage', {selectGroup: selectGroup})}}>
                            <Text style={styles.bottomUpdateText}>그룹이동</Text>
                        </TouchableOpacity>
                    }
                    <View style={styles.bottomUpdateBar} />
                    <TouchableOpacity onPress={() => {setUpdateMode(false); resetCheckIcon();}}>
                        <Text style={styles.bottomUpdateText}>취소</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
        </TouchableOpacity>
    );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    editMenuIcon: {
        width: width > 500 ? width * 0.05 : width * 0.08,
        height: width > 500 ? width * 0.05 : width * 0.08,
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
    },
    bottomUpdateBox: {
        width: '100%',
        height: width * 0.15,
        backgroundColor: '#D14124',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 10
    },
    bottomUpdateBar: {
        width: width * 0.003,
        height: width * 0.12,
        backgroundColor: '#ffffff'
    },
    bottomUpdateText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff',
        fontSize: width * 0.07,
        marginBottom: -(width * 0.03)
    }
});

export default VocabList;
