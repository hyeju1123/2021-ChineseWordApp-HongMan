import React, { useState, useEffect } from 'react';
import { Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../main/MainPage';
import StudyNavigation from './StudyNavigation';
import VocaNavigation from './VocaNavigation';
import { signOut } from '../_modules/user';
import customAxios from '../auth/customAxios';
import AuthenticationService from '../auth/AuthenticationService';

const Stack = createStackNavigator();

const MainNavigation = () => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

    const dispatch = useDispatch();
    const handleLogout = () => {
        Alert.alert(
          "Log out",
          "로그아웃 하시겠습니까?",
          [
            {
              text: "취소",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "로그아웃",
              onPress: () => dispatch(signOut())
            }
          ]
        )
      }
      const testHello = async () => {
        let checkToken = await AuthenticationService.checkJwtToken();
        !checkToken && dispatch(signOut())
        customAxios().then(res => {
            res.get('/hello')
                .then(res => {
                    console.log('test Hello: ', res.data)
                })
                .catch(e => {
                    console.log('testHello error: ', e)
                })
        })
    }

    useEffect(() => {
        const updateLayout = () => {
          setAvailableDeviceWidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change', updateLayout);
    
        return () => {
          Dimensions.removeEventListener('change', updateLayout)
        }
      }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    safeAreaInsets: {top: 25}
                }}
            >
            <Stack.Screen 
                    name="Home" 
                    component={MainPage} 
                    options={{
                    headerTitle: '',
                    headerStyle: {
                        elevation: 0
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout}>
                            <Image 
                                source={require('../../images/mainPage/menu.png')} 
                                style={
                                    availableDeviceWidth > 500 ?
                                    {width: availableDeviceWidth * 0.05, height: availableDeviceWidth * 0.04, marginRight: availableDeviceWidth * 0.07} :
                                    {width: availableDeviceWidth * 0.07, height: availableDeviceWidth * 0.07, marginRight: availableDeviceWidth * 0.07}
                                }
                            />
                        </TouchableOpacity>
                    ),
                    // headerRight: () => (
                    //     <TouchableOpacity onPress={testHello}>
                    //     <Image 
                    //         source={require('../../images/mainPage/plus.png')}
                    //         style={{ width: 3, height: 14, marginRight: 16 }}
                    //     />
                    //     </TouchableOpacity>
                    // )
                    }}
                />
                <Stack.Screen 
                    name="StudyNavigation" 
                    component={StudyNavigation} 
                    options={{
                    // headerTitle: '',
                    // headerTintColor: '#ffffff',
                    // headerStyle: {
                    //     elevation: 0,
                    //     backgroundColor: '#D14124',
                    // },
                    headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="VocaNavigation" 
                    component={VocaNavigation} 
                    options={{
                        headerShown: false
                    }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default MainNavigation;
