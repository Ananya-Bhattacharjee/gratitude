import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button} from 'react-native'

//navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//navigation
import { useNavigation } from '@react-navigation/core';

//import components
import LogoutButton from './LogoutButton'
import ArrowButtonLeft from './ArrowButtonLeft'
import ArrowButtonRight from './ArrowButtonRight'

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

//import date
import moment from 'moment'; 


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

    //
    const today = moment().format("DD/MM/YYYY");

    const [currentDate, setCurrentDate] = useState(today);


    const [leftArrow, setLeftArrow] = useState('');
    const [rightArrow, setRightArrow] = useState('');
    //change current date to previous day
    const previousDay = () => { 
      //convert date string to date
      var dateObj = moment(currentDate, "DD/MM/YYYY").format("DD/MM/YYYY");
      var previousDate = moment(dateObj, "DD/MM/YYYY").add(-1, 'days').format("DD/MM/YYYY");
  

      console.log(previousDate);
      setCurrentDate(previousDate);
    }

    //change current date to next day
    const nextDay = () => {
      //convert date string to date
      var dateObj = moment(currentDate, "DD/MM/YYYY").format("DD/MM/YYYY");
      var nextDate = moment(dateObj, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");

      console.log(nextDate);
      setCurrentDate(nextDate);
    }


  
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
                  fontSize: 20,
                  textTransform: 'uppercase',
                },
                 tabBarStyle: {
                   position: 'absolute',
                   backgroundColor: '#6467dc',
                   height: 80,
                   paddingBottom: 10,
                   flex: 1,
                 }
               }}
               tabBarOptions={{
                 showLabel: true,
                 activeTintColor: '#0062ff',
                 inactiveTintColor: '#FFFFFF',
                 scrollEnabled: true,
                 keyboardHidesTabBar: true,
                 tabBarLabelPosition: "below_icon",
                 lazy: true,
               }}

            >
                <Tab.Screen name="DASHBOARD" children={props => <Dashboard currentDate={currentDate} {...props} />}
                  style={{flex: 1}}
                  options={{
                    headerTitle: {currentDate},
                    tabBarIcon: (tabInfo) => {
                      return (
                        <MaterialIcons
                          name="dashboard"
                          size={40}
                          color={tabInfo.focused ? "#0062ff" : "#FFFFFF"}
                        />
                      );
                    },
                    tabBarLabel: "DASHBOARD",
                    headerRight: () => (
                      <ArrowButtonRight text=">" onPress={nextDay}/>
                    ),
                    headerLeft: () => (
                      //Button onPress next date
                      <ArrowButtonLeft text="<" onPress={previousDay}/>
                    ),
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
                  style={{flex: 1}}
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

const stylesTab = StyleSheet.create({
  arrowButtons: {

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    textAlign: 'center',
  },
})




