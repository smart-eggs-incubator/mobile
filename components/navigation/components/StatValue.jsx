import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function StatValue({ icon, title, value, mesure }) {
    return (
        <View style={styles.stats}>
            <View style={styles.content}>
                <View>
                    <Ionicons name={icon} size={30} color={'white'} />
                    <Text style={styles.title}> {title} </Text>
                </View>
                <Text style={{ fontSize: 25, color: 'white' }} > {value}  {mesure} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stats: {
        width: '50%',
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '95%',
        height: '95%',
        backgroundColor: '#62444ace',
        borderRadius: 20,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white'
    }
})