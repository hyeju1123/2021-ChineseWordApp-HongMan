import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image, LogBox, Dimensions } from 'react-native';
import SkeletonCard from '../skeleton/SkeletonCard';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import Search from '../../images/module/search.png';
import EditMenu from '../../images/module/menu_w.png';
import EditMenuB from '../../images/module/menu_b.png';
import Check from '../../images/module/check.png';
import CheckedCheck from '../../images/module/checkedCheck.png';
import styles from './styles/VocabListStyle';

const width = Dimensions.get('window').width;
const VocabList = ({ route, navigation }) => {

    const { groupId, groupName, color } = route.params;
    const [wordList, setWordList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMeaning, setShowMeaning] = useState([]);
    const [showEditBox, setShowEditBox] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [check, setCheck] = useState([]);
    const dispatch = useDispatch();
    let theme =  {
        r: {
            back: '#D14124',
            text: '#FFFFFF'
        },
        w: {
            back: '#FFFFFF',
            text: '#3E3A39'
        }
    }

    const getVocabList = async () => {
        setLoading(true)
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId, groupId: groupId }}
        customAxios().then(res => {
            res !== undefined &&
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

    const checkDelete = () => {
        let vocabIdList = check.filter((item) => {
            return item !== 0
        });
        let stringVocabIdList = vocabIdList.join(',')
        if (stringVocabIdList.length === 0) {
            dispatch(handleAlertOn('선택된 단어가 없습니다.', '삭제할 단어를 선택해주세요.', ()=>{} ));    
        } else {
            dispatch(handleAlertOn('삭제하시겠습니까?', '해당 단어는 삭제 후 복구 불가능합니다.', ()=>{deleteVocab(stringVocabIdList)} ));
        }
    }

    const deleteVocab = async (stringVocabIdList) => {
        
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId, vocabIdList: stringVocabIdList }}
        
        customAxios().then(res => {
            res !== undefined &&
            res.post('/vocabWord/deleteVocabWord', null, config)
            .then(() => {
                dispatch(handleAlertOn('삭제 성공!', '성공적으로 삭제되었습니다', ()=>{} ));
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

    const checkMove = (id, groupName) => {
        let vocabIdList = check.filter((item) => {
            return item !== 0
        });
        let stringVocabIdList = vocabIdList.join(',')
        if (stringVocabIdList.length === 0) {
            dispatch(handleAlertOn('선택된 단어가 없습니다.', '이동할 단어를 먼저 선택해주세요.', ()=>{} ));    
        } else {
            dispatch(handleAlertOn(`'${groupName}'으로 이동하시겠습니까?`, '해당 단어들이 이동됩니다.', ()=>{selectGroup(id, stringVocabIdList)} ));
        }
    }

    const selectGroup = async (id, stringVocabIdList) => {
        
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { params: { memberId: memberId, vocabIdList: stringVocabIdList, groupId: id }}
        customAxios().then(res => {
            res !== undefined &&
            res.post('/vocabWord/moveVocabGroup', null, config)
            .then(() => {
                dispatch(handleAlertOn('이동 성공!', '성공적으로 이동하였습니다', ()=>{} ));
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
                            color: color,
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
                    <Image style={styles.editMenuIcon} source={color === 'r' ? EditMenu : EditMenuB}/>
                </TouchableOpacity>
            ),
        })
        const unsubscribe = navigation.addListener('focus', () => {
            getVocabList();
            setShowEditBox(false);
        })

        return unsubscribe;
    }, [navigation])

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ])

    return (
        loading ? <SkeletonCard /> :
        <TouchableOpacity activeOpacity={1} onPress={() => setShowEditBox(false)}>
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color].back}]}>
            {showEditBox ?
            (<View style={[styles.editMenuContainer, {backgroundColor: theme[color].back}]}>
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
                    <Text style={[styles.editMenuText, {color: theme[color].text}]}>단어 추가</Text>
                    <View style={[styles.editMenuBar, {backgroundColor: theme[color].text}]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {setUpdateMode(true); setDeleteState(true); setShowEditBox(false)}}>
                    <Text style={[styles.editMenuText, {color: theme[color].text}]}>단어 삭제</Text>
                    <View style={[styles.editMenuBar, {backgroundColor: theme[color].text}]} />
                </TouchableOpacity>
                <TouchableOpacity  style={{ alignItems: 'center' }} onPress={() => {setUpdateMode(true); setDeleteState(false); setShowEditBox(false)}}>
                    <Text style={[styles.editMenuText, {color: theme[color].text}]}>그룹 이동</Text>
                </TouchableOpacity>
            </View>) : <></>}
            <ScrollView>
                <TouchableOpacity style={{ flexGrow: 1, alignItems: 'center' }} activeOpacity={1} onPress={() => {setShowEditBox(false);}}>
                <View style={[styles.cardContainer, updateMode && {marginBottom: width * 0.17}]}>    
                    {renderCards}
                </View>    
                </TouchableOpacity>
            </ScrollView>
            {
                updateMode &&  
                <View style={styles.bottomUpdateBox}>
                    {
                        deleteState 
                        ? <TouchableOpacity onPress={() => checkDelete()}>
                            <Text style={styles.bottomUpdateText}>삭제</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => {navigation.navigate('SelectGroupPage', {selectGroup: checkMove})}}>
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

export default VocabList;
