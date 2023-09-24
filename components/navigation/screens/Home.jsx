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
import { ActivityIndicator, Divider } from '@react-native-material/core';
import { useGetAllQuery } from '../../../src/services/api/HomeApi';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import MyCalendar from '../components/MyCalendar';


const Dash = ({ fromcolor, tocolor, icon, title, value }) => {
    return (
        <View style={{ padding: 20 }} >

            <LinearGradient
                colors={[fromcolor, tocolor]}
                style={{ borderRadius: 5 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Flex p={20} ph={50} direction='row' fill justify='between' items='center'  >
                    <View>
                        <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }} > {value} </Text>
                        <Text style={{ fontSize: 25, color: 'white' }}> {title} </Text>
                    </View>
                    <View>
                        <Ionicons name={icon} size={70} color={'white'} />
                    </View>
                </Flex>

                <Divider color='white' />
                <Flex p={10} >
                    <Text style={{ fontSize: 15, color: 'white', marginLeft: 25 }}>  </Text>
                </Flex>
            </LinearGradient>
        </View>

    )
}
const Home = () => {

    const [token, setToken] = useState('')

    const user = useSelector((state) => state.auth)

    // console.log("USER UIN PROFILE PAGE  :  ", user);

    const { data, isError, isSuccess, isLoading } = useGetAllQuery({ token: user.user.payload.access })
    // console.log(data);
    return (
        <ScrollView style={{ marginTop: 50 }} >
            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <Text style={styles.welcome}  > <Ionicons name='home' size={50} /> Bienvenue  </Text>
                    <Text style={styles.welcomeMessage}> Profilez au maximum  😀 </Text>
                </View>
            </View>
            <Divider />


            {
                isLoading ?

                    (
                        <>
                            <ActivityIndicator />
                        </>
                    ) :
                    (
                        <>

                            <Dash fromcolor={'#055aaf'} tocolor={'#00d4ff'} icon={'egg'} value={data.incubators_count} title={'incubateurs'} />
                            <Dash fromcolor={'#e41e1e'} tocolor={'#f85e5e'} icon={'egg'} value={data.incubations} title={'Incubations'} />
                            <Dash fromcolor={'#02c80c'} tocolor={'#6ce872'} icon={'document-attach'} value={data.incubators_count} title={'Rapports'} />
                            <Dash fromcolor={'#f08501'} tocolor={'#efbc2b'} icon={'egg'} value={data.incubators_count} title={'incubateurs'} />


                            <View style={{ height: 50 }}></View>
                        </>
                    )
            }
            <View style={{ height: 40 }} ></View>
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
        fontSize: 30
    },
    welcomeMessage: {
        color: COLORS.white,
        fontSize: 20
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


