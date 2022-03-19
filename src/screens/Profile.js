import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Button, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'

//import firebase
import { db, auth } from "../../firebase";
import { signOut, deleteUser } from "firebase/auth";
import { setDoc, collection, where, getDocs, doc, query, deleteDoc, onSnapshot } from 'firebase/firestore';


const SignOutUser = () => {
    signOut(auth)
    .then((result)=>{
        console.log(result);
        console.log("logged out")
    })
    .catch((err)=>{
        console.log(err);
    })
}


function DeleteButton()  {

    //const member = memberId;

    //deletes account of currently signed in user.

    const DeleteMember = async () => {

        //get member's entries for deletion
        
        const entriesCol = collection(db, "entries");
        const memberEntries = query(entriesCol, where("memberEmail", "==", auth.currentUser.email));
        const entrySnapshot = await getDocs(memberEntries)
       
        const results = entrySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        
        results.forEach(async (result) => {
            const docRef = doc(db,"entries",result.id);
            await deleteDoc(docRef);
        });

        //get member for deletion
        const memberCol = collection(db, "member");
        const currentMember = query(memberCol, where("email", "==", auth.currentUser.email));
        const memberSnapshot = await getDocs(currentMember);
        
        const result2 = memberSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(result2);

        result2.forEach(async (result) => {
            const docRef = doc(db,"member",result.id);
            console.log(result.id)
            await deleteDoc(docRef);
        });
        console.log("Member deleted")

        
        //signs out current user
        SignOutUser();

        //deletes the user from firebase authentication
        const user = auth.currentUser;

        deleteUser(user).then(async () => {
            // User deleted.
           console.log("User deleted")
          }).catch((error) => {
            // An error ocurred
            // ...
            console.log("An error occured.")
          });
          
        
       
          
    }

    return (
        <TouchableOpacity style={stylesProfile.buttonBase} onPress={DeleteMember}>
        <View style={stylesProfile.button}>
          <Text style={stylesProfile.buttonText}>Delete Account</Text>
        </View>
      </TouchableOpacity>
    )
}


const Profile = () => {

    //const [memberId, setMemberId] = useState('');
    //const [email, setEmail] = useState('');
    //const [code, setCode] = useState('');

    const [members, setMembers] = useState([]);
    //const [mounted, setMounted] = useState(true);
    
  

    const [entries, setEntries] = useState([]);
      //code to incidicate whether participant is in control or experimental group.
    const [code, setCode] = useState('');
    const [numEntries, setNumEntries] = useState(''); //store number of entries entered by member.
    
    //overallmood
    const [overallMood, setOverallMood] = useState(0);

    useEffect(() => {
        const q = query(collection(db, "entries"), where("memberEmail", "==", auth.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const entriesArray = [];
            const moodArray = [];
            querySnapshot.forEach((doc) => {
                entriesArray.push(doc.data()),
                moodArray.push(doc.data().mood);
            });
            setEntries(entriesArray);

            getEntryData(moodArray);
            GetMember();
        });
        return unsubscribe;
    }, []);

    //get member profile details
    const GetMember = async () => {

      //get details of currently signed in user
      const memberCol = collection(db, "member");
      const memberDetails = query(memberCol, where("email", "==", auth.currentUser.email));
      const memberSnapshot = await getDocs(memberDetails);
      
      const membersArray = [];
      memberSnapshot.forEach((doc) => {
        setCode(doc.data().code)
        membersArray.push(doc.data()),
        console.log(code)
      });

      /*
      memberSnapshot.docs.map(doc => 
          membersArray.push(doc.data()),
          console.log(members)
      )*/

      setMembers(membersArray);

      //get membercode
     

    }

    //get overall mood of user for total days.
    const getEntryData= ( moodArray ) => {

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

        setNumEntries(NumberOfMood);
    }

    //experimental condition
    if(code=="TRANQUIL") {
        return (
            <KeyboardAvoidingView style={styles.flexStyle}>
            <View style={styles.body}>
            {/*<Button title='Get Member' onPress={GetMember}/>*/}
            <FlatList 
                style={{width: "100%"}}
                data={members}
                renderItem={({ item }) => (
                  <View style={stylesProfile.container}>
                  {/*Email Address*/}
                  <TextInput
                      value = {"Your Email"}
                      editable = {false}
                      style={styles.heading2}
                  />
                  <TextInput
                      value = {item.email}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                  {/*Code*/}
                  <TextInput
                      value = {"Your Code"}
                      editable = {false}
                      style={styles.heading2}
                  />
                  <TextInput
                      value = {item.code}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                  {/*Button for Deleting User Account. Will redirect to Login*/}
              </View>
                )}
                ListHeaderComponent={<Text style={styles.screenTitle}>PROFILE</Text>}
                ListFooterComponent={
                <View style={{minHeight: 500, flex: 1}}> 
                    <Text style={styles.screenTitle}>STATS</Text>
                    <View style={stylesProfile.container}>
                    {/*Entries Made*/}
                    <TextInput
                      value = {"Entries Made"}
                      editable = {false}
                      style={styles.heading2}
                    />
                    <TextInput
                      value = {numEntries}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    {/*Overall Mood*/}
                    <TextInput
                      value = {"Total Mood"}
                      editable = {false}
                      style={styles.heading2}
                    />
                     <TextInput
                      value = {overallMood}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    </View>
                    <DeleteButton/>
                </View>
             
            }
            />
            </View>
            </KeyboardAvoidingView>
        )
    }
    else { //control condition
        return (
            <KeyboardAvoidingView style={styles.flexStyle}>
            <View style={styles.body}>
            {/*<Button title='Get Member' onPress={GetMember}/>*/}
            <FlatList 
                style={{width: "100%"}}
                data={members}
                renderItem={({ item }) => (
                  <View style={stylesProfile.container}>
                  {/*Email Address*/}
                  <TextInput
                      value = {"Your Email"}
                      editable = {false}
                      style={styles.heading2}
                  />
                  <TextInput
                      value = {item.email}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                  {/*Code*/}
                  <TextInput
                      value = {"Your Code"}
                      editable = {false}
                      style={styles.heading2}
                  />
                  <TextInput
                      value = {item.code}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                  {/*Button for Deleting User Account. Will redirect to Login*/}
              </View>
                )}
                ListHeaderComponent={<Text style={styles.screenTitle}>PROFILE</Text>}
                ListFooterComponent={
                <View style={{minHeight: 500, flex: 1}}> 
                    <Text style={styles.screenTitle}>STATS</Text>
                    <View style={stylesProfile.container}>
                    {/*Entries Made*/}
                    <TextInput
                      value = {"Entries Made"}
                      editable = {false}
                      style={styles.heading2}
                    />
                    <TextInput
                      value = {numEntries}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    {/*Overall Mood*/}
                    <TextInput
                      value = {"Total Mood"}
                      editable = {false}
                      style={styles.heading2}
                    />
                     <TextInput
                      value = {overallMood}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    </View>
                    <DeleteButton/>
                </View>
             
            }
            />
            </View>
            </KeyboardAvoidingView>
        )
    }

    
}



export default Profile;

const stylesProfile = StyleSheet.create({
  entryField: {
      fontSize: 20,
  },
  dataField: {
      fontWeight: "500",
      fontSize: 20,
      textAlign: 'center',
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
      marginTop: 20,
  },      
    buttonBase: {
        width: "100%",
        textAlign: "center",
    },
    button: {
        backgroundColor: 'red',//'#6467dc',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '500',
        padding: 5,
        paddingBottom: 10,
    }
})