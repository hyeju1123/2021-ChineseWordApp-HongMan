import axios from 'axios';
import { LOCAL } from '../../ipConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function customAxios() {

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
}

export default customAxios;