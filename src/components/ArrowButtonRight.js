import React from 'react';
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

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