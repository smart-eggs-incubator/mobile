import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT_SIZES, SHADOWS } from '../../../assets/constants/theme'
import { Flex, ListItem } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal';
import Services from './Services'
import GpsManagement from './GpsManagement'
import MyCalendar from '../components/MyCalendar'

const Management = ({ navigation }) => {
    const [serviceModal, setserviceModal] = useState(false)


    const toggleModalService = () => {
        console.log(serviceModal);
        setserviceModal(!serviceModal);
    };
    return (
        <ScrollView style={{ marginTop: 50, paddingBottom: 10 }} >
            <Services isVisible={serviceModal} closeModal={toggleModalService} />
            <Flex fill direction='row' justify='center' style={styles.container}>
                <Flex style={styles.content} justify='around' p={20} shouldRasterizeIOS>
                    <Text style={{ ...FONT_SIZES.h1.h1, color: COLORS.primary }}> <Ionicons name='settings' size={100} color={COLORS.primary} /> Gestion  </Text>
                    <Text style={FONT_SIZES.h2.h2}>Managez vos incubateurs</Text>
                </Flex>
            </Flex>



            <Flex mt={20} p={20} mb={10} >
                <ListItem
                    onPress={() => { navigation.push('GpsManagement') }}
                    trailing={<Ionicons name='chevron-forward' />} title='Incubateurs'
                    leading={<Ionicons name='locate' size={25} color={COLORS.primary} />}
                />
                <ListItem
                    onPress={() => { navigation.push('Suivie') }}
                    trailing={<Ionicons name='chevron-forward' />} title='Incubations'
                    leading={<Ionicons name='stats-chart-outline' size={25} color={COLORS.primary} />}
                />
                <ListItem
                    trailing={<Ionicons name='chevron-forward' />} title='suivie'
                    leading={<Ionicons name='settings' size={25} color={COLORS.primary} />}
                />
            </Flex>
            <View style={{ padding: 20 }} >
                <MyCalendar />
            </View>
            <View style={{ height: 100 }} ></View>
        </ScrollView >
    )
}

export default Management

const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20,
    },
    content: {
        width: '90%',

        backgroundColor: COLORS.white,
        ...SHADOWS.small,
        borderRadius: 10
    }
})