import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import QuizTypePage from '../quiz/QuizTypePage';
import ListeningTypePage from '../quiz/listening/ListeningTypePage';
import ListeningHskThemePage from '../quiz/listening/ListeningHskThemePage';
import ListeningQuizPage from '../quiz/listening/ListeningQuizPage'
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
                name="QuizTypePage" 
                component={QuizTypePage} 
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
                name="ListeningTypePage" 
                component={ListeningTypePage} 
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
                name="ListeningHskThemePage" 
                component={ListeningHskThemePage} 
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
                name="ListeningQuizPage" 
                component={ListeningQuizPage} 
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
