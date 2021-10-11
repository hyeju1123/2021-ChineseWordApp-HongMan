import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VocaListPage from '../voca/VocaListPage';
import VocaFormPage from '../voca/VocaFormPage';
import VocaWordDetail from '../voca/VocaWordDetail';
// import UpdateVocaPage from '../voca/UpdateVocaPage';
import UpdateVocabPage from '../block/UpdateVocabPage';

import MakeGroupPage from '../block/MakeGroupPage';
import VocabGroupPage from '../voca/VocabGroupPage';
import VocabList from '../voca/VocabList';
import SelectGroupPage from '../block/SelectGroupPage';
import AddVocabPage from '../block/AddVocabPage';
import HskWordDetail from '../study/HskWordDetail';

const Stack = createStackNavigator();

const VocaNavigation = ({ navigation }) => {

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
                <Stack.Screen 
                    name="VocaListPage" 
                    component={VocaListPage} 
                    options={{
                        headerTitle: '',
                        headerTintColor: '#ffffff',
                        headerStyle: {
                            elevation: 0,
                            backgroundColor: '#D14124',
                        },
                        headerRight: () => (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('VocaFormPage')}>
                                <Text style={styles.addVocaBtnText}>+</Text>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
                <Stack.Screen 
                    name="VocaFormPage" 
                    component={VocaFormPage} 
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
                    name="VocaWordDetail" 
                    component={VocaWordDetail} 
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

const styles = StyleSheet.create({
    addVocaBtnText: {
        paddingRight: 10,
        fontSize: 30,
        color: 'white'
    }
   
});


export default VocaNavigation;
