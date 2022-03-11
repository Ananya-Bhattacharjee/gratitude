import React, {useState} from 'react';
import { KeyboardAvoidingView,StyleSheet, Button, Text, View, Linking } from 'react-native';
import styles from "../../stylesreact"
//import {Link } from 'react-router-dom';
import { auth } from '../../firebase';

import { useNavigation } from '@react-navigation/core';


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import stylesreact from '../../stylesreact';

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "../../firebase";
import { doc, addDoc, setDoc, collection } from 'firebase/firestore';

const SignUp = () => {

    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [newCode, setCode] = useState('');

    const navigation = useNavigation();


    //sign up function
    const RegisterUser = () => {
      createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((result)=>{

        console.log(result);
        addMember();
        setIsSignedIn(true);
      })
      .catch((result)=> {
        console.log(result);
      })
    }

    
    //create document in member collection
    const addMember = async () => {

      const collectionRef = collection(db, "member");
      const docRef = doc(collectionRef);
      const payload = {
        memberId: docRef.id,
        email: newEmail,
        code: newCode,
      }
      await addDoc(collectionRef, payload);
    }

     
      return (
          
          <KeyboardAvoidingView>
            <StatusBarHeader/>
            <View style={styles.body}>
          <View style={styles.logo}>
          <Text style={styles.logoText}>CREATE</Text>
          <Text style={styles.logoText}>ACCOUNT</Text>
          </View>   
        
        <CustomTextInput placeholder="Email" value={newEmail} setValue={setEmail}/>
        <CustomTextInput placeholder="Password" value={newPassword} setValue={setPassword} secureTextEntry={true}/>
        <CustomTextInput placeholder="Code" value={newCode} setValue={setCode}/>
        <CustomButton text='SIGN UP' onPress={RegisterUser}></CustomButton>
        <Text 
        onPress={() => navigation.navigate('Login')}
        style={styles.hyperlink}
        adjustsFontSizeToFit
        >
          Already have an account? Sign In
        </Text>
      </View>
           
        </KeyboardAvoidingView>
      )
  }
  export default SignUp;

  const stylesSignUp = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    }
  })