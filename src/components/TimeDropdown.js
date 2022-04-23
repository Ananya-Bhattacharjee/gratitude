import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Switch } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./CustomTextInput";

import { db } from "../../firebase";
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { textShadowColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


const TimeDropdown = () => {

  useEffect(() => {
    getReminderTime();
}, [])

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderHour, setReminderHour] = useState('0');
  const [reminderMinutes, setReminderMinutes] = useState('0');

  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState('Press The Switch');

  const getReminderTime = async () => {
    const docRef = doc(db, "reminder", "reminder");
    const docSnap = await getDoc(docRef);
    const docReminder = docSnap.data();

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    //console.log(docSnap);
    setReminderHour(docReminder.hour);
    setReminderMinutes(docReminder.minutes);
    setIsEnabled(docReminder.isEnabled);


    
  }

  useEffect(() => {
        setReminderTime();
        if(isEnabled) {
          alert("Reminder set for " + reminderHour+":"+reminderMinutes)
        } 
       
  }, [reminderHour, reminderMinutes, isEnabled]);

  

  const toggleSwitch = () => {
      if (isEnabled) {
          setText('Inactive');
      }
      else {
          setText('Active');
      }

      setIsEnabled(previousState => !previousState);
    
     
  }


  //store the reminder time in backend.
  const setReminderTime = async () => {
    await setDoc(doc(db, "reminder", "reminder"), {
      reminder: "reminder",
      hour: reminderHour,
      minutes: reminderMinutes,
      isEnabled: isEnabled,
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
    setReminderHour((time.getHours()<10?'0':'') + time.getHours());
    setReminderMinutes((time.getMinutes()<10?'0':'') + time.getMinutes());
    //set reminder time in backend.
    
    hideDatePicker();
  };

  return (
    <View>
    <View style={stylesTime.settingsCard}>
    <Text style={stylesTime.settingsHeadings}>Set Daily Reminder:</Text>
    <Switch
        trackColor={{false: '#b7b7b7', true:'#6467dc'}}
        thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
        ios_backgroundColor='#b7b7b7'
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={stylesTime.switch}
          />
      </View>
      <View style={stylesTime.settingsCard}>
          <Text style={stylesTime.settingsHeadings}>Reminder Time: </Text>
            <View style={{width: '100%'}}>
        <Text style={stylesTime.reminderTime}>{reminderHour}:{reminderMinutes}</Text>
        <Button title="Select New Reminder Time" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          locale="en_GB" 
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
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