import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Flex } from '@react-native-material/core'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date().getDate() + " " + monthNames[new Date().getUTCMonth() - 1] + " " + new Date().getFullYear()
    return (
        <View style={styles.header}>
            {/* <Flex fill direction='row' justify='between'>
                <View>
                    <Text style={{ fontSize: 32 }}>Welcome</Text>
                </View>
                <Flex direction='row'>
                    <Ionicons name='notifications' size={25} />
                    <Ionicons name='person' size={25} />
                </Flex>
            </Flex> */}
            <Flex style={styles.meteo}
                justify='between'
                direction='row'
            >
                <Flex direction='row' items='center'>

                    <Ionicons name='sunny' size={35} color={'yellow'} />
                    <Text style={styles.text}>23 degrees</Text>
                </Flex>

                <Flex direction='row' items='center'>
                    <Text style={styles.text}> {date} </Text>
                </Flex>

            </Flex>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 25,
        // backgroundColor: '#62444ace'
    },
    meteo: {
        marginTop: 12,
        backgroundColor: '#62444ace',
        padding: 12,
        borderRadius: 12
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginLeft: 10
    }
})