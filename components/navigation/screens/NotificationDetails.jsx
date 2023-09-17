import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Flex } from '@react-native-material/core'
import { COLORS } from '../../../assets/constants/theme'

export default function NotificationDetails({ route }) {
    const { notifs } = route.params
    return (
        <View>

            <Flex mt={20} bg={COLORS.lightBlue}
                p={20}
                m={20}
            >
                <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>    Notification </Text>
            </Flex>
            <Flex
                bg={COLORS.white}
                mv={20}
                m={20}
            >
                <Text
                    style={{ textAlign: 'justify', padding: 25 }}
                >
                    {notifs.content}
                </Text>
            </Flex>

            <Flex mt={20} bg={COLORS.lightBlue}
                p={20}
                m={20}
            >
                <Text style={{ color: COLORS.dark, fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>  Date :  {notifs.date} </Text>
            </Flex>
        </View>
    )
}

const styles = StyleSheet.create({})