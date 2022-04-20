import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, FlatList} from 'react-native';
import styles from "../../stylesreact";

//import components
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
import GratitudeCard from '../components/GratitudeCard';
import GratitudeCardControl from '../components/GratitudeCardControl';

//import date
import moment from 'moment'; 


const Dashboard = (props) => {


    const [entries, setEntries] = useState([]);
    const [overallMoodBefore, setOverallMoodBefore] = useState(0);
    const [overallMoodAfter, setOverallMoodAfter] = useState(0);

    //get user's code
    const [code, setCode] = useState('');
    const [members, setMembers] = useState([]);


    const today = moment().format("DD/MM/YYYY");

    const [headerTitle, setHeaderTitle] = useState('');
    
    useEffect(() => {
        const q = query(collection(db, "entries"), where("memberEmail", "==", auth.currentUser.email), 
        where("date", "==", props.currentDate));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const entriesArray = [];
            const moodArrayBefore = [];
            const moodArrayAfter = [];
            querySnapshot.forEach((doc) => {
                entriesArray.push(doc.data()),
                moodArrayBefore.push(doc.data().moodBefore.count),
                moodArrayAfter.push(doc.data().moodAfter.count);
            });
            setEntries(entriesArray);

            getOverallMoodBefore(moodArrayBefore);
            getOverallMoodAfter(moodArrayAfter);

            console.log(entriesArray);

            console.log("Date " + props.currentDate);

            if(props.currentDate==today) {
                setHeaderTitle("TODAY");
            }
            else {
                setHeaderTitle(props.currentDate);
            }

            GetMember();
           
        });
        return unsubscribe;
    }, [props.currentDate]);

    // Rerender after headerTitle change
  useEffect(() => {
    props.navigation.setOptions({
      title: headerTitle,
    });
  }, [headerTitle, props.navigation]);
    
   
    const getOverallMoodBefore = ( moodArray ) => {


        //Find average of overall mood before 
        //get length of mood array
        
        var NumberOfMood = moodArray.length;

        var totalMood = 0;

        //iterate through mood before.
        //console.log(moodArrayBefore);
        //console.log(NumberOfMood);

        for(let index = 0 ; index < NumberOfMood; index++) {
            const element = moodArray[index];
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
            
   
    }

    const getOverallMoodAfter = ( moodArray ) => {

          //Find average of overall mood before 
        //get length of mood array
        
        var NumberOfMood = moodArray.length;

        var totalMood = 0;

        //iterate through mood before.
        //console.log(moodArrayBefore);
        //console.log(NumberOfMood);

        for(let index = 0 ; index < NumberOfMood; index++) {
            const element = moodArray[index];
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
    }

    
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
  
    if(code=="TRANQUIL") { 
        return (
   
            
                //{/*<Text style={styles.screenTitle}>DASHBOARD</Text>*/}
                
                //{/*<Button title='Get Entries' onPress={GetEntries}/>*/}
                <FlatList 
                //listKey={(item, index) => 'D' + index.toString()}
                //keyExtractor={(item, index) => index.toString()}
                style={stylesDashboard.flatlist}
                data={entries}
                renderItem={({ item }) => (
                    <GratitudeCard entryId={item.entryId} email={item.memberEmail} entryDate={item.date} moodBefore={item.moodBefore} moodAfter={item.moodAfter} description={item.entryDescription} 
                    needs={item.needs} characters={item.characters}/>
                )}
                ListHeaderComponent={
                    <View style={{marginBottom:30, backgroundColor: "#b0caef"}}>
                    <Text style={styles.screenTitle}>YOUR ENTRIES</Text>
                    <Text style={styles.heading2}>Average Mood Before: {overallMoodBefore}</Text>
                    <Text style={styles.heading2}>Average Mood After: {overallMoodAfter}</Text>
                    </View>
                }
                ListFooterComponent={<View style={{minHeight: 500, backgroundColor: "#b0caef"}}/>}
                />
        
        )
    }
    else {
        return (
                <FlatList 
                //listKey={(item, index) => 'D' + index.toString()}
                //keyExtractor={(item, index) => index.toString()}
                style={stylesDashboard.flatlist}
                data={entries}
                renderItem={({ item }) => (
                    <GratitudeCardControl entryId={item.entryId} email={item.memberEmail} entryDate={item.date} moodBefore={item.moodBefore} moodAfter={item.moodAfter} description={item.entryDescription} />
                )}
                ListHeaderComponent={
                    <View style={{marginBottom:30}}>
                    <Text style={styles.screenTitle}>YOUR ENTRIES</Text>
                    <Text style={styles.heading2}>Average Mood Before: {overallMoodBefore}</Text>
                    <Text style={styles.heading2}>Average Mood After: {overallMoodAfter}</Text>
                    </View>
                }
                ListFooterComponent={<View style={{minHeight: 500, backgroundColor: "#b0caef"}}/>}
                />
         
        )
    }
    

    
    
}

const stylesDashboard = StyleSheet.create({
    flatlist: {
        width: '100%',
        backgroundColor: "#b0caef"
    }
})



export default Dashboard;