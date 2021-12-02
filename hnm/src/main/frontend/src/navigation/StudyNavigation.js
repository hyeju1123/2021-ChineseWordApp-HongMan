import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

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

    const color = useSelector(state => state.color.theme);
    const headerSet = {
        r: {
            tint: '#FFFFFF',
            back: '#D14124'
        },
        w: {
            tint: '#000000',
            back: '#FFFFFF'
        }
    }

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
                    headerTintColor: headerSet[color].tint,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: headerSet[color].back
                    }
                }}
            />
            <Stack.Screen 
                name="HskThemePage" 
                component={HskThemePage} 
                options={{
                    headerTitle: '',
                    headerTintColor: headerSet[color].tint,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: headerSet[color].back
                    }
                }}
            />
            <Stack.Screen 
                name="HskWordPage" 
                component={HskWordPage} 
                options={{
                    headerTitle: '',
                    headerTintColor: headerSet[color].tint,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: headerSet[color].back
                    }
                }}
            />
            <Stack.Screen 
                name="HskWordDetail" 
                component={HskWordDetail} 
                options={{
                    headerTitle: '',
                    headerTintColor: headerSet[color].tint,
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: headerSet[color].back
                    }
                }}
            />
            <Stack.Screen 
                    name="MakeGroupPage" 
                    component={MakeGroupPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: headerSet[color].tint,
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: headerSet[color].back
                        },
                    }}
            />
            <Stack.Screen 
                    name="AddVocabPage" 
                    component={AddVocabPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: headerSet[color].tint,
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: headerSet[color].back
                        },
                    }}
            />
            <Stack.Screen 
                    name="SelectGroupPage" 
                    component={SelectGroupPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: headerSet[color].tint,
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: headerSet[color].back
                        },
                    }}
                />
            <Stack.Screen 
                    name="UpdateVocabPage" 
                    component={UpdateVocabPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: headerSet[color].tint,
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: headerSet[color].back
                        },
                    }}
            />
        </Stack.Navigator>
        
    );
};

export default StudyNavigation;
