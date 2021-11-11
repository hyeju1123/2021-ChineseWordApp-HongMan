import React, { useState, useEffect } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MainPage from '../main/MainPage';
import StudyNavigation from './StudyNavigation';
import VocaNavigation from './VocaNavigation';
import QuizNavigation from './QuizNavigation';
import { signOut } from '../_modules/user';

const Stack = createStackNavigator();

const MainNavigation = () => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(handleAlertOn('로그아웃', '로그아웃 하시겠습니까?', ()=>{dispatch(signOut())}));
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
                    }}
                />
                <Stack.Screen 
                    name="StudyNavigation" 
                    component={StudyNavigation} 
                    options={{
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
                <Stack.Screen 
                    name="QuizNavigation" 
                    component={QuizNavigation} 
                    options={{
                        headerShown: false
                    }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default MainNavigation;
