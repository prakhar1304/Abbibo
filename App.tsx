import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SplashScreen from 'react-native-splash-screen';

import Login_Screen from './src/authentication/Login_Screen';
import Signin_Screen from './src/authentication/Signin_Screen';
import Add from './src/authentication/Add';
import Profilescreen from './src/screens/Profilescreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="Login"
          component={Login_Screen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Signin_Screen" component={Signin_Screen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="Add" component={Add}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={Profilescreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
