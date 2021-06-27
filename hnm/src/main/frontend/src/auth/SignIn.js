import React, { useState, useEffect } from 'react';
import { Alert, Text, TouchableOpacity, TextInput, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../_modules/user';

function SignIn({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSignIn = (email, password) => {
        dispatch(signIn(email, password));
        console.log('user.error: ', user.error)
        if (user.error) {
            Alert.alert(
                "로그인 실패!",
                "이메일이나 비밀번호를 다시 확인해 주세요",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }],
                { cancelable: false }
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.topBlock}>
                <Text style={styles.loginText}>Log In</Text>
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
                <View style={styles.bar}></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {handleSignIn(email, password)}}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {navigation.navigate('SignUp')}}
                >
                    <Text style={styles.signInText}>회원가입</Text>
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
      signInButton: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 15
      },
      signInText: {
        fontSize: 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
      }
})


export default SignIn
