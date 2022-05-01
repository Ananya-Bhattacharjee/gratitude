import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../../stylesreact"
import { auth } from '../../firebase';

import { useNavigation } from '@react-navigation/core';


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from "../../firebase";
import { doc, setDoc, collection } from 'firebase/firestore';



const SignUp = () => {

    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [newCode, setCode] = useState('');



    const navigation = useNavigation();


    //sign up function
    const RegisterUser = () => {

      if(newCode=="PEACE" || newCode=="TRANQUIL") {
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((result)=>{
          console.log(result);
          addMember();
          alert("Successfully Signed Up");
        })
        .catch((error)=> {
          console.log(error);
          if(error.code=="auth/email-already-in-use") {
            alert("Email already exists. Please try again!")
          }
          else if(error.code=="auth/invalid-email") {
            alert("Email is invalid. Must contain @. Please try again!")
          }
          else if(error.code=="auth/wrong-password") {
            alert("Password invalid. Must be at least 6 characters. Please try again!")
          }
          else {
            alert("Sign up failed. Please try again!");
          }
         
          setEmail('');
          setPassword('');
          setCode('');
        })
      }
      else {
        alert('Code invalid. Please try again');
      }

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
      await setDoc(docRef, payload);

      //store the reminder time in backend.
      const collectionRef2 = collection(db, "reminder");
      const docRef2 = doc(collectionRef2);
      const payload2 = {
        reminderEmail: newEmail,
        hour: "18",
        minutes: "00",
        isEnabled: false,
      }
      await setDoc(docRef2, payload2);



    }

 

     
      return (
          
          <View>
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
           
        </View>
      )
  }
  export default SignUp;

  const stylesSignUp = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    }
  })