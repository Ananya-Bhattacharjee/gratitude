
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Love',
    id: '1',
  },
  {
    item: 'Acceptance',
    id: '2',
  },
  {
    item: 'Trust',
    id: '3',
  },
  {
    item: 'Security',
    id: '4',
  },
  {
    item: 'Validation',
    id: '5',
  },
]

const CharacterMenu = ({ selectedCharacters, setSelectedCharacters}) => {

  return (
    <View>
      <View style={{ height: 20 }} />
      <SelectBox
        width='100%'
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedCharacters}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        hideInputFilter={true}
        isMulti
        labelStyle={{
            fontSize: 15,
            color: '#0060ff',
        }}
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
        multiOptionContainerStyle={{ //style multiple selections
            backgroundColor: '#0060ff',
        }}
        multiListEmptyLabelStyle={{ //style for SELECT text
            marginLeft: 10,
        }}
        toggleIconColor={'#0060ff'} //style color of select icon
        selectedItemStyle={{
          marginLeft: 10,
        }}
      />

    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedCharacters(xorBy(selectedCharacters, [item], 'id'))
  }

  function onChange() {
    return (val) => setSelectedTeam(val)
  }
}

export default CharacterMenu;





















/*
//data for multiselect
const items = [
  // name key is must. It is to show the text in front
  {id: 1, name: 'Love'},
  {id: 2, name: 'Acceptance'},
  {id: 3, name: 'Trust'},
  {id: 4, name: 'Security'},
  {id: 5, name: 'Validation'},
  {id: 6, name: 'Health'},
];

const MetNeedsMenu = () => {

    // Data Source for the SearchableDropdown
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };

    return (

        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Multiple Select / Dropdown / Picker Example
            in React Native
          </Text>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"
    />
        </View>
      </SafeAreaView>
    )
}

export default MetNeedsMenu;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    titleText: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    headingText: {
      padding: 8,
    },
  });*/
