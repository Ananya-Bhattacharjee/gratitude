
import React from 'react'
import { View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Physical Wellbeing:',
    id: '1',
  },
  {
    item: 'Peace & Calm',
    id: '2',
  },
  {
    item: 'Energizing Moments',
    id: '3',
  },
  {
    item: 'Engagement / Flow',
    id: '4',
  },
  {
    item: 'Connection',
    id: '5',
  },
  {
    item: 'Accomplishment',
    id: '6',
  },
  {
    item: 'Meaning / Fulfillment',
    id: '7',
  },
  {
    item: 'Others',
    id: '8',
  }
]

const MetNeedsMenu = ({ selectedNeeds, setSelectedNeeds }) => {

  return (
    <View style={{ marginBottom: 20}}>
      <SelectBox
        width={300}
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedNeeds}
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
            paddingLeft: 10,
            fontSize: 15,
        }}
        multiOptionContainerStyle={{ //style multiple selections
            backgroundColor: '#0060ff',
        }}
        multiListEmptyLabelStyle={{ //style for SELECT text
            paddingLeft: 10,
        }}
        toggleIconColor={'#0060ff'} //style color of select icon
        selectedItemStyle={{
          paddingLeft: 10,
        }}
      />

    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedNeeds(xorBy(selectedNeeds, [item], 'id'))
  }

}

export default MetNeedsMenu;


