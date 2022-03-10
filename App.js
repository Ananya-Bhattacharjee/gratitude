import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Button, Text, View, Linking } from 'react-native';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import styles from "./stylesreact"

import { auth } from './firebase';


//import screens
import Launch from './src/screens/Launch';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import Dashboard from'./src/screens/Dashboard';

//navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//tab module
import BottomTabs from './src/components/BottomTab'

const Stack = createNativeStackNavigator();

//declare class app
const App = () => {


    const [isSignedIn, setIsSignedIn] = useState(false);

    
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsSignedIn(true);
        }
        else {
          setIsSignedIn(false);
        }
        return unsubscribe;
      })
    })

    if(isSignedIn===true) {
      return (
        <BottomTabs/>
      )}
    else {
      return (
   
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Launch"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6467dc',
            },
            headerLeft: null,
            headerTitleAlign: 'center',
          }}
        >
        <Stack.Screen name="Launch" component={Launch} 
           options={{
            title: '',
            headerStyle: {
              backgroundColor: '#6467dc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
             
            },
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
     </NavigationContainer>
         
        )
  
    }

    
  }

export default App;


