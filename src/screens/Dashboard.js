import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Button, FlatList, ScrollView} from 'react-native';
import styles from "../../stylesreact";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton'



//import components
import StatusBarHeader from '../components/statusbar';
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query, deleteDoc } from 'firebase/firestore';
import GratitudeCard from '../components/GratitudeCard';

//import date
import moment from 'moment'; 


const Dashboard = () => {
    
    const [entries, setEntries] = useState([]);
    

    
   


    const GetEntries = async () => {

        

        const today = moment().format("DD/MM/YYYY");
        //get all entries from firebase for current member
        //const [currentDate, setCurrentDate] = useState(today);

        //get entries of specific date for currently signed in member 
        const entriesCol = collection(db, "entries");
        const memberEntries = query(entriesCol, where("memberEmail", "==", auth.currentUser.email),
        where("date", "==", today));
        const entrySnapshot = await getDocs(memberEntries)
        const entriesArray = [];
        entrySnapshot.docs.map(doc => 
            entriesArray.push(doc.data()),
        );

        setEntries(entriesArray);

        alert(entries);
        


    }

    return (
   
        <KeyboardAvoidingView>
            <View style={styles.body}>
            {/*<Text style={styles.screenTitle}>DASHBOARD</Text>*/}
            <Text style={styles.screenTitle}>YOUR ENTRIES</Text>
            <Text style={styles.heading2}>Overall Mood: 5</Text>
            <Button title='Get Entries' onPress={GetEntries}/>
            <FlatList 
            nestedScrollEnabled
            data={entries}
            renderItem={({ item }) => (
                <GratitudeCard entryId={item.entryId} email={item.memberEmail} entryDate={item.date} mood={item.mood} description={item.entryDescription}/>
            )}
            />
            </View>
        </KeyboardAvoidingView>
     
    )
    
}

const stylesDashboard = StyleSheet.create({

})



export default Dashboard;