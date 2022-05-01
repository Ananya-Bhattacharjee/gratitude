import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Modal, Pressable} from 'react-native'
import styles from "../../stylesreact"

//import components
import CustomButton from '../components/CustomButton'
import GratitudeInput from '../components/GratitudeInput'
import Dropdown from '../components/Dropdown'
import MetNeedsMenu from '../components/MetNeedsMenu'

//import firebase
import { db, auth } from "../../firebase";
import { collection, doc, setDoc, onSnapshot, where, query } from 'firebase/firestore';

//icons modules
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

//import date
import moment from 'moment'; 
import { RollInRight } from 'react-native-reanimated';

//button for displaying modal with areas of life details.
function InfoButton() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={stylesCreate.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={stylesCreate.centeredView}>
            <View style={stylesCreate.modalView}>
              <FlatList 
              ListHeaderComponent={
                <View style={{marginBottom: 50}}>
                  <Text style={stylesCreate.paragraphHeading}>7 Key Areas Of Life</Text>
                <Text style={stylesCreate.textParagraph}>
                Below are 7 key life areas that are important for wellbeing. 
                </Text>
                <Text style={stylesCreate.textParagraph}>
                These serve two purposes: 
                </Text>
                <Text style={stylesCreate.textParagraph}> 
                1) To prompt ideas for gratitude entries. {'\n'}
                2) To help you track the life areas you've felt gratitude for. 
                Choose as many areas as you find relevant for this entry.
                </Text>
                 {/*Physical Wellbeing*/}
                 <Text style={stylesCreate.paragraphHeading}>
                         Physical Wellbeing: 
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                        Eating healthy, physical activity, good sleep, feelings of vitality, good health. e.g., "good night's sleep", "chose a healthy meal".
                    </Text>
                     {/*Peace & Calm: */}
                     <Text style={stylesCreate.paragraphHeading}>
                        Peace & Calm: 
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Moments of tranquility, presence, relaxation, contentment. e.g., "quiet moment at lunch", "good few minutes meditation"
                    </Text>
                     {/*Energizing Moments:*/}
                     <Text style={stylesCreate.paragraphHeading}>
                        Energizing Moments:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Feelings of interest, curiosity, motivation, joy, humor, hope, excitement. e.g., "excited to watch a show", "curious to hear a friend's story".
                    </Text>
                     {/*Engagement / Flow:*/}
                     <Text style={stylesCreate.paragraphHeading}>
                     Engagement / Flow:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Moments of absorption in an activity, complete immersion in the present. e.g., "got into reading book", "got absorbed in work".
                    </Text>
                     {/*Connection:*/}
                     <Text style={stylesCreate.paragraphHeading}>
                     Connection:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Moments of kindness, warmth, support, respect, or connection with any other beings, including strangers, loved ones and animals. e.g., "warm smile from a stranger", "supportive, collaborative meeting", "lunch with friends".

                    </Text>
                     {/*Accomplishment:*/}
                     <Text style={stylesCreate.paragraphHeading}>
                     Accomplishment:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Reaching a goal, completing a task, doing something you set out to do, no matter how big or small. e.g., "went for a walk", "finished a task".

                    </Text>
                     {/*Meaning / Fulfillment:*/}
                     <Text style={stylesCreate.paragraphHeading}>
                     Meaning / Fulfillment:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    Expressing personal values and connecting with higher purpose that is meaningful to you. This includes, creative expression, quality time with people/things you care about, contributing to a cause, and moments thinking about what is important to you. e.g., "meaningful conversation with a friend", "wrote in my journal", "worked on my passion project", "spent time thinking about my values".
                    </Text>
                      {/*Other:*/}
                      <Text style={stylesCreate.paragraphHeading}>
                      Other:
                    </Text>
                    <Text style={stylesCreate.textParagraph}>
                    If your entry doesn't relate to any of the areas above, choose this option and we will record this entry under the category "other".
                    </Text>
                <Pressable
                  style={[stylesCreate.button, stylesCreate.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={stylesCreate.closeText}>X</Text>
              </Pressable>
                </View>
              }
              >    
              </FlatList>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[stylesCreate.button, stylesCreate.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons
            name="info"
            size={30}
            color={"#0060ff"}
            />
          <Text style={stylesCreate.textStyle}>
           More Info</Text>
           </View>
        </Pressable>
      </View>
    );
  }

const Create = () => {

     //code to incidicate whether participant is in control or experimental group.
     const [code, setCode] = useState('');
    
    //const entryId = '';
    const [newMoodBefore, setMoodBefore] = useState({});
    const [newMoodAfter, setMoodAfter] = useState({});
    const [needs, setNeeds] = useState([]);
    const [newEntry, setEntry] = useState('');
    const email = auth.currentUser.email;
    const currentDate = moment().format("DD/MM/YYYY");

   
     
    

    //create document in member collection
    const addEntry = async () => {


        const collectionRef = collection(db, "entries");
        const newEntryRef = doc(collectionRef);

        const payload = { 
          entryId: newEntryRef.id,
          date: currentDate,
          memberEmail: email,
          entryDescription: newEntry,
          moodBefore: newMoodBefore,
          moodAfter: newMoodAfter,
          needs: needs,
        }
        await setDoc(newEntryRef,payload);
        
        //clear data after submission
        setMoodBefore({});
        setMoodAfter({});
        setNeeds([]);
        setEntry('');


        /*
        Alert.alert("New Entry Added!", "Press Dashboard to View", [
            {text: "Close", onPress: () => console.log('alert closed')}
        ]);*/

        alert("New Entry Added");
    
      }

    useEffect(() => {
        const q = query(collection(db, "member"), where("email", "==", auth.currentUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //const membersArray = [];
            querySnapshot.forEach((doc) => {
                setCode(doc.data().code)
            });
        });
        return unsubscribe;
    });

    //experimental condition
    if(code=="TRANQUIL") {

        console.log("EXPERIMENTAL");
        return (            
            <FlatList style={stylesCreate.scrollStyle}
            listKey={(item, index) => 'createEX' + index.toString()}
            ListHeaderComponent={
                <View style={stylesCreate.createForm}>
                <Text style={styles.screenTitle}>CREATE NEW{"\n"}ENTRY</Text>
                <Text style={stylesCreate.label}>How Are You Feeling Before?</Text>
                <Dropdown mood={newMoodBefore} setMood={setMoodBefore}/>
                <Text style={stylesCreate.label}>Areas of Life:</Text>
                <MetNeedsMenu selectedNeeds={needs} setSelectedNeeds={setNeeds}/>
                <InfoButton/>
                <Text style={stylesCreate.label}>What are you grateful for?</Text>
                <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
                <Text style={stylesCreate.label}>How Are You Feeling After?</Text>
                <Dropdown mood={newMoodAfter} setMood={setMoodAfter}/>
                <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
                </View>
            }
            >
            </FlatList>
        )
    }
    else { //control condition
        console.log("CONTROL");
        return (
           
            <FlatList style={stylesCreate.scrollStyle}
            ListHeaderComponent={
                <View style={stylesCreate.createForm}>
                <Text style={styles.screenTitle}>CREATE NEW{"\n"}ENTRY</Text>
                <Text style={stylesCreate.label}>How Are You Feeling Before?</Text>
                <Dropdown mood={newMoodBefore} setMood={setMoodBefore}/>
                <Text style={stylesCreate.label}>What are you grateful for?</Text>
                <GratitudeInput value={newEntry} placeholder="Write Here..." setValue={setEntry}/>
                <Text style={stylesCreate.label}>How Are You Feeling After?</Text>
                <Dropdown mood={newMoodAfter} setMood={setMoodAfter}/>
                <CustomButton text='CREATE' onPress={addEntry}></CustomButton>
                </View>
            }
            />
            
        )
    }

    }

export default Create;

const stylesCreate = StyleSheet.create({
    label: {
        fontSize: 25,
        color: '#0060ff',
        fontWeight: "400",
        textAlign: 'left',
        paddingTop: 10,
    },
    gratitudeField: {
        minHeight: 500,
    },
    createForm: {
        //display: 'flex',
        //flexWrap: 'wrap',
        //height: 1500,
        //alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 110,
    },
    scrollStyle: {
        backgroundColor: '#b0caef',
        flex: 1,
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
        //backgroundColor: "#2196F3",
      },
      buttonClose: {
        backgroundColor: "#6467dc",
        //marginBottom: 20,
        //marginTop: 40,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      textStyle: {
        color: "#0060ff",
        //fontWeight: "bold",
        textAlign: "center",
        textTransform: 'uppercase',
      },
      closeText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: 'uppercase',
        fontSize: 20,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      infoIcon: {
        
      },
      textParagraph: {
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
    },
    paragraphHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }
})