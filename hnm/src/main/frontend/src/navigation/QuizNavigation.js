import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import QuizSample from '../quiz/QuizSample';

const Stack = createStackNavigator();

const QuizNavigation = () => {

    return (
        
        <Stack.Navigator
            screenOptions={{
                safeAreaInsets: {top: 25}
            }}
        >
            <Stack.Screen 
                name="QuizSample" 
                component={QuizSample} 
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



export default QuizNavigation;
