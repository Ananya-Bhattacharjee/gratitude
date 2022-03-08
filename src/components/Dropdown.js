import React, { useState, } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'


const Dropdown = ( {newMood, setMood }) => {



    return (
        <View>
        <Picker
        value = {newMood}
        onValueChange={(itemValue, itemIndex) => 
            setMood(itemValue)
        }
        style={styles.picker}
        itemStyle={styles.pickerItem}
        >
        <Picker.Item label="Very Low Mood - 1" value="1" />
        <Picker.Item label="Low Mood - 2" value="2" />
        <Picker.Item label="Neutral - 3" value="3" />
        <Picker.Item label="Good Mood - 4" value="4" />
        <Picker.Item label="Very Good Mood - 5" value="5" />
        </Picker>
        </View>
    )
}

export default Dropdown;



const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker: {
    // flex: 1,
      width: "100%",
      height: 44,
      marginTop: 10,
    },
   pickerItem: {
    height: 30,
   }
})