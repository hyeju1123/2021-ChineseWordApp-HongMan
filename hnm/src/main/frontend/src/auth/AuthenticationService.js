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

    executeJwtAuthenticationService(email, password) {
        return axios.post(`${LOCAL}/auth/signIn`, {
            email, password
        });
    }

    async registerSuccessfullLoginForJwt(email, token, memberId) {
        console.log("===registerSuccessfulLoginForJwt===")

        console.log("token ", token);
        const stringId = JSON.stringify(memberId)
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('memberId', stringId);
        // this.setupAxiosInterceptors();
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
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


    // async setupAxiosInterceptors() {
    //     console.log('setupAxiosInterceptor')
    //     const request = axios.create();
        
    //     const token = await AsyncStorage.getItem('token');
    //     request.interceptors.request.use(config => {
    //         if (token) {
    //             config.headers['Authorization'] = 'Bearer ' + token;
    //         }
    //         return config;
    //     }, err => {
    //         console.log(err)
    //         return Promise.reject(err)
    //     })
    //     return request;
    // }

    // async setupAxiosInterceptors() {
    //     console.log('setupAxiosInterceptor')
    //     const token = await AsyncStorage.getItem('token');
    //     axios.interceptors.request.use(
    //         config => {
    //             if (token) {
    //                 config.headers['Authorization'] = 'Bearer ' + token;
    //             }
    //             return config;
    //         },
    //         error => {
    //             Promise.reject(error);
    //         }
    //     )
    // }

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
            console.log("logout ", logout)
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('stringId');
            logout = await AsyncStorage.getItem('token')
            console.log("logout ", logout)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthenticationService();