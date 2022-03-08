import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Button} from 'react-native';
import styles from "../../stylesreact";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton'



//import components
import StatusBarHeader from '../components/statusbar';
import { db} from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';
//import GratitudeCard from '../components/GratitudeCard';



const Dashboard = () => {
 
    
    const GetEntries = async () => {
        
        //get all entries from firebase. 
        const entriesCol = collection(db, 'entries');
        const entriesSnapshot = await getDocs(entriesCol);
        const entriesList = entriesSnapshot.docs.map(doc => doc.data());
       
        console.log(entriesList);
    }

    return (
   
        <KeyboardAvoidingView>
            <View style={styles.body}>
            {/*<Text style={styles.screenTitle}>DASHBOARD</Text>*/}
            <Text style={styles.screenTitle}>YOUR ENTRIES</Text>
            <Text style={styles.heading2}>Overall Mood: 5</Text>
            <Button title='Get Entries' onPress={GetEntries}/>
            </View>
        </KeyboardAvoidingView>
     
    )
    
}



export default Dashboard;