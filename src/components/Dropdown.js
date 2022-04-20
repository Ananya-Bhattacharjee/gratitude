import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

const K_OPTIONS = [
    {
      item: 'Very Low Mood - 1',
      count: 1,
      id: '1',
    },
    {
      item: 'Low Mood - 2',
      count: 2,
      id: '2',
    },
    {
      item: 'Neutral - 3',
      count: 3,
      id: '3',
    },
    {
      item: 'Good Mood - 4',
      count: 4,
      id: '4',
    },
    {
      item: 'Very Good Mood - 5',
      count: 5,
      id: '5',
    },
  ]

const Dropdown = ( {mood, setMood }) => {



    return (
        
        <View style={{marginTop: 10, width: 300, marginBottom: 10 }}>
        <SelectBox
            listKey={(item, index) => 'selectBox' + index.toString()}
            label="Select single"
            options={K_OPTIONS}
            value={mood}
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
                width: "100%",
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
            scrollViewProps={{
              nestedScrollEnabled: true,
         }}
        />
        </View>

    )
    
      function onChange() {
        return (val) => setMood(val)
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