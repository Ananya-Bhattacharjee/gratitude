import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
//import { TouchableOpacity } from "react-native-gesture-handler";


function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonBase} onPress={onPress} disallowInterruption={true}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonBase: {
    width: "100%",
    
  },
  button: {
    backgroundColor: '#6467dc',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    padding: 5,
    paddingBottom: 10,
    textAlign: "center",
  }
})



export default LogoutButton;

