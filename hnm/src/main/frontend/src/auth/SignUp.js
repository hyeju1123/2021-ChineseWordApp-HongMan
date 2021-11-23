import React, { useState, useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         View, 
         StyleSheet, 
         Dimensions, 
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

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

function SignUp({ navigation }) {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

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
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
          }
        Dimensions.addEventListener('change', updateLayout);
      
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
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
                    <Image source={googleLogo} style={availableDeviceWidth > 350 ? styles.googleLogo : styles.smallGoogleLogo} />
                    <Text style={styles.signInText}>계정으로 가입</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignUp('naver')}}
                >
                    <Image source={naverLogo} style={availableDeviceWidth > 350 ? styles.naverLogo : styles.smallNaverLogo} />
                    <Text style={styles.signInText}>계정으로 가입</Text>
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
        width: '100%',
        height: 140,
        backgroundColor: '#D14124',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loginText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: 'white',
        fontSize: width > 500 ? 60 : 40
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    }, 
    input: {
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        marginTop: 20,
        paddingBottom: '1%',
        fontSize: width > 500 ? 27 : width * 0.035,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
    },
    bar: {
        width: width > 500 ? 50 : 30,
        height: width > 500 ? 7 : 5,
        backgroundColor: '#D14124',
        borderRadius: 50,
        marginTop: 70,
        marginBottom: 30
    },
    button: {
        width: (width * 81) / 100,
        height: (height * 7) / 100,
        backgroundColor: '#D14124',
        borderRadius: width > 500 ? 43 : 28,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 40
    },
    buttonText: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff'
    },
    googleLogo: {
        width: width > 500 ? (width * 18) / 100 : (width * 25) / 100,
        height: width > 500 ? (height * 4) / 100 : (height * 4.2) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
    },
    smallGoogleLogo: {
        width: (width * 20) / 100,
        height: (height * 4.5) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
    },
    naverLogo: {
        width: width > 500 ? (width * 19) / 100 : (width * 27) / 100,
        height: width > 500 ? (height * 2.3) / 100 : (height * 2.5) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
    },
    smallNaverLogo: {
        width: (width * 25) / 100,
        height: (height * 3.2) / 100,
        marginRight: width > 500 ? '5%' : '3%',
        marginBottom: width > 500 ? '2%' : '3.5%'
    },
    signInButton: {
        display: 'flex',
        flexDirection: 'row',
        width: (width * 80) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: '3%'
    },
    signInText: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
    },
})


export default SignUp
