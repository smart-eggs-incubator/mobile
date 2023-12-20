import { Dimensions, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { COLORS, FONT_SIZES } from '../../../assets/constants/theme'
import { useGetIncubationsQuery } from '../../../src/services/api/HomeApi'
import { useSelector } from 'react-redux'
import { ActivityIndicator, Divider, Flex, IconButton } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'

const TextBold = ({ value }) => {
    return (
        <Text style={{ fontWeight: 'bold' }} >  {value}  </Text>
    )
}
const Incubation = ({ incubation, onPress }) => {
    // console.log(incubation);
    return (
        <Pressable
            // onLongPress={}
            onPress={onPress}
            style={{ padding: 12, backgroundColor: COLORS.white, borderRadius: 10, marginBottom: 5, elevation: 2 }} >
            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Incubator  </Text>
                <TextBold value={incubation.incubator.serial_number} key={0} />
            </Flex>
            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  ID  </Text>
                <TextBold value={incubation.id} key={0} />
            </Flex>
            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Start date  </Text>
                <TextBold value={incubation.start_date} key={1} />
            </Flex>

            <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Type  </Text>
                <TextBold value={incubation.incubation_type.name} key={1} />
            </Flex>
            {/* <Flex justify='between' direction='row' style={styles.incubation}>
                <Text>  Type  </Text>
                <TextBold value={incubation.incubation_type.name} key={1} />
            </Flex> */}
            <Flex justify='between' direction='row' fill p={12} >
                <Text> State </Text>
                {
                    incubation.state == 'FINISHED' ?
                        (
                            <Flex direction='row' >
                                <Text> FINISHED </Text>
                                <View style={{ padding: 10, backgroundColor: 'red', borderRadius: 100, marginHorizontal: 10 }} ></View>
                            </Flex>
                        )
                        :
                        (
                            <>
                                {
                                    incubation.state == 'IN PROGRESS' ?

                                        (
                                            <>
                                                <Flex direction='row' >
                                                    <Text> IN PROGRESS </Text>
                                                    <View style={{ padding: 10, backgroundColor: 'green', borderRadius: 100, marginHorizontal: 10 }} ></View>
                                                </Flex>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <>
                                                    <Flex direction='row' >
                                                        <Text> PENDING </Text>
                                                        <View style={{ padding: 10, backgroundColor: 'black', borderRadius: 100, marginHorizontal: 10 }} ></View>
                                                    </Flex>
                                                </>
                                            </>
                                        )
                                }
                            </>
                        )
                }
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

            <Flex direction='row' justify='end' p={20} >
                <IconButton
                    onPress={() => { navigation.push('FormIncubation') }}
                    backgroundColor={COLORS.primary}

                    icon={<Ionicons name='add' color={COLORS.white} size={30} />} />
            </Flex>

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
                                            <Text>An error has occurred</Text>
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