import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity, Button, Pressable, Alert} from 'react-native'

//import components
import CustomTextInput from './CustomTextInput'
import GratitudeInput from './GratitudeInput'
import Dropdown from './Dropdown'
import MetNeedsMenu from './MetNeedsMenu'
import CharacterMenu from './CharacterMenu'


//import from firebase
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native-web';
import EditEntry from '../screens/EditEntry';
import { AuthErrorCodes } from 'firebase/auth';


function EditButton({ entryId, email, entryDate, moodBefore, moodAfter, currentNeeds, description })  {

    
    const [newMoodBefore, setNewMoodBefore] = useState(moodBefore);
    const [newMoodAfter, setNewMoodAfter] = useState(moodAfter);
    const [newDescription, setNewDescription] = useState(description);

    const [needs, setNeeds] = useState(currentNeeds);

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
            needs: needs,
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
            <Text 
            style={{
              fontSize: 30, 
              fontWeight: '500',
              color: '#0060ff',
              textAlign: 'center',
              paddingBottom: 10,
              }}>
              Met Needs:
              </Text>
            <View style={{marginBottom: 55}}>
            <MetNeedsMenu selectedNeeds={needs} setSelectedNeeds={setNeeds}/>
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
const GratitudeCard = ({  entryId, email, entryDate, moodBefore, moodAfter, description, needs, characters}) => {

   console.log("Needs: " + needs);
   console.log("Characters: " + characters)
   
    return (
        <View style={styles.container}>
            {/*
            <TextInput
                value = {entryId}
                editable = {false}
                style={styles.moodField}
            />*/}
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
             <FlatList 
            //keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => 'M' + index.toString()}
            data={needs}
            renderItem={({ item }) => (
              <TextInput
              multiline = {true}
              value = {"- " + item.item}
              editable = {false}
              style={styles.needsField}
              />
            )}
            ListHeaderComponent={
                <View>
                <Text style={styles.headingEntry}>Met Needs:</Text>
                </View>
            }
            />
            <Text style={styles.headingEntry}>Your Entry:</Text>
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
                currentNeeds={needs}
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
    headingEntry: {
       paddingTop: 10,
       fontSize: 20,
       fontWeight: "500",
    },
    entryField: {
        paddingTop: 5,
        paddingBottom: 10,
        fontSize: 20,
        minHeight: 80,
    },
    needsField: {
      fontSize: 20,
    },
    moodField: {
        fontWeight: "500",
        fontSize: 20,
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
        marginTop: '10',
        marginBottom: 5,
      },
      deletebutton: {
        borderRadius: 25,
        paddingVertical: 3,
        backgroundColor: '#6467dc',
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10',
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

