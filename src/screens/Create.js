import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Alert, ScrollView} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import GratitudeInput from '../components/GratitudeInput'
import Dropdown from '../components/Dropdown'
import MetNeedsMenu from '../components/MetNeedsMenu'
import CharacterMenu from '../components/CharacterMenu'

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
    const [newMoodBefore, setMoodBefore] = useState({});
    const [newMoodAfter, setMoodAfter] = useState({});
    const [needs, setNeeds] = useState([]);
    const [characters, setCharacters] = useState([]);
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
          moodBefore: newMoodBefore,
          moodAfter: newMoodAfter,
          needs: needs,
          characters: characters,
        }
        await setDoc(newEntryRef,payload);
        
        //clear data after submission
        setMoodBefore({});
        setMoodAfter({});
        setNeeds([]);
        setCharacters([]);
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
            <ScrollView style={stylesCreate.scrollStyle}
            nestedScrollEnabled={true}>
            <View style={styles.body}>    
            <View style={stylesCreate.createForm}>
            <Text style={styles.screenTitle}>CREATE NEW{"\n"}ENTRY</Text>
            <Text style={stylesCreate.label}>How Are You Feeling Before?</Text>
            <Dropdown mood={newMoodBefore} setMood={setMoodBefore}/>
            <Text style={stylesCreate.label}>Met Needs</Text>
            <MetNeedsMenu selectedNeeds={needs} setSelectedNeeds={setNeeds}/>
            {/*
            <Text style={stylesCreate.label}>Character Strengths</Text>
        <CharacterMenu selectedCharacters={characters} setSelectedCharacters={setCharacters}/>*/}
            <Text style={stylesCreate.label}>Write Gratitude Entry Here</Text>
            <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
            <Text style={stylesCreate.label}>How Are You Feeling After?</Text>
            <Dropdown mood={newMoodAfter} setMood={setMoodAfter}/>
            <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
            </View>
            </View>
            </ScrollView>
        )
    }
    else { //control condition
        console.log("CONTROL");
        return (
           
            <ScrollView style={stylesCreate.scrollStyle}
            nestedScrollEnabled={true}>
            <View style={styles.body}>
            <View style={stylesCreate.createForm}>
            <Text style={styles.screenTitle}>CREATE NEW{"\n"}ENTRY</Text>
            <Text style={stylesCreate.label}>How Are You Feeling Before?</Text>
            <Dropdown mood={newMoodBefore} setMood={setMoodBefore}/>
            <Text style={stylesCreate.label}>Write Gratitude Entry Here</Text>
            <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
            <Text style={stylesCreate.label}>How Are You Feeling After?</Text>
            <Dropdown mood={newMoodAfter} setMood={setMoodAfter}/>
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
        paddingTop: 10,
    },
    gratitudeField: {
        minHeight: 500,
    },
    createForm: {
        display: 'flex',
        flexWrap: 'wrap',
        //alignContent: 'center',
        //alignSelf: 'center',
        //marginBottom: 110,
    },
    scrollStyle: {
        backgroundColor: '#b0caef',
    }
})