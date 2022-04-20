import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import styles from "../../stylesreact"

//firebase
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

//navigation
import { useNavigation } from '@react-navigation/core';

//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'




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
          
          <View>
           <StatusBarHeader/>
           <View style={styles.body}>
          <View style={styles.logo}>
          <Text style={styles.logoText}>GRATITUDE</Text>
          <Text style={styles.logoText}>SPACE</Text>
          </View>   
        <CustomTextInput placeholder="Email" value={email} setValue={setEmail}/>
        <CustomTextInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomButton text='SIGN IN' onPress={handleSignIn}></CustomButton>
        <Text 
        onPress={() => navigation.navigate('Signup')}
        style={styles.hyperlink}
        adjustsFontSizeToFit
        disallowInterruption={true}
        >
          Don't have an account? Create account
        </Text>
      </View>
      </View>
      )
  }
  
  export default Login;


