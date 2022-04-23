import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, FlatList } from 'react-native'
import styles from "../../stylesreact"

//firebase
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

//Logout button
import LogoutButton from '../components/LogoutButton'

//time picker
import TimeDropdown from '../components/TimeDropdown'

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
        <FlatList style={{backgroundColor: '#b0caef'}}
        ListHeaderComponent={
              <View>
              <Text style={styles.screenTitle}>SETTINGS</Text>
              <View style={{width: '100%', marginTop: 50, marginBottom: 200}}>
              <TimeDropdown/>
              <LogoutButton onPress={SignOutUser}/>
              </View>
              </View>
        }
        />     
    )
}

export default Settings;

const stylesSettings = StyleSheet.create({ 
    settingsCard: {
        //marginTop: 30,
        //marginBottom: 30,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        width: '100%',
        borderColor: '#7a89da',
        borderTopWidth: 3,
        borderBottomWidth: 3,
    },
    settingsHeadings: {
        //paddingLeft: 20,
        fontSize: 25,
        paddingTop: 25,
        paddingBottom: 25,
        fontWeight: '500',
        textAlign: 'center',
    },
    settingsText: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 20,
    },
    switch: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 30,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] 
    }
})