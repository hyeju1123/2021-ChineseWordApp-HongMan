import React, { useState, useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         SafeAreaView, 
         View, 
         ScrollView,
         Image  } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import { signIn } from '../_modules/user';
import AuthenticationService from './AuthenticationService';
import googleLogo from '../../images/snsLogo/googleLogo.png';
import naverLogo from '../../images/snsLogo/naverLogo.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { iosKeys, androidKeys, googleClientId } from '../../ipConfig';
import styles from './styles/SignInStyle'

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

function SignIn({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSignIn = (email, password) => {
        dispatch(signIn(email, password, ''));
    }

    const handleSnsSignIn = (type) => {
      if (type === 'google') {
        AuthenticationService.handleGoogleSignIn()
          .then(res => {
            if (res.error) {
              dispatch(handleAlertOn('로그인 실패!', '계정 정보를 가져오는 데 실패했습니다.', ()=>{} ));
              return
            }
            dispatch(signIn(res.email, '', type));
          })
      }

      if (type === 'naver') {
        AuthenticationService.handleNaverSignIn(initials)
          .then(email => {
            dispatch(signIn(email, '', type));
          })
          .catch(e => {
            dispatch(handleAlertOn('로그인 실패!', '계정 정보를 가져오는 데 실패했습니다.', ()=>{} ));
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
        <SafeAreaView style={styles.container}>
            <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false}>
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
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {handleSignIn(email, password)}}
                >
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <View style={styles.bar}></View>
                
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignIn('google')}}
                >
                    <Image source={googleLogo} style={styles.googleLogo} />
                    <Text style={styles.signInText}>계정으로 로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignIn('naver')}}
                >
                    <Image source={naverLogo} style={styles.naverLogo} />
                    <Text style={styles.signInText}>계정으로 로그인</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpQuestion}>아직 회원이 아니신가요?</Text>
                    <Text style={styles.signUpText} onPress={() => {navigation.navigate('SignUp')}}>
                      회원가입 하기
                    </Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
