import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LOCAL } from '../../ipConfig';

class AuthenticationService {

    executeJwtSignUpService(email, password) {
        return axios.post(`${LOCAL}/auth/signUp`, {
            email, password
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