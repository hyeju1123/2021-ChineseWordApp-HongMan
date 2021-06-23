import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../MainPage';
import StudyPartList from '../study/StudyPartList';
import StudyDayList from '../study/StudyDayList';
import StudyWordList from '../study/StudyWordList';
import StudyWordDetail from '../study/StudyWordDetail';

const Stack = createStackNavigator();

const StudyNavigation = () => {

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
                    }
                    }}
                />
                <Stack.Screen 
                    name="StudyPartList" 
                    component={StudyPartList} 
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
                    name="StudyDayList" 
                    component={StudyDayList} 
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
                    name="StudyWordList" 
                    component={StudyWordList} 
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
                    name="StudyWordDetail" 
                    component={StudyWordDetail} 
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



export default StudyNavigation;
