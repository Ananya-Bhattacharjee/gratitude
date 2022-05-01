import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import styles from "../../stylesreact"

//import firebase
import { db, auth } from "../../firebase";
import { collection, where, getDocs, doc, query, deleteDoc, onSnapshot } from 'firebase/firestore';

const About = () => {

    //code for each condition
    const [code, setCode] = useState('');

    useEffect(() => {
        getMemberCode();
    },[code])

     //get member profile details
     const getMemberCode = async () => {

        //get details of currently signed in user
        const memberCol = collection(db, "member");
        const memberDetails = query(memberCol, where("email", "==", auth.currentUser.email));
        const memberSnapshot = await getDocs(memberDetails);
        
        memberSnapshot.forEach((doc) => {
          setCode(doc.data().code)
          console.log(code)
        });
  
      }

    //experimental mode
    if(code=="TRANQUIL") {
        return (
            <ScrollView style={{backgroundColor: '#b0caef'}}>
                <View style={{backgroundColor: '#b0caef', marginBottom: 200}}>
                    <Text style={styles.screenTitle}>ABOUT</Text>
                    <Text style={stylesAbout.textParagraph}>
                        Often, good moments happen that can go unnoticed. 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Gratitude practice helps us build the skill of noticing and appreciating these moments, which in turn re-wires our brain to being less sensitive to stress and more prone to experiencing flourishing and wellbeing. 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Use this app as often as you can to record moments you can feel grateful for that might otherwise go unnoticed.
    
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    We will ask you for a mood rating before and after your gratitude entries, to help you track how gratitude practice affects your mood. 
                    </Text>
                    <Text style={styles.screenTitle}>7 Key Areas of Life</Text>
                    <Text style={stylesAbout.textParagraph}>
                    Below are Key life areas that contribute to well being.

                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Often a single gratitude entry is associated with multiple life areas, so choose as many as you find relevant.  
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    You can also see these via the info button next to the dropdown menu within the app.
                    </Text>
                    {/*Physical Wellbeing*/}
                    <Text style={stylesAbout.paragraphHeading}>
                         Physical Wellbeing: 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                        Eating healthy, physical activity, good sleep, feelings of vitality, good health. e.g., "good night's sleep", "chose a healthy meal".
                    </Text>
                     {/*Peace & Calm: */}
                     <Text style={stylesAbout.paragraphHeading}>
                        Peace & Calm: 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Moments of tranquility, presence, relaxation, contentment. e.g., "quiet moment at lunch", "good few minutes meditation"
                    </Text>
                     {/*Energizing Moments:*/}
                     <Text style={stylesAbout.paragraphHeading}>
                        Energizing Moments:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Feelings of interest, curiosity, motivation, joy, humor, hope, excitement. e.g., "excited to watch a show", "curious to hear a friend's story".
                    </Text>
                     {/*Engagement / Flow:*/}
                     <Text style={stylesAbout.paragraphHeading}>
                     Engagement / Flow:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Moments of absorption in an activity, complete immersion in the present. e.g., "got into reading book", "got absorbed in work".
                    </Text>
                     {/*Connection:*/}
                     <Text style={stylesAbout.paragraphHeading}>
                     Connection:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Moments of kindness, warmth, support, respect, or connection with any other beings, including strangers, loved ones and animals. e.g., "warm smile from a stranger", "supportive, collaborative meeting", "lunch with friends".

                    </Text>
                     {/*Accomplishment:*/}
                     <Text style={stylesAbout.paragraphHeading}>
                     Accomplishment:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Reaching a goal, completing a task, doing something you set out to do, no matter how big or small. e.g., "went for a walk", "finished a task".

                    </Text>
                     {/*Meaning / Fulfillment:*/}
                     <Text style={stylesAbout.paragraphHeading}>
                     Meaning / Fulfillment:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Expressing personal values and connecting with higher purpose that is meaningful to you. This includes, creative expression, quality time with people/things you care about, contributing to a cause, and moments thinking about what is important to you. e.g., "meaningful conversation with a friend", "wrote in my journal", "worked on my passion project", "spent time thinking about my values".
                    </Text>
                      {/*Other:*/}
                      <Text style={stylesAbout.paragraphHeading}>
                      Other:
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    If your entry doesn't relate to any of the areas above, choose this option and we will record this entry under the category "other".
                    </Text>
                </View>
            </ScrollView>
        )
    }
    //control mode
    else {
        return (
            <ScrollView style={{backgroundColor: '#b0caef'}}>
                <View>
                    <Text style={styles.screenTitle}>ABOUT</Text>
                    <Text style={stylesAbout.textParagraph}>
                        Often, good moments happen that can go unnoticed. 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Gratitude practice helps us build the skill of noticing and appreciating these moments, which in turn re-wires our brain to being less sensitive to stress and more prone to experiencing flourishing and wellbeing. 
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    Use this app as often as you can to record moments you can feel grateful for that might otherwise go unnoticed.
    
                    </Text>
                    <Text style={stylesAbout.textParagraph}>
                    We will ask you for a mood rating before and after your gratitude entries, to help you track how gratitude practice affects your mood. 
                    </Text>
                </View>
            </ScrollView>
        )
    }
   
}

export default About;

const stylesAbout = StyleSheet.create({
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