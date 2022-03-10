import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity} from 'react-native'

//import components

//import from firebase
import { db, auth } from "../../firebase";

/*
const Data = () => {
    return (
        <View></View>
    )
}*/

//component - card for each gratirude entry
const GratitudeCard = ({  EntryId, mood, description }) => {

   //unique id for each gratitude entry.
   //const id = EntryID;
   const moodText = "Mood: " + mood;


    return (
        <View style={styles.container}>
            <TextInput
                value = {moodText}
                editable = {false}
                style={styles.moodField}
            />
            <TextInput
                multiline = {true}
                value = {description}
                editable = {false}
                style={styles.entryField}
            />
            {/*Button for Updating entry. Will redirect to Update Entry screen*/}
            {/*Button for Deleting Entry. Will delete the current entry*/}
        </View>
    )
}

export default GratitudeCard;

const styles = StyleSheet.create({
    entryField: {
        fontSize: '20pt',
    },
    moodField: {
        fontWeight: 500,
        fontSize: '20pt',
    },
    container: {
        backgroundColor: 'white',
        width: '80%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,

        padding: 10,
        marginVertical: 5
    },      
})

