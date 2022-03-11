import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Button, FlatList} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'

//import firebase
import { db, auth } from "../../firebase";
import { setDoc, collection, where, getDocs, doc, query  } from 'firebase/firestore';

const Profile = () => {

    //const [memberId, setMemberId] = useState('');
    //const [email, setEmail] = useState('');
    //const [code, setCode] = useState('');

    const [members, setMembers] = useState([]);



    const GetMember = async () => {

      //get details of currently signed in user
      const memberCol = collection(db, "member");
      const memberDetails = query(memberCol, where("email", "==", auth.currentUser.email));
      const memberSnapshot = await getDocs(memberDetails);
      
      const membersArray = [];
      memberSnapshot.docs.map(doc => 
          membersArray.push(doc.data()),

      )

      setMembers(membersArray);

      
    }


    return (
        <div>
        <View style={styles.body}>
        <Text style={styles.screenTitle}>PROFILE</Text>
        <Button title='Get Member' onPress={GetMember}/>
        <FlatList 
            nestedScrollEnabled
            data={members}
            renderItem={({ item }) => (
              <View style={stylesProfile.container}>
              <TextInput
                  value = {"Your Email: " + item.email}
                  editable = {false}
                  style={stylesProfile.moodField}
              />
              <TextInput
                  value = {"Code: " + item.code}
                  editable = {false}
                  style={stylesProfile.entryField}
              />
              {/*Button for Deleting User Account. Will redirect to Login*/}
          </View>
            )}
        />
        </View>
        </div>
    )
}

export default Profile;

const stylesProfile = StyleSheet.create({
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
  },      
})