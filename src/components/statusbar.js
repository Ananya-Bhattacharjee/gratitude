import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StatusBarHeader() {
    return (
        <View style={styles.container}>
        {/*Status Bar*/}
        <StatusBar style="auto"/>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6467dc',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
      },
  })