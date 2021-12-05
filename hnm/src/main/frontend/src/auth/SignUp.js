import React, { useState, useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         View, 
         ScrollView,
         Image } from 'react-native';
import AuthenticationService from './AuthenticationService';
import googleLogo from '../../images/snsLogo/googleLogo.png';
import naverLogo from '../../images/snsLogo/naverLogo.png';
import customAxios from '../auth/customAxios';
import { signIn } from '../_modules/user';
import { handleAlertOn } from '../_modules/alert';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { iosKeys, androidKeys, googleClientId } from '../../ipConfig';
import Splash from '../main/Splash';
import styles from './styles/SignInStyle';

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const checkBlank = () => {
        let pattern = /\s/g
        if (email.match(pattern) || password.match(pattern) || email === '' || password === '') {
            dispatch(handleAlertOn('회원가입 실패!', '공백 없이 작성해주세요.', ()=>{} ));
            return true;
        }
        return false;
    }

    const checkPasswordLength = () => {
        if (password.length < 6) {
            dispatch(handleAlertOn('회원가입 실패!', '비밀번호는 6자리 이상이어야 합니다.', ()=>{} ));
            return true;
        }
        return false;
    }

    const checkPassword = () => {
        if (password !== checkPw) {
            dispatch(handleAlertOn('회원가입 실패!', '비밀번호가 일치하지 않습니다.', ()=>{} ));
            return true;
        }
        return false;
    }
    
    const checkDuplicateEmail = (message) => {
        if (message === 'Duplicate account') {
            dispatch(handleAlertOn('회원가입 실패!', '이미 존재하는 이메일입니다.', ()=>{} ));
        }
    }

    const handleSignUp = (email, password) => {
        setLoading(true)
        if (checkPasswordLength() || checkBlank() || checkPassword()) {
            setLoading(false)
            return;
        } else {
            AuthenticationService
                .executeJwtSignUpService(email, password, 'false')
                    .then(res => {
                        if (res.data.success === false) {
                            checkDuplicateEmail(res.data.message);
                            setLoading(false)
                        } else {
                            console.log("res aa: ", res)
                            setLoading(false)
                            navigation.navigate('EmailAuthPage', { 
                                email: email, 
                                emailToken: res.data.message,
                                password: password
                            })
                            
                            let config = { params: { 
                                email: email,
                                emailToken: res.data.message
                            }}
                            customAxios().then(res => {
                                res !== undefined &&
                                res.get('/mail/send', config)
                                .catch(() => 
                                    dispatch(handleAlertOn("인증 메일 전송 실패!", "'인증 메일 재전송'을 눌러주세요.", ()=>{} ))
                                )
                            })
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setLoading(false)
                        dispatch(handleAlertOn("회원가입 실패!", "다시 시도해주세요.", ()=>{} ))
                    })
        }
    }

    const handleSnsSignUp = (type) => {
        if (type === 'google') {
            AuthenticationService.handleGoogleSignIn()
                .then(res => {
                    if (res.error) {
                        dispatch(handleAlertOn('회원가입 실패!', '계정 정보를 가져오는 데 실패했습니다.', ()=>{} ));
                        return
                    }
                    const email = res.email;
                    AuthenticationService.executeJwtSignUpService(email, '', type)                    
                        .then(async res => {
                            if (res.data.success === false) {
                                checkDuplicateEmail(res.data.message);
                                await AuthenticationService.googleLogout();
                            } else {
                                dispatch(handleAlertOn('회원가입 성공!', '', ()=>{} ));
                                dispatch(signIn(email, '', type));
                            }
                        })
                        .catch(async () => {
                            await AuthenticationService.googleLogout();
                            dispatch(handleAlertOn("회원가입 실패!", "다시 시도해주세요.", ()=>{} ))
                        })
                })
        }

        if (type === 'naver') {
            AuthenticationService.handleNaverSignIn(initials)
                .then(email => {

                    AuthenticationService.executeJwtSignUpService(email, '', type)
                    .then(res => {
                        if (res.data.success === false) {
                            checkDuplicateEmail(res.data.message);
                            AuthenticationService.naverLogout();
                        } else {
                            dispatch(handleAlertOn('회원가입 성공!', '', ()=>{} ));
                            dispatch(signIn(email, '', type));
                        }
                    })
                    .catch(() => {
                        AuthenticationService.naverLogout();
                        dispatch(handleAlertOn("회원가입 실패!", "다시 시도해주세요.", ()=>{} ))
                    })
                })
                .catch(e => {
                    dispatch(handleAlertOn('회원가입 실패!', '계정 정보를 가져오는 데 실패했습니다.', ()=>{} ));
                    return
                })
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
          webClientId: googleClientId,
          forceCodeForRefreshToken: true,
          offlineAccess: true
        })
        
      }, [])

    return (
        loading ? <Splash navigation={navigation} /> :
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
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    value={checkPw}
                    onChangeText={setCheckPw}
                    placeholder='비밀번호 확인'
                    placeholderTextColor='lightgray'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {handleSignUp(email, password)}}
                >
                    <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
                <View style={styles.bar}></View>
                
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignUp('google')}}
                >
                    <Image source={googleLogo} style={styles.googleLogo} />
                    <Text style={styles.signInText}>계정으로 가입</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignUp('naver')}}
                >
                    <Image source={naverLogo} style={styles.naverLogo} />
                    <Text style={styles.signInText}>계정으로 가입</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    
    )
}

export default SignUp
