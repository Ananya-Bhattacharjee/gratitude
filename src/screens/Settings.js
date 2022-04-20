import React from 'react';
import {KeyboardAvoidingView, View } from 'react-native'
import styles from "../../stylesreact"

//firebase
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

//Logout button
import LogoutButton from '../components/LogoutButton'


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
        <View>
        <View style={styles.body}>
        {/*<Text style={styles.screenTitle}>SETTINGS</Text>*/}
        <LogoutButton onPress={SignOutUser}/>
        </View>
        </View>
    )
}

export default Settings;