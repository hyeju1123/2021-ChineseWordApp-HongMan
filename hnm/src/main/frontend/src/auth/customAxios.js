import axios from 'axios';
import { LOCAL } from '../../ipConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function customAxios() {

    const token = await AsyncStorage.getItem('token');
    console.log("token!!!: ", token)

    const instance = axios.create({ baseURL: LOCAL });
    instance.interceptors.request.use(config => {
        if (token) {
            console.log('token!!:  ', token);
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    }, err => {
        console.log(err)
        return Promise.reject(err)
    })
    console.log('hello');
    console.log('instance: ', instance)
    return instance;
}

export default customAxios;