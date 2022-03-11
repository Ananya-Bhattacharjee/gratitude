import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity, Button, Pressable, Alert} from 'react-native'

//import components
import CustomTextInput from './CustomTextInput'
import GratitudeInput from './GratitudeInput'
import Dropdown from './Dropdown'


//import from firebase
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native-web';
import EditEntry from '../screens/EditEntry';


function EditButton({ entryId, email, entryDate, mood, description })  {

    
    const [newMood, setNewMood] = useState(mood);
    const [newDescription, setNewDescription] = useState(description);
    const [modalVisible, setModalVisible] = useState(false);


    const editEntry = async () => {

        setModalVisible(!modalVisible);

        await setDoc(doc(db, "entries", entryId), {
            entryId: entryId,
            date: entryDate,
            memberEmail: email,
            entryDescription: newDescription,
            mood: newMood,
          });



    }


    return (
        <View>

    {
         <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>How are you feeling?</Text>
            <Dropdown newMood={newMood} setMood={setNewMood}/>
            <GratitudeInput
            style={styles.modalText}
            value={newDescription}
            setValue={setNewDescription}
            placeholder="Write Here..."
            />
            <TextInput
            
            
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => editEntry()}
            >
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Edit</Text>
      </Pressable>
    </View>

    }
       </View>
    )
}

function DeleteButton({ entryId })  {

    const entry = entryId;

    //deletes chosen entry and corresponding fields.
    const DeleteEntry = async () => {

        

        //const entriesCol = collection(db, "entries");
        //const deleteEntry = query(entriesCol, where("entryId", "==", entry));

        await deleteDoc(doc(db,"entries",entry))
        alert("Deleted " + entry);

    }

    return (
        <TouchableOpacity onPress={DeleteEntry}>
        <View style={styles.editbutton}>
            <Text style={styles.buttonText}>Delete</Text>
        </View>
        </TouchableOpacity>
    )
}

//component - card for each gratirude entry
const GratitudeCard = ({  entryId, email, entryDate, mood, description }) => {

   
    return (
        <View style={styles.container}>
            <TextInput
                value = {entryId}
                editable = {false}
                style={styles.moodField}
            />
            <TextInput
                value = {"Mood: " + mood}
                editable = {false}
                style={styles.moodField}
            />
            <TextInput
                multiline = {true}
                value = {description}
                editable = {false}
                style={styles.entryField}
            />
             <EditButton
                entryId={entryId}
                email={email}
                entryDate={entryDate}
                mood={mood}
                description={description}
            />
            <DeleteButton
                 entryId={entryId}
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
        marginVertical: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        flextDirection: 'row',
    },      
    editbutton: {
        borderRadius: 25,
        paddingVertical: 3,
        backgroundColor: '#6467dc',
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0.5em',
      },
      deletebutton: {
        borderRadius: 25,
        paddingVertical: 3,
        backgroundColor: '#6467dc',
        width: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0.5em',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 15,
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#6467dc",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: 'uppercase'
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

