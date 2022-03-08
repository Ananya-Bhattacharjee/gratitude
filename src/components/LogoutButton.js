import React from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { withOrientation } from 'react-navigation';

import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";


function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonBase} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonBase: {
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: '#6467dc',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    padding: 5,
    paddingBottom: 10,
  }
})



export default LogoutButton;

/*
const SignOutUser = () => {
    signOut(auth)
    .then((result)=>{
        setIsSignedIn(false);
    })
    .catch((err)=>{
        console.log(err);
    })
}*/