import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'

export default function Card(props) {
    return (
        <View style={StyleSheet.card}>
            <View style={StyleSheet.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {

    },
    cardContent: {

    }
})