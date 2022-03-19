import React from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet} from 'react-native'
import styles from "../../stylesreact"

//firebase
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

//Logout button
import LogoutButton from '../components/LogoutButton'

//import components
import StatusBarHeader from '../components/statusbar'


const Settings = () => {

    const SignOutUser = () => {
        signOut(auth)
        .then((result)=>{
            console.log(result);
            console.log("logged out")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <KeyboardAvoidingView>
        <View style={styles.body}>
        {/*<Text style={styles.screenTitle}>SETTINGS</Text>*/}
        <LogoutButton onPress={SignOutUser}/>
        </View>
        </KeyboardAvoidingView>
    )
}

export default Settings;