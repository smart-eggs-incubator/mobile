import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
// import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONT_SIZES, SIZES } from '../../../assets/constants/theme'
import MapViewDirections from "react-native-maps-directions";
import { getToken } from '../../../src/services/AsyncStorageServices';
import SingleGps from '../components/SingleGps';
import { Flex } from 'react-native-flex-layout';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@react-native-material/core';


const Home = () => {

    const [token, setToken] = useState('')

    return (
        <ScrollView style={{ marginTop: 50 }} >

            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <Text style={styles.welcome}  > <Ionicons name='home' size={70} /> Bienvenue  </Text>
                    <Text style={styles.welcomeMessage}> Profilez au maximum  😀 </Text>
                </View>
            </View>
            <Divider />
            <Flex wrap='wrap' direction='row' fill justify='between' style={{ gap: 10, padding: 20 }}>
                <View style={{ ...styles.card, backgroundColor: COLORS.white }}>
                    <Text style={{}}>Incubateurs</Text>
                    <Text>
                        <Ionicons name='egg-sharp' size={70} color={COLORS.primary} /> 10
                    </Text>
                </View>
                <View style={{ ...styles.card, backgroundColor: COLORS.white }}>

                </View>
                <View style={{ ...styles.card, backgroundColor: COLORS.white }}>

                </View>
                <View style={{ ...styles.card, backgroundColor: COLORS.white }}>

                </View>
            </Flex>
            <View>
                <Flex fill justify='around' direction='row' alignItems='center' >
                    <View>
                        <Ionicons name='locate' size={70} color={COLORS.tertiary} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 40, color: COLORS.tertiary }}>Mes Incubateurs</Text>
                    </View>
                </Flex>

            </View>
            <View style={{ height: 150 }}></View>
        </ScrollView>

    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 200,
        marginTop: 25,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 70

    },
    headerContent: {
        width: '92%',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        padding: 35,
        display: 'flex',
        justifyContent: 'space-between'
    },
    welcome: {
        color: COLORS.white,
        fontSize: 45
    },
    welcomeMessage: {
        color: COLORS.white,
        fontSize: 30
    },
    card: {
        width: '48%',
        height: 150,
        borderRadius: 6,
        shadowOpacity: 6,
        shadowOffset: 5,
        shadowColor: COLORS.gray,
        elevation: 5,
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center'
    }

})


