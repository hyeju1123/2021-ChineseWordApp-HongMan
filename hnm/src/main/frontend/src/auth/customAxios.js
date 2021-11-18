import axios from 'axios';
import { LOCAL } from '../../ipConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationService from './AuthenticationService';
import { handleAlertOn } from '../_modules/alert';
import { signOut } from '../_modules/user';
import { store } from '../_modules/store';

async function customAxios() {

    const { dispatch } = store;
    let checkJwtRes = await AuthenticationService.checkJwtToken();
    if (checkJwtRes) {
        const token = await AsyncStorage.getItem('token');

        const instance = axios.create({ baseURL: LOCAL });
        instance.interceptors.request.use(config => {
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        }, err => {
            console.log(err)
            return Promise.reject(err)
        })
        return instance;
    } else {
        dispatch(handleAlertOn('로그인 유효기간 만료', '다시 로그인 해주세요!', ()=>{}))
        dispatch(signOut())
    }
        // .then(async () => {
        //     const token = await AsyncStorage.getItem('token');

        //     const instance = axios.create({ baseURL: LOCAL });
        //     instance.interceptors.request.use(config => {
        //         if (token) {
        //             config.headers['Authorization'] = 'Bearer ' + token;
        //         }
        //         return config;
        //     }, err => {
        //         console.log(err)
        //         return Promise.reject(err)
        //     })
        //     return instance;
        // })
        // .catch(e => {
        //     // dispatch(handleAlertOn('로그인 유효기간 만료', '다시 로그인 해주세요!', ()=>{} ));
        //     Alert.alert("로그인 유효기간 만료")
        // })
}

export default customAxios;