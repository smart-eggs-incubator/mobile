import { Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { COLORS, FONT_SIZES } from '../../../assets/constants/theme'
import { useGetIncubationsQuery } from '../../../src/services/api/HomeApi'
import { useSelector } from 'react-redux'
import { ActivityIndicator, Divider, Flex } from '@react-native-material/core'

const TextBold = ({ value }) => {
    return (
        <Text style={{ fontWeight: 'bold' }} >  {value}  </Text>
    )
}
const Incubation = ({ incubation, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ padding: 12, backgroundColor: COLORS.white, borderRadius: 10, marginBottom: 5, elevation: 2 }} >
            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Incubateur  </Text>
                <TextBold value={incubation.incubator.serial_number} key={0} />
            </Flex>
            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Date de début  </Text>
                <TextBold value={incubation.start_date} key={1} />
            </Flex>
        </Pressable>
    )
}

const Suivie = ({ navigation }) => {
    const LoggedUser = useSelector((state) => state.auth)
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetIncubationsQuery({ token: LoggedUser.user.payload.access })
    console.log(data);
    const handlePress = (inc) => {
        // alert()
        navigation.navigate('IncDetails', { inc: inc, token: LoggedUser.user.payload.access })
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {
                isLoading ?
                    (
                        <>
                            <ActivityIndicator />
                        </>
                    )
                    :
                    (
                        <>
                            {
                                isSuccess ?
                                    (
                                        <Flex style={{ padding: 15 }} >
                                            {

                                                data['incubations'].map((inc, key) => {

                                                    return (
                                                        <Incubation key={key} onPress={() => { handlePress(inc) }} incubation={inc} />
                                                    )
                                                })
                                            }
                                        </Flex>
                                    )
                                    :
                                    (
                                        <>
                                            <Text>Une erreur est survenu</Text>
                                        </>
                                    )
                            }
                        </>
                    )
            }

        </ScrollView>
    )
}

export default Suivie

const styles = StyleSheet.create({
    header: {
        margin: 'auto',
        marginTop: 20,
        // width: '90%',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    headerChild: {
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    inputSec: {
        width: '47%'
    },
    picker: {
        height: 58,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: .5,
        marginTop: 10,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 25
    },
    incubation: {

        padding: 10,
        // width: Dimensions.get('window').width / 2
    }
})