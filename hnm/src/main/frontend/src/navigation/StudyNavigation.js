import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import StudyPartList from '../study/StudyPartList';
import StudyDayList from '../study/StudyDayList';
import StudyWordList from '../study/StudyWordList';
import StudyWordDetail from '../study/StudyWordDetail';

const Stack = createStackNavigator();

const StudyNavigation = () => {

    return (
        
        <Stack.Navigator>
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
        
    );
};



export default StudyNavigation;
