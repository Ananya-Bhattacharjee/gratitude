import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native'
import styles from "../../stylesreact"


//import components
import StatusBarHeader from '../components/statusbar'

//import firebase
import { db, auth } from "../../firebase";
import { setDoc, collection, where, getDocs, doc, query, deleteDoc  } from 'firebase/firestore';

function DeleteButton()  {

    //const member = memberId;

    //deletes account of currently signed in user.

    const DeleteEntry = async () => {

        //await deleteDoc(doc(db,"member",member))
        alert("Deleted");

    }

    return (
        <TouchableOpacity style={styles.buttonBase} onPress={DeleteEntry}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </View>
      </TouchableOpacity>
    )
}


const Profile = () => {

    //const [memberId, setMemberId] = useState('');
    //const [email, setEmail] = useState('');
    //const [code, setCode] = useState('');

    const [members, setMembers] = useState([]);
    const [mounted, setMounted] = useState(true);


    useEffect(() => {
        if(mounted) {
            GetMember();
        }
        return () => {
            setMounted(false);
        }
    }, []);

    


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
        {/*<Button title='Get Member' onPress={GetMember}/>*/}
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
              {/*Button for Deleting User Account. Will redirect to Login*/}
          </View>
            )}
            ListFooterComponent={<DeleteButton/>}
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
    buttonBase: {
        width: "100%",
        textAlign: "center",
    },
    button: {
        backgroundColor: '#6467dc',
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