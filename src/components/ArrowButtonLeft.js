import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from "react-native-gesture-handler";

export default function ArrowButtonLeft({ text, onPress }) {

        return (
            <TouchableOpacity onPress={onPress}>
              <View style={stylesTab.buttonLeft}>
                <Text style={stylesTab.buttonText}>{ text }</Text>
              </View>
            </TouchableOpacity>
          )
  }

  const stylesTab = StyleSheet.create({
    buttonLeft: {
        marginLeft: 100,
        marginBottom: 5,

    },
    buttonRight: {
        
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 30,

    },
  })