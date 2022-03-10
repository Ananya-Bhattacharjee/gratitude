import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Button, Text, View, Linking } from 'react-native';
import styles from "../../stylesreact"
//import {Link } from 'react-router-dom';

//firebase
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

//navigation
import { useNavigation } from '@react-navigation/core';

//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/custominput'




const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();


    //method to sign in user.
    const handleSignIn = () => {
     signInWithEmailAndPassword(auth, email, password)
     .then((member)=>{
       console.log(member);
       const user = member.user;
       console.log('Logged in with: ', user.email)
     })
     .catch((error)=> {
       console.log(error);
     })
    }


      return (
          
          <KeyboardAvoidingView>
           <StatusBarHeader/>
           <View style={styles.body}>
          <View style={styles.logo}>
          <Text style={styles.logoText}>GRATITUDE</Text>
          <Text style={styles.logoText}>SPACE</Text>
          </View>   
        <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomButton text='SIGN IN' onPress={handleSignIn}></CustomButton>
        <Text 
        onPress={() => navigation.navigate('Signup')}
        style={styles.hyperlink}
        adjustsFontSizeToFit
        >
          Don't have an account? Create account
        </Text>
      </View>
      </KeyboardAvoidingView>
      )
  }
  
  export default Login;


