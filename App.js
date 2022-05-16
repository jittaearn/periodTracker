import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogInScreen from './pages/LogInScreen';
import MainScreen from './pages/MainScreen';
import ResultScreen from './pages/ResultScreen';
import CalendarScreen from './pages/CalendarScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
