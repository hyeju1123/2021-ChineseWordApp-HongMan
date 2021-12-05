import React, { useState } from 'react';
import { TouchableOpacity, 
         ActivityIndicator,
         Text, 
         SafeAreaView, 
         View, 
         ScrollView,
         Image } from 'react-native';
import emailLogo from '../../images/snsLogo/email.png';
import customAxios from './customAxios';
import { useDispatch } from 'react-redux';
import { signIn } from '../_modules/user';
import { handleAlertOn } from '../_modules/alert';
import styles from './styles/EmailAuthPageStyle';

function EmailAuthPage({ route }) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { email, password } = route.params;

    const confirmAndLogin = async () => {
        customAxios().then(res => {
            res !== undefined &&
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
                    dispatch(handleAlertOn("인증 미완료 상태입니다", "메일함에서 '메일 인증' 버튼을 눌러주세요!", ()=>{} ));
                }
            })
            .catch(e => {
                console.log('메일 인증 에러: ', e)
                dispatch(handleAlertOn("인증 실패!", "인증에 실패하였습니다.", ()=>{} ));
            })
        })
    }

    const resendEmail = () => {
        setLoading(true)
        customAxios().then(res => {
            res !== undefined &&
            res.get('/mail/resend', {
                params: {
                    email: email
                }
            })
            .then(res => {
                setLoading(false)
                dispatch(handleAlertOn("인증 메일을 재전송하였습니다", "메일함에서 '메일 인증' 버튼을 눌러주세요!", ()=>{} ));
            })
            .catch(e => {
                setLoading(false)
                dispatch(handleAlertOn("재전송 실패!", "'인증 메일 재전송'을 다시 눌러주세요.", ()=>{} ));
            })
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView alwaysBounceHorizontal={false} alwaysBounceVertical={false} bounces={false}>
            <View style={styles.topBlock}>
                <Text style={styles.loginText}>Sign Up</Text>
            </View>
            <View style={styles.contentsContainer}>
                <Image source={emailLogo} style={styles.emailLogo} />
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

export default EmailAuthPage
