import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Modal, Pressable, Alert, TouchableOpacity} from 'react-native'
//import { TouchableOpacity } from "react-native-gesture-handler";

//import components
import GratitudeInput from './GratitudeInput'
import Dropdown from './Dropdown'


//import from firebase
import { db } from "../../firebase";
import { doc, deleteDoc, setDoc } from 'firebase/firestore';


//edit button function
function EditButton({ entryId, email, entryDate, moodBefore, moodAfter, description })  {

    
    const [newMoodBefore, setNewMoodBefore] = useState(moodBefore);
    const [newMoodAfter, setNewMoodAfter] = useState(moodAfter);
    const [newDescription, setNewDescription] = useState(description);

    const [modalVisible, setModalVisible] = useState(false);

    const editEntry = async () => {

        setModalVisible(!modalVisible);

        await setDoc(doc(db, "entries", entryId), {
            entryId: entryId,
            date: entryDate,
            memberEmail: email,
            entryDescription: newDescription,
            moodBefore: newMoodBefore,
            moodAfter: newMoodAfter,
          });




    }


    return (
        <View>

    {
         <View style={styles.centeredView}>
      <Modal
        //propagateSwipe={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            <Text 
            style={{
              fontSize: 30, 
              fontWeight: '500',
              color: '#0060ff',
              textAlign: 'center',
              paddingBottom: 10,
              }}>
              How are you feeling Before?
              </Text>
            <View style={{marginBottom: 55}}>
            <Dropdown mood={newMoodBefore} setMood={setNewMoodBefore}/>
            </View>
            <View>
            </View>
            <Text 
            style={{
              fontSize: 30, 
              fontWeight: '500',
              color: '#0060ff',
              textAlign: 'center',
              paddingBottom: 10,
              }}>
              Write Your Entry Here:
              </Text>
            <GratitudeInput
            style={styles.modalText}
            value={newDescription}
            setValue={setNewDescription}
            placeholder="Write Here..."
            />
            <Text 
            style={{
              fontSize: 30, 
              fontWeight: '500',
              color: '#0060ff',
              textAlign: 'center',
              }}>
              How are you feeling After?
              </Text>
            <View style={{marginBottom: 50}}>
            <Dropdown mood={newMoodAfter} setMood={setNewMoodAfter}/>
            </View>
            <Pressable
              style={[styles.button, styles.buttonEdit]}
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
          </ScrollView>
        </View>
      </Modal>
      <Pressable
        style={[styles.editbutton, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.textStyle, {fontSize: 20}]}>Edit</Text>
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
        <View style={styles.deletebutton}>
            <Text style={styles.buttonText}>Delete</Text>
        </View>
        </TouchableOpacity>
    )
}

//component - card for each gratirude entry
const GratitudeCardControl = ({  entryId, email, entryDate, moodBefore, moodAfter, description}) => {
   
    return (
        <View style={styles.container}>

            <TextInput
                value = {"Mood Before: " + moodBefore.count}
                editable = {false}
                style={styles.moodField}
            />
            <TextInput
                value = {"Mood After: " + moodAfter.count}
                editable = {false}
                style={styles.moodField}
            />
            <Text style={styles.headingEntry}>What are you grateful for?</Text>
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
                moodBefore={moodBefore}
                moodAfter={moodAfter}
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

export default GratitudeCardControl;

const styles = StyleSheet.create({
    headingEntry: {
       paddingTop: 10,
       fontSize: 25,
       fontWeight: "500",
       color: '#000000',
    },
    entryField: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        minHeight: 80,
        color: '#000000',
    },
    needsField: {
      fontSize: 20,
      color: '#000000',
    },
    moodField: {
        fontWeight: "500",
        fontSize: 20,
        color: '#000000',
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
        //flexDirection: 'row',
    },      
    editbutton: {
        borderRadius: 25,
        paddingVertical: 3,
        backgroundColor: '#2196F3',
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 5,
      },
      deletebutton: {
        borderRadius: 25,
        paddingVertical: 3,
        backgroundColor: '#6467dc',
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 5,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: "100%",
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
      },
      buttonOpen: {
        backgroundColor: "#2196F3",
      },
      buttonClose: {
        backgroundColor: "#6467dc",
        marginBottom: 50,
      },
      buttonEdit: {
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

