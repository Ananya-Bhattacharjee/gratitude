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
import { doc, getDoc, onSnapshot, query, where, getDocs, collection } from 'firebase/firestore';

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

//define global variable
//let notificationEmail = "";

//declare class app
let notificationEmail;

const App = () => {



  useEffect(() => {
    
    const user = auth.currentUser;
    if(user!=null) {
      notificationEmail = user.email;
      //test
    }

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
        
      }
      else {
        setIsSignedIn(false);
      }
      

      return unsubscribe;
    })
  

  },[])   



    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [reminderHour, setReminderHour] = useState('00');
    const [reminderMinutes, setReminderMinutes] = useState('00');

    const [isEnabled, setIsEnabled] = useState(false);
    //const [notifId, setNotifId] = useState('');

    const [hourString, setHourString] = useState('');
    const [minutesString, setMinutesString] = useState('');

    const [notifyId, setNotifyId] = useState('');
  
    const [reminderId, setReminderId] = useState('reminder');

    const [reminderMounted, setReminderMounted] = useState(false);

    //const [notificationEmail, setNotificationEmail] = useState('');

    const [isSignedIn, setIsSignedIn] = useState(false);

  /*
    useEffect(() => {
      if(isSignedIn) {
        setNotificationEmail(auth.currentUser.email);
      }
      return () => {
        setNotificationEmail('');
      };
    }, [isSignedIn]);*/
    
    
     //gets reminder on component mount

      useEffect(() => {

          

          auth.onAuthStateChanged(
            (user) => {
                if(user!=null) {
                  notificationEmail = auth.currentUser.email;
                }
                else {
                  notificationEmail = "";
                }
                
                console.log("onAuthStateChanged: " + !!user);
            
                const q = query(collection(db, "reminder"), where("reminderEmail", "==", notificationEmail));
        
                console.log("working now");
        
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    //querySnapshot.docChanges().forEach(change => {
        
                      const docReminder = doc.data();
        
                      //set time text
                      setHourString(docReminder.hour);
                      setMinutesString(docReminder.minutes);
            
                      //set integer time
                      const hourValue = parseInt(docReminder.hour);
                      const minutesValue = parseInt(docReminder.minutes);
                      
                      setReminderHour(hourValue);
                      setReminderMinutes(minutesValue);
                      setIsEnabled(docReminder.isEnabled);
        
                      console.log("Reminder read");
        
                    //});
        
        
                });
                return unsubscribe;
                });
            
            
              }
          );

          //console.log("notification email")
          

      
    }, [])

    useEffect(async () => {

      if(isEnabled) {
        const notifyUser = schedulePushNotification(reminderHour, reminderMinutes, hourString, minutesString);
        console.log("Notification Scheduled: " + notifyUser);
        console.log("Notification scheduled at " + hourString + ":" + minutesString);

        
        //cancel previous daily reminder time.
        
        try {
          cancelPushNotification(notifyId._W);
          console.log(notifyId);
        }
        catch(err) {
          console.log(err);
        }
        

        setNotifyId(notifyUser);
       }
       if(!isEnabled) {
        Notifications.cancelAllScheduledNotificationsAsync() //cancel all notifications
        console.log("Cancel Notifications");
       }

       
    }, [reminderHour, reminderMinutes, isEnabled])

    /*
    useEffect(async () => {

      const docRef = doc(db, "reminder", reminderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

       //set time text
       setHourString(docSnap.hour);
       setMinutesString(docSnap.minutes);

       //set integer time
       const hourValue = parseInt(docSnap.hour);
       const minutesValue = parseInt(docSnap.minutes);
       
       setReminderHour(hourValue);
       setReminderMinutes(minutesValue);
       setIsEnabled(docSnap.isEnabled);

       if(isEnabled) {
         var notifyUser = schedulePushNotification(reminderHour, reminderMinutes, hourString, minutesString);
         setNotifId(notifyUser);
         console.log("Notification scheduled: " + notifyUser);
        }
        if(!isEnabled) {
         Notifications.cancelAllScheduledNotificationsAsync()
        }

    }, [])*/

    /*
    useEffect(() => {

        const unsubscribe = onSnapshot(doc(db, "reminder", reminderId), (doc) => {
          //console.log("Current data: ", doc.data());

          console.log("Reminder set")
          const docReminder = doc.data();

          //set time text
          setHourString(docReminder.hour);
          setMinutesString(docReminder.minutes);

          //set integer time
          const hourValue = parseInt(docReminder.hour);
          const minutesValue = parseInt(docReminder.minutes);
          
          setReminderHour(hourValue);
          setReminderMinutes(minutesValue);
          setIsEnabled(docReminder.isEnabled);

          if(isEnabled) {
            var notifyUser = schedulePushNotification(reminderHour, reminderMinutes, hourString, minutesString);
            console.log("Notification Scheduled: " + notifyUser);
           }
           if(!isEnabled) {
            Notifications.cancelAllScheduledNotificationsAsync()
           }
        });
        return unsubscribe;
    }, [])*/

    
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
    LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
    LogBox.ignoreAllLogs();//Hide all warning notifications on front-end


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
async function schedulePushNotification(hours, minutes, hourString, minutesString) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder:" + hourString + ":" + minutesString,
      body: "What are you grateful for today?",
      sound: 'default',
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });
  console.log("notif id on scheduling",id)
  console.log("Hours: " + hours);
  console.log("Minutes: " + minutes);
  return id;
}

async function cancelPushNotification(id) {
  Notifications.cancelScheduledNotificationAsync(id);
}

