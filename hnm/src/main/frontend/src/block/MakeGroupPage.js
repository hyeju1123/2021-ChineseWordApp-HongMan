import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import customAxios from '../auth/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/MakeGroupPageStyle';


const MakeGroupPage = (props) => {

    const color = useSelector(state => state.color.theme);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    let { hideFunction } = props;

    const checkLength = (name) => {
        if (name.length < 1) {
            dispatch(handleAlertOn('그룹 이름을 입력해주세요!', '이름은 한글자 이상이어야 합니다.', ()=>{} ));
            return true;
        } else if (name.length > 200) {
            dispatch(handleAlertOn('200자를 초과하였습니다!', '이름은 200자 이하여야 합니다.', ()=>{} ));
            return true;
        }
        return false;
    }

    const handleMakeGroup = async (name) => {
        if (checkLength(name)) return;
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { name: name, memberId: memberId }
        customAxios().then(res => {
            res !== undefined &&
            res.post('/vocabWord/makeGroup', config)
            .then(res => {
                if (res.data === 'duplicated name') {
                    dispatch(handleAlertOn('중복된 그룹명입니다.', '다른 이름으로 지어주세요.', ()=>{} ));
                } else {
                    dispatch(handleAlertOn('성공!', `${name} 그룹이 만들어졌습니다.`, ()=>{} ));
                }
            })
            .catch(e => console.log(e))
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={1} style={styles.closeContainer} onPress={() => hideFunction(false)}>
                    <TouchableOpacity activeOpacity={1} style={[styles.inputWrapper, {backgroundColor: color === 'r' ? '#D14124' : '#FFFFFF'}]}>
                        <Text style={[styles.title, {color: color === 'r' ? '#FFFFFF' : '#D14124'}]}>그룹 만들기</Text>
                        <TouchableOpacity onPress={() => handleMakeGroup(name)} style={[styles.completeButton, {borderColor: color === 'r' ? '#FFFFFF' : '#D14124'}]}>
                            <Text style={[styles.completeText, {color: color === 'r' ? '#FFFFFF' : '#D14124'}]}>완료</Text>
                        </TouchableOpacity>
                        <TextInput 
                            value={name}
                            placeholderTextColor={color === 'w' ? '#FFFFFF' : '#8E8E8E'}
                            onChangeText={text => setName(text)}
                            style={[styles.textInput, 
                                   {backgroundColor: color === 'r' ? '#FFFFFF' : '#D14124',
                                    color: color === 'w' ? '#FFFFFF' : '#8E8E8E'}]}
                            placeholder="그룹명을 지정해 주세요."
                            multiline={true}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>    
            </ScrollView>
        </SafeAreaView>
    );
};

export default MakeGroupPage;
