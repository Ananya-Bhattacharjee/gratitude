import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'

//import firebase
import { db, auth } from "../../firebase";
import { setDoc, collection, where, getDocs  } from 'firebase/firestore';

const Profile = () => {

    


    const GetMember = async () => {
        
        //get all entries from firebase. 
        const membersCol = collection(db, 'member');
        //const membersSnapshot = await getDocs(membersCol);
        //const membersList = membersSnapshot.docs.map(doc => doc.data());

        const currentMember = query(member, where("email", "==",  auth.currentUser.email));

        const querySnapshot = await getDocs(currentMember);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        
        
    }


    return (
        <div>
        <View style={styles.body}>
        <Text style={styles.screenTitle}>PROFILE</Text>
        </View>
        </div>
    )
}

export default Profile;