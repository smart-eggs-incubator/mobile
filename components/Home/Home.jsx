import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { COLORS, SIZES } from "../../assets/constants/theme";
import images from '../../assets/constants/images';
import { getToken } from '../../src/services/AsyncStorageServices';
import { StackActions } from '@react-navigation/native';

const Home = ({ navigation }) => {

    return (
        <View style={styles.body}>
            <StatusBar hidden={true} />
            <View style={styles.header}>
                <Image source={images.logo} style={{ width: 250, height: 250, objectFit: 'contain' }} />
            </View>
            <View style={styles.second}>
                <Pressable style={styles.btnPressed} onPress={() => navigation.navigate('Second')}>
                    <Text style={styles.btnPressedTxt}> Get Started </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.primary,
        height: SIZES.window
    },
    header: {
        backgroundColor: COLORS.white,
        height: '50%',
        width: '100%',
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"

    },
    img: {
        width: 80
    },
    second: {
        height: "40%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    btnPressed: {
        padding: 25,
        backgroundColor: COLORS.white,
        width: "75%",
        borderRadius: 70,

    },
    btnPressedTxt: {
        textAlign: "center",
        fontWeight: "bold",
        color: COLORS.primary,
        fontSize: 20
    }

})

export default Home