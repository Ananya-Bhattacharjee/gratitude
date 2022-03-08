import * as React from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native'

//navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//navigation
import { useNavigation } from '@react-navigation/core';

//custom button
import LogoutButton from './LogoutButton'

//firebase
import { auth } from '../../firebase';



//icons modules
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";


//import screens
import Dashboard from '../screens/Dashboard'
import Create from '../screens/Create'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import { withOrientation } from 'react-navigation';


const Tab = createBottomTabNavigator();

const TabStack = createNativeStackNavigator();


/*
function StackTab() {
  <StackTab.Navigator initialRouteName="DASHBOARD">
      <StackTab.Screen name="DASHBOARD" component={Dashboard} />
      <StackTab.Screen name="CREATE" component={Create} />
      <StackTab.Screen name="PROFILE" component={Profile} />
      <StackTab.Screen name="SETTINGS" component={Settings} />
    </StackTab.Navigator>
}*/


const BottomTabs = () => {

  
    return (
            <NavigationContainer>
            <Tab.Navigator
               screenOptions={{
                 headerShown: true,
                 headerStyle: {
                  backgroundColor: '#6467dc',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                },
                 tabBarStyle: {
                   position: 'absolute',
                   backgroundColor: '#6467dc',
                   height: 80,
                   paddingBottom: 10,
                 }
               }}
               tabBarOptions={{
                 showLabel: true,
                 activeTintColor: '#0062ff',
                 inactiveTintColor: '#FFFFFF',
                 scrollEnabled: true,
               }}
            >
                <Tab.Screen name="DASHBOARD" component={Dashboard} 
                  options={{
                    headerTitle: 'Today',
                    tabBarIcon: (tabInfo) => {
                      return (
                        <MaterialIcons
                          name="dashboard"
                          size={40}
                          color={tabInfo.focused ? "#0062ff" : "#FFFFFF"}
                        />
                      );
                    },
                  }}
      
                />
                <Tab.Screen name="CREATE" component={Create} 
                  options={{
                    headerTitle: 'Create',
                    tabBarIcon: (tabInfo) => {
                      return (
                        <MaterialIcons
                          name="create"
                          size={40}
                          color={tabInfo.focused ? "#0062ff" : "#FFFFFF"}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen name="PROFILE" component={Profile} 
                  options={{
                    headerTitle: 'Profile',
                    tabBarIcon: (tabInfo) => {
                      return (
                        <FontAwesome
                          name="user"
                          size={40}
                          color={tabInfo.focused ? "#0062ff" : "#FFFFFF"}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen name="SETTINGS" component={Settings} 
                  options={{
                    headerTitle: 'Settings',
                    tabBarIcon: (tabInfo) => {
                      return (
                        <MaterialIcons
                          name="settings"
                          size={40}
                          color={tabInfo.focused ? "#0062ff" : "#FFFFFF"}
                        />
                      );
                    },
                  }}
                />
            </Tab.Navigator>
            </NavigationContainer>
    )
}

export default BottomTabs;





