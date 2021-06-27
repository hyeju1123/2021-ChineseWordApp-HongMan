import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AuthenticationService from './AuthenticationService';

function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPw, setCheckPw] = useState('');

    const handleSignUp = (email, password) => {
        if (password !== checkPw) {
            Alert.alert(
                "회원가입 실패!",
                "비밀번호가 일치하지 않습니다.",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }],
                { cancelable: false }
            );
        } else {
            AuthenticationService
                .executeJwtSignUpService(email, password)
                    .then(res => {
                        Alert.alert("성공적으로 회원가입 되었습니다.")
                        console.log(res)
                        navigation.navigate('SignIn')
                    })
                    .catch(e => console.log(e))
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.topBlock}>
                <Text style={styles.loginText}>Sign Up</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder='이메일'
                    placeholderTextColor='lightgray'
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='비밀번호'
                    placeholderTextColor='lightgray'
                    style={styles.input}
                />
                <TextInput
                    value={checkPw}
                    onChangeText={setCheckPw}
                    placeholder='비밀번호 확인'
                    placeholderTextColor='lightgray'
                    style={styles.input}
                />
                <View style={styles.bar}></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {handleSignUp(email, password)}}
                >
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    
    )
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // minHeight: height,
        backgroundColor: '#ffffff'
    },
    topBlock: {
        width: width,
        height: 140,
        backgroundColor: '#D14124',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loginText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: 'white',
        fontSize: 40
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    input: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: 25,
        paddingTop: 10,
        paddingLeft: 15,
        marginTop: 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
    },
    bar: {
        width: 30,
        height: 5,
        backgroundColor: '#D14124',
        borderRadius: 50,
        marginTop: 70,
        marginBottom: 30
    },
    button: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        backgroundColor: '#D14124',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 40
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff'
    },
})


export default SignUp
