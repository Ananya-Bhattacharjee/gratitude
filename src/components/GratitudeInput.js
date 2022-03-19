import { CurrentRenderContext } from '@react-navigation/native';
import React, {component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

const GratitudeInput = ({ value, setValue, placeholder }) => {

    

    return (
        <View style={styles.container}>
            <TextInput 
            multiline = {true}
            value = {value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingTop: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingBottom: 15,
        marginTop: 20,
    },
    input: {
        fontSize: 15,
        minHeight: 100,
    }
})

export default GratitudeInput;
