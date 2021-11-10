import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Button, Dimensions, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import customAxios from '../auth/customAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MakeGroupPage = ({ route, navigation }) => {

    const [name, setName] = useState('')

    const handleMakeGroup = async (name) => {
        let memberId = await AsyncStorage.getItem('memberId');
        let config = { name: name, memberId: memberId }
        customAxios().then(res => {
            res.post('/vocabWord/makeGroup', config)
            .then(res => {
                if (res.data === 'duplicated name') {
                    Alert.alert("중복된 그룹명입니다.")
                } else {
                    Alert.alert("완료.")
                }
            })
            .catch(e => console.log(e))
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <TextInput 
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.textInput}
                    placeholder="그룹명을 지정해 주세요"
                    placeholderTextColor="#8E8E8E"
                    multiline={true}
                />
                <Button 
                    title='완료'
                    onPress={() => handleMakeGroup(name)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        display: 'flex',
        backgroundColor: '#D14124'
    },
    textInput: {
        width: '85%',
        minHeight: width * 0.15,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: width * 0.05,
        paddingLeft: width * 0.03,
        paddingRight: width * 0.05,
        paddingBottom: 0,
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width * 0.05,
        textAlignVertical: 'top',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#D14124"
    },
    editIcon: {
        width: width * 0.08,
        height: width * 0.08,
        marginTop: width * 0.028,
        marginBottom: width * 0.028,
        marginRight: width * 0.03
    },
});

export default MakeGroupPage;
