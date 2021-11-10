import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MakeGroupPage from '../block/MakeGroupPage';
import VocabGroupPage from '../voca/VocabGroupPage';
import VocabList from '../voca/VocabList';
import SelectGroupPage from '../block/SelectGroupPage';
import AddVocabPage from '../block/AddVocabPage';
import UpdateVocabPage from '../block/UpdateVocabPage';
import HskWordDetail from '../study/HskWordDetail';

const Stack = createStackNavigator();

const VocaNavigation = () => {

    return (
        
            <Stack.Navigator
                screenOptions={{
                    safeAreaInsets: {top: 25}
                }}
            >
                <Stack.Screen 
                    name="VocabGroupPage" 
                    component={VocabGroupPage} 
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
                    name="VocabList" 
                    component={VocabList} 
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
                    name="HskWordDetail" 
                    component={HskWordDetail} 
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


export default VocaNavigation;
