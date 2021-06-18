import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './src/MainPage';
import StudyPartList from './src/study/StudyPartList';
import StudyDayList from './src/study/StudyDayList';
import StudyWordList from './src/study/StudyWordList';

const Stack = createStackNavigator();

const App = () => {


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
