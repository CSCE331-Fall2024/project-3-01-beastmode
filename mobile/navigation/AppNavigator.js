import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Landing">
    <Stack.Screen
      name="Landing"
      component={LandingScreen}
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export default AppNavigator;
