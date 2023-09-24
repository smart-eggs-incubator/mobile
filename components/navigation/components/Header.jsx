import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Flex } from '@react-native-material/core'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [localTemperature, setLocalTemperature] = useState(0)
    const date = new Date().getDate() + " " + monthNames[new Date().getUTCMonth() - 1] + " " + new Date().getFullYear()
    const weather = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/yaounde?key=XSUXP5RCZHLPT3UF8N657C9RL')
    weather.then((res) => {
        res.json().then((data) => {
            const temp = (data.days[0].temp - 32) * (5 / 9)
            // console.log('COMMING DATA ', temp.toFixed(2));
            setLocalTemperature(temp.toFixed(2))

        })
    })
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
                    <Text style={styles.text}>{localTemperature} °C </Text>
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
        fontSize: 17,
        marginLeft: 10,
        fontWeight: 'bold',
    }
})