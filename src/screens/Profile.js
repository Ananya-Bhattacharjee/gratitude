import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'

//import firebase
import { db, auth } from "../../firebase";
import { setDoc, collection, where, getDoc, doc  } from 'firebase/firestore';

const Profile = () => {

    const memberId = '';
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');


    const GetMember = async () => {

        email = auth.currentUser.email;
        memberId = auth.currentUser.uid;
        
        //get all entries from firebase. 
        const member = doc(db, 'member', memberId);
        memberSnap = await getDoc(member);

        //const membersSnapshot = await getDocs(membersCol);
        //const membersList = membersSnapshot.docs.map(doc => doc.data());

        if (memberSnap.exists()) {
            console.log("Document data:", memberSnap.data());
            code = memberSnap.data().code;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
      
    }


    return (
        <div>
        <View style={styles.body}>
        <Text style={styles.screenTitle}>PROFILE</Text>
        <Button title='Get Member' onPress={GetMember}/>
        </View>
        </div>
    )
}

export default Profile;