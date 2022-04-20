import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from "react-native-gesture-handler";

export default function customButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} disallowInterruption={true}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 3,
    backgroundColor: '#6467dc',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 40,
    textAlign: 'center',
  }
})

