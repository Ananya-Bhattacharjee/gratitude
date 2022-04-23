import React, { useEffect, useState, useRef} from 'react';
import { Text, View, Button, Platform } from 'react-native';
import styles from "./stylesreact"

import { auth } from './firebase';

import { LogBox } from 'react-native';


//import screens
import Launch from './src/screens/Launch';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import Dashboard from'./src/screens/Dashboard';

//navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import from firebase
import { db } from "./firebase";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

//tab module
import BottomTabs from './src/components/BottomTab'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


const Stack = createNativeStackNavigator();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//declare class app
const App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [reminderHour, setReminderHour] = useState('00');
    const [reminderMinutes, setReminderMinutes] = useState('00');

    const [isEnabled, setIsEnabled] = useState(false);
    const [notifId, setNotifId] = useState('');

    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, "reminder", "reminder"), (doc) => {
          //console.log("Current data: ", doc.data());
          console.log("Reminder set")
          const docReminder = doc.data();
          setReminderHour(docReminder.hour);
          setReminderMinutes(docReminder.minutes);
          setIsEnabled(docReminder.isEnabled);

          if(isEnabled) {
            var notifyUser = schedulePushNotification(reminderHour, reminderMinutes);
            setNotifId(notifyUser);
           }
           if(!isEnabled) {
             cancelNotification(notifId)
           }
        });
        return unsubscribe;
    }, [])

    //function to get reminder
    const getReminder = async () => {
      //const docRef = doc(db, "reminder", "reminder");
      //const docSnap = await getDoc(docRef);

      const docReminder = db.collection('')
     

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      setReminderHour(docSnap.hour);
      setReminderMinutes(docSnap.minutes);
      setIsEnabled(docSnap.isEnabled);

    }


    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    //hide console warnings
    //LogBox.ignoreLogs(['Warning: ...']); //Hide warnings

    //LogBox.ignoreAllLogs();//Hide all warning notifications on front-end

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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

//function to schedule daily gratitude reminder
async function schedulePushNotification(hours, minutes) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "What are you grateful for today",
      sound: 'default',
    },
    trigger: {
      //hour: hours,
      //minute: minutes,
      //repeats: true,
      seconds: 1,
    },
  });
  console.log("notif id on scheduling",id)
  console.log("Hours: " + hours);
  console.log("Minutes: " + minutes);
  return id;
}

//function to cancel daily gratitude reminder.
export async function cancelNotification(notifId){
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
