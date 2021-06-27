import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartPage from '../main/StartPage';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const Stack = createStackNavigator();

const StartNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="StartPage" 
                    component={StartPage} 
                    options={{
                    headerTitle: '',
                    headerStyle: {
                        elevation: 0
                    }
                    }}
                />
                <Stack.Screen 
                    name="SignIn" 
                    component={SignIn} 
                    options={{
                    headerTitle: '',
                    headerTintColor: '#ffffff',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#D14124',
                    }
                    }}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{
                    headerTitle: '',
                    headerTintColor: '#ffffff',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#D14124',
                    }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default StartNavigation;
