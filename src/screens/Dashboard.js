import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Button, FlatList, ScrollView, 
    ActivityIndicator} from 'react-native';
import styles from "../../stylesreact";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton'



//import components
import StatusBarHeader from '../components/statusbar';
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query, deleteDoc, onSnapshot } from 'firebase/firestore';
import GratitudeCard from '../components/GratitudeCard';

//import date
import moment from 'moment'; 


const Dashboard = (props) => {


    const [entries, setEntries] = useState([]);
    const [moods, setMoods] = useState([]);
    const [overallMood, setOverallMood] = useState(0);
    //const [mounted, setMounted] = useState(true);
    const [currentDate, setCurrentDate] = useState('')

    const today = moment().format("DD/MM/YYYY");

    const [headerTitle, setHeaderTitle] = useState('');
    
    useEffect(() => {
        const q = query(collection(db, "entries"), where("memberEmail", "==", auth.currentUser.email), 
        where("date", "==", props.currentDate));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const entriesArray = [];
            const moodArray = [];
            querySnapshot.forEach((doc) => {
                entriesArray.push(doc.data()),
                moodArray.push(doc.data().mood);
            });
            setEntries(entriesArray);

            getOverallMood(moodArray);

            console.log(entriesArray);

            console.log("Date " + props.currentDate);

            if(props.currentDate==today) {
                setHeaderTitle("TODAY");
            }
            else {
                setHeaderTitle(props.currentDate);
            }
           
        });
        return unsubscribe;
    }, [props.currentDate]);

    // Rerender after headerTitle change
  useEffect(() => {
    props.navigation.setOptions({
      title: headerTitle,
    });
  }, [headerTitle, props.navigation]);
    
   
    const getOverallMood = ( moodArray ) => {

        //get length of mood array
        var NumberOfMood = moodArray.length;

        var totalMood = 0;

        //iterate through moods.
        console.log(moodArray);
        console.log(NumberOfMood);

        for(let index = 0 ; index < NumberOfMood; index++) {
            const element = parseInt(moodArray[index]);
            totalMood = totalMood + element;
        }
        console.log(totalMood);

        //divide mood values by number of moods.
        

        if(NumberOfMood > 0) {
            var averageMood = Math.round(totalMood / NumberOfMood);
            setOverallMood(averageMood);
        }   
        else {
            setOverallMood(0);
        }
            
   
    }


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
   
        <KeyboardAvoidingView style={styles.flexStyle}>
            <View style={styles.body}>
            {/*<Text style={styles.screenTitle}>DASHBOARD</Text>*/}
            
            {/*<Button title='Get Entries' onPress={GetEntries}/>*/}
            <FlatList 
            style={stylesDashboard.flatlist}
            data={entries}
            renderItem={({ item }) => (
                <GratitudeCard entryId={item.entryId} email={item.memberEmail} entryDate={item.date} mood={item.mood} description={item.entryDescription} 
                />
            )}
            ListHeaderComponent={
                <View style={{marginBottom:30}}>
                <Text style={styles.screenTitle}>YOUR ENTRIES</Text>
                <Text style={styles.heading2}>Overall Mood: {overallMood}</Text>
                </View>
            }
            ListFooterComponent={<View style={{minHeight: 160}}/>}
            />
            </View>
        </KeyboardAvoidingView>
     
    )
    
}

const stylesDashboard = StyleSheet.create({
    flatlist: {
        width: '100%',
    }
})



export default Dashboard;