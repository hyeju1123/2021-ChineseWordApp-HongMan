import React, { useState } from 'react';
import { Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleAlertOn } from '../_modules/alert';
import { handleRedTheme, handleWhiteTheme } from '../_modules/color';
import { signOut } from '../_modules/user';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import MainPage from '../main/MainPage';
import StudyNavigation from './StudyNavigation';
import VocaNavigation from './VocaNavigation';
import QuizNavigation from './QuizNavigation';

const Stack = createStackNavigator();

const MainNavigation = () => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(handleAlertOn('로그아웃', '로그아웃 하시겠습니까?', ()=>{dispatch(signOut())}));
    }
    const handleTheme = (f) => {
        dispatch(f());
    }

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
                        headerLeft: () => (
                            <>
                                <TouchableOpacity onPress={() => handleTheme(handleRedTheme)}>
                                    <Text style={{ fontSize: 18, marginLeft: 20 }}>red</Text>                                    
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleTheme(handleWhiteTheme)}>
                                    <Text style={{ fontSize: 18, marginLeft: 20 }}>white</Text>
                                </TouchableOpacity>
                            </>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={handleLogout}>
                                <Image 
                                    source={require('../../images/mainPage/menu.png')} 
                                    style={{width: availableDeviceWidth * 0.07, height: availableDeviceWidth * 0.07, marginRight: availableDeviceWidth * 0.07}}
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
