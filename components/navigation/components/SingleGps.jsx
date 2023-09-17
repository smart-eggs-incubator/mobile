import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Box, Flex, IconButton } from "@react-native-material/core";
import images from '../../../assets/constants/images';
import { COLORS } from '../../../assets/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SingleGps = ({ name }) => {
    return (
        <View>
            <Flex fill justify='between' direction='row' style={styles.gps}>
                <View>
                    <Image source={images.logo} style={{ width: 70, height: 70, }} />
                </View>
                <View style={styles.text}>
                    <Text style={{ textAlign: 'left' }}>  {name} </Text>
                </View>
                <View style={styles.text} >
                    <IconButton icon={<Ionicons name='information-circle-outline' size={25} />} />
                </View>
            </Flex>
        </View>
    )
}

export default SingleGps

const styles = StyleSheet.create({
    gps: {
        backgroundColor: COLORS.white,
        margin: 7,
        padding: 6,
        borderRadius: 10
    },
    text: {
        // alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center'
    }
})