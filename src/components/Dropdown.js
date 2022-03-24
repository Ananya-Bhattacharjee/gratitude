import React, { useState, useEffect} from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

const K_OPTIONS = [
    {
      item: 'Very Low Mood - 1',
      id: '1',
    },
    {
      item: 'Low Mood - 2',
      id: '2',
    },
    {
      item: 'Neutral - 3',
      id: '3',
    },
    {
      item: 'Good Mood - 4',
      id: '4',
    },
    {
      item: 'Very Good Mood - 5',
      id: '5',
    },
  ]

const Dropdown = ( {newMood, setMood }) => {

    //const [selectedTeam, setSelectedTeam] = useState({})
    //const [selectedTeams, setSelectedTeams] = useState([])


    const [selectedMood, setSelectedMood] = useState({})

    useEffect(() => {
        
        if(selectedMood.id == '1') {
            setMood('1')
        }
        else if(selectedMood.id == "2") {
            setMood('2')
        }
        else if(selectedMood.id == "3") {
            setMood('3')
        }
        else if(selectedMood.id == "4") {
            setMood('4')
        }
        else {
            console.log(selectedMood.id);
            setMood('5')
        }

    },[selectedMood])
    

    return (
        
        <View style={{marginTop: 10}}>
        <SelectBox
            label="Select single"
            options={K_OPTIONS}
            value={selectedMood}
            onChange={onChange()}
            hideInputFilter={true}
            containerStyle={{
                backgroundColor: '#ffffff',
                borderRadius: 5,
            }}
            arrowIconColor={'blue'} //style for dropdown arrow
            optionsLabelStyle={{ //style for labels of options
                color: 'black',
                marginLeft: 10,
                fontSize: 15,
            }}
            listEmptyLabelStyle={{ //style for SELECT text
                marginLeft: 10,
            }}
            selectedItemStyle={{
              marginLeft: 10,
            }}
            labelStyle={{
                fontSize: 15,
                color: '#0060ff',
            }}
        />
        </View>


        /*
        <Picker
        value = {newMood}
        onValueChange={(itemValue, itemIndex) => 
            setMood(itemValue)
        }
        style={styles.picker}
        itemStyle={styles.pickerItem}
        >
        <Picker.Item label="Very Low Mood - 1" value="1" />
        <Picker.Item label="Low Mood - 2" value="2" />
        <Picker.Item label="Neutral - 3" value="3" />
        <Picker.Item label="Good Mood - 4" value="4" />
        <Picker.Item label="Very Good Mood - 5" value="5" />
    </Picker>*/

    )
    
      function onChange() {
        return (val) => setSelectedMood(val)
      }
    
}

export default Dropdown;





const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker: {
    // flex: 1,
      width: "100%",
      height: 44,
      marginTop: 10,
    },
   pickerItem: {
    height: 30,
   }
})