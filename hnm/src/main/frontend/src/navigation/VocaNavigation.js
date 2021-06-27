import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VocaListPage from '../voca/VocaListPage';
import VocaFormPage from '../voca/VocaFormPage';

const Stack = createStackNavigator();

const VocaNavigation = ({ navigation }) => {

    return (
        
            <Stack.Navigator>
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
