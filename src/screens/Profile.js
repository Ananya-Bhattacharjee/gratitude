import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../stylesreact"


//import firebase
import { db, auth } from "../../firebase";
import { signOut, deleteUser } from "firebase/auth";
import { collection, where, getDocs, doc, query, deleteDoc, onSnapshot } from 'firebase/firestore';


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



    const [members, setMembers] = useState([]);
    
  

    const [entries, setEntries] = useState([]);
      //code to incidicate whether participant is in control or experimental group.
    const [code, setCode] = useState('');
    const [numEntries, setNumEntries] = useState(''); //store number of entries entered by member.

    //store met needs stats
    const [physicalWellbeing, setPhysicalWellbeing] = useState(0);
    const [peaceCalm, setPeaceCalm] = useState(0);
    const [energisingMoments, setEnergisingMoments] = useState(0);
    const [engagementFlow, setEngagementFlow] = useState(0);
    const [connection, setConnection] = useState(0);
    const [accomplishment, setAccomplishment] = useState(0);
    const [meaning, setMeaning] = useState(0);
    
    //overallmood
    const [overallMoodBefore, setOverallMoodBefore] = useState(0);
    const [overallMoodAfter, setOverallMoodAfter] = useState(0);

    useEffect(() => {
        GetMember();

        const q = query(collection(db, "entries"), where("memberEmail", "==", auth.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const entriesArray = [];
            const moodArrayBefore = [];
            const moodArrayAfter = [];
            if(code=="TRANQUIL") {
                const needsArray = [];
                querySnapshot.forEach((doc) => {
                    entriesArray.push(doc.data()),
                    moodArrayBefore.push(doc.data().moodBefore.count);
                    moodArrayAfter.push(doc.data().moodAfter.count);
                    needsArray.push(doc.data().needs)
                    setEntries(entriesArray);
                    console.log("Needs Array:" + needsArray);
                    countNeeds(needsArray)
                });
            }
            else {
                querySnapshot.forEach((doc) => {
                    entriesArray.push(doc.data()),
                    moodArrayBefore.push(doc.data().moodBefore.count);
                    moodArrayAfter.push(doc.data().moodAfter.count);
                    setEntries(entriesArray);
                });
            }
         
            getOverallMoodBefore(moodArrayBefore);
            getOverallMoodAfter(moodArrayAfter);
           
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
    const getOverallMoodBefore= ( moodArray ) => {

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
            setOverallMoodBefore(averageMood);
        }   
        else {
            setOverallMoodBefore(0);
        }

        setNumEntries(NumberOfMood);
    }

    const getOverallMoodAfter= ( moodArray ) => {

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
            setOverallMoodAfter(averageMood);
        }   
        else {
            setOverallMoodAfter(0);
        }

        setNumEntries(NumberOfMood);
    }

    const countNeeds = ( needsArray ) => {

        //console.log("Needs: " + needsArray[0][0].id)

        var countPhysicalWellbeing = 0
        var countPeaceCalm = 0
        var countEnergisingMoments = 0
        var countEngagementFlow = 0
        var countConnection = 0
        var countAccomplishment = 0
        var countMeaning = 0

        //iterate through array of needs.
        for(let i = 0; i < needsArray.length; i++) {
            for (let j = 0; j < needsArray[i].length; j++) {
                if(needsArray[i][j].id == "1") {
                     //count physical wellbeing
                     countPhysicalWellbeing++
                     setPhysicalWellbeing(countPhysicalWellbeing)
                }
                if(needsArray[i][j].id == "2") {
                    //count peacecalm
                    countPeaceCalm++
                    setPeaceCalm(countPeaceCalm)
                }
                if(needsArray[i][j].id == "3") {
                    //count energising moments
                    countEnergisingMoments++
                    setEnergisingMoments(countEnergisingMoments)
                }
                if(needsArray[i][j].id == "4") {
                    //count engagement flow
                    countEngagementFlow++
                    setEngagementFlow(countEngagementFlow)
                }
                if(needsArray[i][j].id == "5") {
                     //count connection
                    countConnection++
                    setConnection(countConnection)
                }
                if(needsArray[i][j].id == "6") {
                    //count accomplishment
                    countAccomplishment++
                    setAccomplishment(countAccomplishment)
                }
                if(needsArray[i][j].id == "7") {
                    //count meaning
                    countMeaning++
                    setMeaning(countMeaning)
                }
            }

        }


        

    } 

    //experimental condition
    if(code=="TRANQUIL") {
        return (
            <FlatList 
                style={{width: "100%", backgroundColor: "#b0caef"}}
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
                <View style={{minHeight: 700, flex: 1}}> 
                    <Text style={styles.screenTitle}>STATS</Text>
                    <View style={stylesProfile.container}>
                    {/*Entries Made*/}
                    <TextInput
                      value = {"Entries Made"}
                      editable = {false}
                      style={styles.heading2}
                    />
                    <TextInput
                      value = {"Total Entries: " + numEntries}
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
                      value = {"Before: " + overallMoodBefore}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                   <TextInput
                      value = {"After: " + overallMoodAfter}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    {/*Met Needs*/}
                    <TextInput
                      value = {"Met Needs"}
                      editable = {false}
                      style={styles.heading2}
                    />
                    <TextInput
                      value = {"Physical Wellbeing => " + physicalWellbeing}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Peace & Calm => " + peaceCalm}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Energizing Moments => " + energisingMoments}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Engagement / Flow => " + engagementFlow}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Connection => " + connection}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Accomplishment => " + accomplishment}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    <TextInput
                      value = {"Meaning / Fulfillment => " + meaning}
                      editable = {false}
                      style={stylesProfile.dataField}
                    />
                    </View>
                    <DeleteButton/>
                </View>
             
            }
            />
        )
    }
    else { //control condition
        return (
            <FlatList 
                style={{width: "100%", backgroundColor: "#b0caef"}}
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
                      value = {"Total Entries: " + numEntries}
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
                      value = {"Before: " + overallMoodBefore}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                   <TextInput
                      value = {"After: " + overallMoodAfter}
                      editable = {false}
                      style={stylesProfile.dataField}
                  />
                    </View>
                    <DeleteButton/>
                </View>
             
            }
            />
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
      marginTop: 20,
  },      
    buttonBase: {
        width: "100%",
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
        textAlign: "center",
    },
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
})