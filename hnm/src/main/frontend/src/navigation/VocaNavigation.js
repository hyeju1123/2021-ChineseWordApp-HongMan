import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import MakeGroupPage from '../block/MakeGroupPage';
import VocabGroupPage from '../voca/VocabGroupPage';
import VocabList from '../voca/VocabList';
import SelectGroupPage from '../block/SelectGroupPage';
import AddVocabPage from '../block/AddVocabPage';
import UpdateVocabPage from '../block/UpdateVocabPage';
import HskWordDetail from '../study/HskWordDetail';

const Stack = createStackNavigator();

const VocaNavigation = () => {

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
                    name="VocabGroupPage" 
                    component={VocabGroupPage} 
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
                    name="VocabList" 
                    component={VocabList} 
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
                    name="HskWordDetail" 
                    component={HskWordDetail} 
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


export default VocaNavigation;
