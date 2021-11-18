import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NaverLogin, getProfile } from '@react-native-seoul/naver-login';

import { LOCAL } from '../../ipConfig';

class AuthenticationService {

    executeJwtSignUpService(email, password, oauth) {
        return axios.post(`${LOCAL}/auth/signUp`, {
            email, password, oauth
        });
    }

    executeJwtAuthenticationService(email, password, snsType) {
        return axios.post(`${LOCAL}/auth/signIn`, {
            email, password, snsType
        });
    }

    async registerSuccessfullLoginForJwt(email, accessToken, refreshToken, memberId, snsType) {
        console.log("===registerSuccessfulLoginForJwt===")

        const stringId = JSON.stringify(memberId)
        let date = new Date();
        date.setDate(date.getDate() + 1);
        await AsyncStorage.setItem('token', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('memberId', stringId);
        await AsyncStorage.setItem('snsType', snsType);
        await AsyncStorage.setItem('jwtValidTime', JSON.stringify(date.getTime()));
        // this.setupAxiosInterceptors();
    }

    async checkJwtToken() {
        let validTime = await AsyncStorage.getItem('jwtValidTime');
        console.log('유효시간: ', validTime)
        validTime = new Date(parseInt(validTime))
        console.log('valid time: ', validTime)
        if (validTime < new Date()) {
            console.log('유효한 시간이 지났습니다.')
            let memberId = await AsyncStorage.getItem('memberId');
            let accessToken = await AsyncStorage.getItem('token');
            let refreshToken = await AsyncStorage.getItem('refreshToken');
            try {
                let newToken = await axios.post(`${LOCAL}/auth/token/refresh`, 
                    { accessToken, refreshToken }, 
                    { params:{ memberId: memberId } 
                })
                console.log(newToken)
                let newValidTime = new Date();
                newValidTime.setDate(newValidTime.getDate() + 1);
                await AsyncStorage.setItem('token', newToken.data.accessToken)
                await AsyncStorage.setItem('refreshToken', newToken.data.refreshToken)
                await AsyncStorage.setItem('jwtValidTime', JSON.stringify(newValidTime.getTime()))
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
            // let newToken = await axios.post(`${LOCAL}/auth/token/refresh`, { accessToken, refreshToken }, { params:{ memberId: memberId } })
            // console.log(`새 토큰: `, newToken.data.message, `\n\n성공 여부: `, newToken.data.success)
            // if (newToken.data.success) {
            //     let newValidTime= new Date();
            //     newValidTime.setDate(newValidTime.getDate() + 7);
            //     await AsyncStorage.setItem('token', newToken.data.message)
            //     await AsyncStorage.setItem('jwtValidTime', JSON.stringify(newValidTime.getTime()))
            //     return true;
            // } else {
            //     Alert.alert("로그인 암호가 만료되었습니다. 다시 로그인해주세요.");
            //     return false;
            // }
            
        } else return true;
    }

    handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google email: ', userInfo.user.email);
            return { email: userInfo.user.email, error: false };
        } catch (e) {
            return { email: '', error: true };
        }
    }

    handleNaverSignIn = props => {
        return new Promise((resolve, reject) => {
            NaverLogin.login(props, (err, token) => {
                if (err) {
                    reject(err);
                }
                this.getNaverUserProfile(token)
                    .then(res => {
                        console.log('naver result: ', res.email)        
                        resolve(res.email)
                    })
            })
        })
    }

    getNaverUserProfile = async (token) => {
        const profileResult = await getProfile(token.accessToken)
        if (profileResult.resultcode === '024') {
            return { error: true }
        }
        console.log('naver email: ', profileResult.response.email)
        return { email: profileResult.response.email, error: false }
    }

    naverLogout = () => {
        NaverLogin.logout();
    }

    googleLogout = async () => {
        try {
            await GoogleSignin.signOut();
            return { error : false }
        } catch (e) {
            return { error: true }
        }
    }

    async logout() {
        try {
            let logout = await AsyncStorage.getItem('token')
            let snsType = await AsyncStorage.getItem('snsType');
            // if (snsType === 'google') await this.googleLogout();
            // if (snsType === 'naver') this.naverLogout();
            await this.googleLogout();
            this.naverLogout();
            console.log('snsType: ', snsType);
            console.log("logout ", logout)
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('memberId');
            await AsyncStorage.removeItem('snsType');
            await AsyncStorage.removeItem('jwtValidTime');
            logout = await AsyncStorage.getItem('token')
            console.log("logout ", logout)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthenticationService();