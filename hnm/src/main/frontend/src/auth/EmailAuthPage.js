import React, { useState, useEffect } from 'react';
import { Alert, 
         TouchableOpacity, 
         ActivityIndicator,
         Text, 
         SafeAreaView, 
         View, 
         StyleSheet, 
         Dimensions, 
         ScrollView,
         Image } from 'react-native';
import emailLogo from '../../images/snsLogo/email.png';
import customAxios from './customAxios';
import { useDispatch } from 'react-redux';
import { signIn } from '../_modules/user';

function EmailAuthPage({ route }) {


    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { email, emailToken, password } = route.params;
    let config = { params: { 
        email: email,
        emailToken: emailToken
    }}

    const confirmAndLogin = async () => {
        customAxios().then(res => {
            res.get('/mail/checkMailAuth', {
                params: {
                    email: email
                }
            })
            .then(res => {
                console.log('ressss: ', res.data)
                if (res.data === true) {
                    dispatch(signIn(email, password, ''));
                } else if (res.data === false) {
                    Alert.alert("메일함에서 '메일 인증' 버튼을 눌러주세요!");
                }
            })
            .catch(e => {
                console.log('메일 인증 에러: ', e)
                Alert.alert('인증에 실패하였습니다.')
            })
        })
    }

    const resendEmail = () => {
        setLoading(true)
        customAxios().then(res => {
            res.get('/mail/send', config)
            .then(res => {
                setLoading(false)
                Alert.alert("인증 메일을 재전송하였습니다.")
            })
            .catch(e => {
                setLoading(false)
                Alert.alert(
                    "재전송 실패!",
                    "'인증 메일 재전송'을 다시 눌러주세요.",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }],
                    { cancelable: false }
                )
            })
        })
    }

    useEffect(() => {
        const updateLayout = () => {
            console.log('dp: ', Dimensions.get('window').width)
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
                <Text style={styles.loginText}>Sign Up</Text>
            </View>
            <View style={styles.contentsContainer}>
                {/* <Image source={emailLogo} style={availableDeviceWidth > 350 ? styles.emailLogo : styles.smallEmailLogo} /> */}
                <Image source={emailLogo} style={{width: availableDeviceWidth * 0.3, height: availableDeviceWidth * 0.3}} />
                <Text style={styles.completeMent}>인증메일 발송완료</Text>
                <Text style={styles.emailMent}>{email}</Text>
                <Text style={styles.announcement}>위의 메일함에서 '메일 인증' 버튼을 눌러주세요.</Text>
                <Text style={styles.announcement}>그 후 아래 '인증 완료'를 누르면 자동 로그인 됩니다.</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmAndLogin}>
                    <Text style={styles.confirmMent}>인증 완료</Text>
                </TouchableOpacity>
                <View style={styles.bar} />
                <View style={styles.resendContainer}>
                    <Text style={styles.announcement}>메일을 받지 못 하셨나요?</Text>
                    <Text style={styles.resendMent} onPress={resendEmail}>인증 메일 재전송</Text>
                </View>
            </View>
            {
                loading &&
                <View style={styles.sendingContainer}>
                    <Text style={styles.announcement}>메일 전송중</Text>
                    <ActivityIndicator color='#D14124' marginLeft='3%' />
                </View>
            }
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
    contentsContainer: {        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: width > 500 ? '10%' : '15%',
        marginBottom: '8%'
    },
    emailLogo: {
        width: width > 500 ? (width * 32) / 100 : (width * 40) / 100,
        height: width > 500 ? (height * 20) / 100 : (height * 19.5) / 100,
        marginRight: '0%',
        marginBottom: width > 500 ? '2%' : '3.5%'
    },
    smallEmailLogo: {
        width: (width * 32) / 100,
        height: (height * 20) / 100,
        marginBottom: '3.5%'
    },
    completeMent: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width > 500 ? 30 : 25,
        marginBottom: '8%'
    },
    emailMent: {
        fontSize: width > 500 ? 25 : 17,
        fontWeight: 'bold',
        marginBottom: '2%'
    }, 
    announcement: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width > 500 ? 25 : width * 0.039,
        marginTop: '3%',
        color: '#75787B'
    },
    bar: {
        width: '100%',
        height: 1,
        backgroundColor: '#D14124',
        marginTop: '10%',
        marginBottom: '10%'
    },
    resendContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    resendMent: {
        fontFamily: 'TmoneyRoundWindRegular',
        fontSize: width > 500 ? 25 : width * 0.039,
        textDecorationLine: 'underline',
        marginTop: '3%',
        marginLeft: '2%'
    },
    confirmButton: {
        width: (width * 50) / 100,
        height: (height * 7) / 100,
        borderColor: '#D14124',
        borderWidth: 2,
        borderRadius: width > 500 ? 40 : 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        marginTop: 20
    },
    confirmMent: {
        fontSize: width > 500 ? 30 : 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124'
    },
    sendingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})


export default EmailAuthPage
