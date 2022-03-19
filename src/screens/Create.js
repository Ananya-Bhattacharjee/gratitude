import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Alert, ScrollView} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import GratitudeInput from '../components/GratitudeInput'
import Dropdown from '../components/Dropdown'

//import firebase
import { db, auth } from "../../firebase";
import { addDoc, collection, doc, setDoc, onSnapshot, where, getDocs, query } from 'firebase/firestore';

//import date
import moment from 'moment'; 

const Create = (props) => {

    const today = moment().format("DD/MM/YYYY");
    const [members, setMembers] = useState([]);

     //code to incidicate whether participant is in control or experimental group.
     const [code, setCode] = useState('');
    
    //const entryId = '';
    const [newMood, setMood] = useState('1');
    const [newEntry, setEntry] = useState('');
    const email = auth.currentUser.email;
    const currentDate = moment().format("DD/MM/YYYY");

   
     
    

    //create document in member collection
    const addEntry = async () => {


        const collectionRef = collection(db, "entries");
        const newEntryRef = doc(collectionRef);

        const payload = { 
          entryId: newEntryRef.id,
          date: currentDate,
          memberEmail: email,
          entryDescription: newEntry,
          mood: newMood,
        }
        await setDoc(newEntryRef,payload);
        
        setMood('1');
        setEntry('');


        /*
        Alert.alert("New Entry Added!", "Press Dashboard to View", [
            {text: "Close", onPress: () => console.log('alert closed')}
        ]);*/

        alert("New Entry Added");
    
      }

    useEffect(() => {
        const q = query(collection(db, "member"), where("email", "==", auth.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //const membersArray = [];
            querySnapshot.forEach((doc) => {
                setCode(doc.data().code)
            });
        });
        return unsubscribe;
    });

    //experimental condition
    if(code=="TRANQUIL") {

        console.log("EXPERIMENTAL");
        return (
            <ScrollView>
            <View style={styles.body}>
            <View style={stylesCreate.createForm}>
            <Text style={styles.screenTitle}>CREATE NEW<br/>ENTRY</Text>
            <Text style={stylesCreate.label}>How Are You Feeling?</Text>
            <Dropdown newMood={newMood} setMood={setMood}/>
            <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
            <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
            </View>
            </View>
            </ScrollView>
        )
    }
    else { //control condition
        console.log("CONTROL");
        return (
            <ScrollView>
            <View style={styles.body}>
            <View style={stylesCreate.createForm}>
            <Text style={styles.screenTitle}>CREATE NEW<br/>ENTRY</Text>
            <Text style={stylesCreate.label}>How Are You Feeling?</Text>
            <Dropdown newMood={newMood} setMood={setMood}/>
            <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
            <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
            </View>
            </View>
            </ScrollView>
        )
    }

    }

export default Create;

const stylesCreate = StyleSheet.create({
    label: {
        fontSize: 25,
        color: '#0060ff',
        fontWeight: "400",
        textAlign: 'left',
        marginTop: 20,
    },
    gratitudeField: {
        minHeight: 500,
    },
    createForm: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
    }
})