import { CurrentRenderContext } from '@react-navigation/native';
import React, {component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

const CustomTextInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value = {value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        fontSize: 25,
    }
})

export default CustomTextInput;
