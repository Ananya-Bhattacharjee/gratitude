
import React from 'react'
import { View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Appreciation of Beauty & Excellence - "I recognize, emotionally experience, and appreciate the beauty around me and the skill of others."',
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






















