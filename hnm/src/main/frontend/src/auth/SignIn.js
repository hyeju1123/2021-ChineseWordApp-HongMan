import React, { useState, useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         SafeAreaView, 
         View, 
         StyleSheet, 
         Dimensions, 
         ScrollView,
         Image, 
         Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../_modules/user';
import AuthenticationService from './AuthenticationService';
import googleLogo from '../../images/snsLogo/googleLogo.png';
import naverLogo from '../../images/snsLogo/naverLogo.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { iosKeys, androidKeys, googleClientId } from '../../ipConfig';

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

function SignIn({ navigation }) {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

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
              Alert.alert("정보를 가져오는 데 실패했습니다.")
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
            Alert.alert("정보를 가져오는 데 실패했습니다.")
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
                    <Image source={googleLogo} style={availableDeviceWidth > 350 ? styles.googleLogo : styles.smallGoogleLogo} />
                    <Text style={styles.signInText}>계정으로 로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => {handleSnsSignIn('naver')}}
                >
                    <Image source={naverLogo} style={availableDeviceWidth > 350 ? styles.naverLogo : styles.smallNaverLogo} />
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
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        paddingLeft: 20,
        marginTop: 20,
        fontSize: width > 500 ? 27 : width * 0.035,
        paddingBottom: '1%',
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
        marginTop: 20
      },
      signInText: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
      },
      signUpContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '7%'
      },
      signUpQuestion: {
        fontSize: width > 500 ? 25 : 18,
        color: '#3E3A30',
        fontFamily: 'TmoneyRoundWindRegular',
        marginRight: '2%'
      },
      signUpText: {
        fontSize: width > 500 ? 25 : 18,
        fontWeight: 'bold',
        color: '#D14124',
        fontFamily: 'TmoneyRoundWindRegular',
        textDecorationLine: 'underline'
      }
})


export default SignIn
