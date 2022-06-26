import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Switch } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./CustomTextInput";

import { db, auth } from "../../firebase";
import { doc, setDoc, getDoc, collection, query, getDocs, where, onSnapshot} from 'firebase/firestore';
import { textShadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


const TimeDropdown = () => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderHour, setReminderHour] = useState('18');
  const [reminderMinutes, setReminderMinutes] = useState('00');

  const [isEnabled, setIsEnabled] = useState(true);

  //gets reminder on component mount
  useEffect(() => {
    const q = query(collection(db, "reminder"), where("reminderEmail", "==", auth.currentUser.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const hour = doc.data().hour;
        const minutes = doc.data().minutes;
        const isEnabled = doc.data().isEnabled;
        
        setReminderHour(hour);
        setReminderMinutes(minutes);
        setIsEnabled(isEnabled);
    });
    return unsubscribe;
    });
}, [])

 
  const [text, setText] = useState('Press The Switch');

  const toggleSwitch = () => {
      if (isEnabled) {
          setText('Inactive');
          setReminderTime(reminderHour, reminderMinutes, false);
      }
      else {
          setText('Active');
          setReminderTime(reminderHour, reminderMinutes, true);
      }

      setIsEnabled(previousState => !previousState);

     
  }


  //store the reminder time in backend.
  const setReminderTime = async ( hours, minutes, isToggled) => {

    //query for reminder with current user's email
     const reminderCol = collection(db, "reminder");
     const userReminder = query(reminderCol, where("reminderEmail", "==", auth.currentUser.email));
     const reminderSnapshot = await getDocs(userReminder);

     const reminderDoc = reminderSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

     alert("Reminder set for: " + hours + ":" + minutes)

     reminderDoc.forEach(async (result) => {
      await setDoc(doc(db, "reminder", result.id), {
        reminderEmail: auth.currentUser.email,
        hour: hours,
        minutes: minutes,
        isEnabled: isToggled,
      });
    });


 

  } 


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A date has been picked: ", time);
    console.log((time.getHours()<10?'0':'') + time.getHours());
    console.log((time.getMinutes()<10?'0':'') + time.getMinutes());

    //set reminder hour and minutes
    setReminderHour((time.getHours()<10?'0':'') + time.getHours());
    setReminderMinutes((time.getMinutes()<10?'0':'') + time.getMinutes());
    
    setReminderTime((time.getHours()<10?'0':'') + time.getHours(),
    (time.getMinutes()<10?'0':'') + time.getMinutes(), isEnabled);

    hideDatePicker();
  };

  return (
    <View>
    <View style={stylesTime.settingsCard}>
    <Text style={stylesTime.settingsHeadings}>Daily Reminder Time:</Text>
    {/*<Switch
        trackColor={{false: '#b7b7b7', true:'#6467dc'}}
        thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
        ios_backgroundColor='#b7b7b7'
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={stylesTime.switch}
      />*/}
      <View style={{width: '100%'}}>
        <Text style={stylesTime.reminderTime}>{reminderHour}:{reminderMinutes}</Text>
        {/*<Button title="Select New Reminder Time" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          locale="en_GB" 
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
      />*/}
      </View>
      </View>
      <View style={stylesTime.settingsCard}>
          {/*<Text style={stylesTime.settingsHeadings}>Reminder Time: </Text>*/}
            
      </View>
      </View>


  
  );
};

export default TimeDropdown;

const stylesTime = StyleSheet.create({
  reminderTime: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,
  },
  settingsCard: {
    //marginTop: 30,
    //marginBottom: 30,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    width: '100%',
    borderColor: '#7a89da',
    borderTopWidth: 3,
    borderBottomWidth: 3,
},
settingsHeadings: {
    //paddingLeft: 20,
    fontSize: 25,
    paddingTop: 25,
    paddingBottom: 25,
    fontWeight: '500',
    textAlign: 'center',
},
settingsText: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 20,
},
switch: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 30,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] 
}
})