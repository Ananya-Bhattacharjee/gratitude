import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'
import CustomButton from '../components/CustomButton'
import GratitudeInput from '../components/GratitudeInput'
import Dropdown from '../components/Dropdown'

//import firebase
import { db, auth } from "../../firebase";
import { setDoc, collection } from 'firebase/firestore';

//import date
import moment from 'moment'; 

const EditEntry = ({ entryId }) => {

    const [newMood, setMood] = useState('');
    const [newEntry, setEntry] = useState('');
    const email = auth.currentUser.email;
    const currentDate = moment().format("DD/MM/YYYY");


    //update document in member collection
    const updateEntry = async () => {

        const collectionRef = collection(db, "entries");
        const payload = {
          date: currentDate,
          memberEmail: email,
          entryDescription: newEntry,
          mood: newMood,
        }
        await setDoc(collectionRef, payload);
      }
  


    return (
        <div>
        <View style={styles.body}>
        <View style={stylesEdit.editForm}>
        <Text style={styles.screenTitle}>Update <br/>ENTRY</Text>
        <Text style={stylesEdit.label}>How Are You Feeling?</Text>
        <Dropdown newMood={newMood} setMood={setMood}/>
        <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
        <CustomButton text='UPDATE' onPress={updateEntry}></CustomButton>
        </View>
        </View>
        </div>
    )
    }

export default EditEntry;

const stylesEdit = StyleSheet.create({
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
    editForm: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
    }
})