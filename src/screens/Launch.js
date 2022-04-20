import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import styles from "../../stylesreact"

import { useNavigation } from '@react-navigation/core';

//import components.
import CustomButton from '../components/CustomButton'
import StatusBarHeader from '../components/statusbar'

//declare Launch component.
function Launch() {
 
    const navigation = useNavigation();
    
    return (
  
      <View>
     
     <StatusBarHeader/>
      <View style={styles.body}>
          <View style={styles.logo}>
          <Text style={styles.logoText}>GRATITUDE</Text>
          <Text style={styles.logoText}>SPACE</Text>
          </View>
          <Text style={styles.quote}>"I am happy because I'm grateful. I choose to be grateful. That gratitude allows me to be happy."</Text>
          <Text style={styles.quoteAuthor}>-Will Arnett</Text>
          <CustomButton text='Sign Up' onPress={() => navigation.navigate('Signup')}></CustomButton>
        <Text 
        onPress={() => navigation.navigate('Login')}
        style={styles.hyperlink}
        adjustsFontSizeToFit
        disallowInterruption={true}
        >
          Already have an account? Sign In
        </Text>
      </View>
      
     
      </View>
    )
    }
  
  export default Launch;
  