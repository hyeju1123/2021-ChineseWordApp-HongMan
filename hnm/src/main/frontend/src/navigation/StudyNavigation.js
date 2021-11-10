import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HskLevelPage from '../study/HskLevelPage';
import HskThemePage from '../study/HskThemePage';
import HskWordPage from '../study/HskWordPage';
import HskWordDetail from '../study/HskWordDetail';
import UpdateVocabPage from '../block/UpdateVocabPage';
import AddVocabPage from '../block/AddVocabPage';
import SelectGroupPage from '../block/SelectGroupPage';
import MakeGroupPage from '../block/MakeGroupPage';

const Stack = createStackNavigator();

const StudyNavigation = () => {

    return (
        
        <Stack.Navigator
            screenOptions={{
                safeAreaInsets: {top: 25}
            }}
        >
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
                    name="MakeGroupPage" 
                    component={MakeGroupPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: '#ffffff',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: '#D14124',
                        },
                    }}
            />
            <Stack.Screen 
                    name="AddVocabPage" 
                    component={AddVocabPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: '#ffffff',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: '#D14124',
                        },
                    }}
            />
            <Stack.Screen 
                    name="SelectGroupPage" 
                    component={SelectGroupPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: '#ffffff',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: '#D14124',
                        },
                    }}
                />
            <Stack.Screen 
                    name="UpdateVocabPage" 
                    component={UpdateVocabPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: '#ffffff',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: '#D14124',
                        },
                    }}
            />
        </Stack.Navigator>
        
    );
};

export default StudyNavigation;
