import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import GratitudeInput from '../components/GratitudeInput'
import Dropdown from '../components/Dropdown'

//import firebase
import { db } from "../../firebase";
import { addDoc, collection } from 'firebase/firestore';

//import date
import moment from 'moment'; 

const Create = () => {



    const [newMood, setMood] = useState('');
    const [newEntry, setEntry] = useState('');
    const email = 'test2@gmail.com';
    const currentDate = moment().format("DD/MM/YYYY");


    //create document in member collection
    const addEntry = async () => {

        const collectionRef = collection(db, "entries");
        const payload = {
          date: currentDate,
          memberEmail: email,
          entryDescription: newEntry,
          mood: newMood,
        }
        await addDoc(collectionRef, payload);
      }
  


    return (
        <div>
        <View style={styles.body}>
        <View style={stylesCreate.createForm}>
        <Text style={styles.screenTitle}>CREATE NEW<br/>ENTRY</Text>
        <Text style={stylesCreate.label}>How Are You Feeling?</Text>
        <Dropdown newMood={newMood} setMood={setMood}/>
        <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
        <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
        </View>
        </View>
        </div>
    )
    }

export default Create;

const stylesCreate = StyleSheet.create({
    label: {
        fontSize: 25,
        color: '#0060ff',
        fontWeight: 400,
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