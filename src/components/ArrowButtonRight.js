import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from "react-native-gesture-handler";

export default function ArrowButtonRight({ text, onPress }) {

        return (
            <TouchableOpacity onPress={onPress}>
              <View style={stylesTab.buttonRight}>
                <Text style={stylesTab.buttonText}>{ text }</Text>
              </View>
            </TouchableOpacity>
          )
  }

  const stylesTab = StyleSheet.create({
    buttonRight: {
        marginRight: 100,
        marginBottom: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 30,

    },
  })