import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import StudyPartList from '../study/StudyPartList';
import StudyDayList from '../study/StudyDayList';
import StudyWordList from '../study/StudyWordList';
import StudyWordDetail from '../study/StudyWordDetail';

import HskLevelPage from '../study/HskLevelPage';
import HskThemePage from '../study/HskThemePage';
import HskWordPage from '../study/HskWordPage';
import HskWordDetail from '../study/HskWordDetail';

const Stack = createStackNavigator();

const StudyNavigation = () => {

    return (
        
        <Stack.Navigator>
            <Stack.Screen 
                name="HskLevelPage" 
                component={HskLevelPage} 
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
                name="HskThemePage" 
                component={HskThemePage} 
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
                name="HskWordPage" 
                component={HskWordPage} 
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
                name="HskWordDetail" 
                component={HskWordDetail} 
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
