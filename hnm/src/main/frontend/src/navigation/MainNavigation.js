import React from 'react';
import { Button, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../main/MainPage';
import StudyNavigation from './StudyNavigation';
import VocaNavigation from './VocaNavigation';
import { signOut } from '../_modules/user';

const Stack = createStackNavigator();

const MainNavigation = () => {

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

    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen 
                    name="Home" 
                    component={MainPage} 
                    options={{
                    headerTitle: '',
                    headerStyle: {
                        elevation: 0
                    },
                    headerLeft: () => (
                        // <Button
                        //     onPress={handleLogout}
                        //     title="로그아웃"
                        // />
                        <TouchableWithoutFeedback onPress={handleLogout}>
                            <Image 
                                source={require('../../images/mainPage/menu.png')} 
                                style={{ width: 20, height: 14, marginLeft: 16 }} 
                            />
                        </TouchableWithoutFeedback>
                    ),
                    headerRight: () => (
                        <Image 
                            source={require('../../images/mainPage/plus.png')}
                            style={{ width: 3, height: 14, marginRight: 16 }}
                        />
                    )
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
