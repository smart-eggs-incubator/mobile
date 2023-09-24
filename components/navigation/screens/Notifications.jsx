import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useGetNotifsQuery } from '../../../src/services/api/NotificationsApi'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../assets/constants/theme'
import { ActivityIndicator, Flex, ListItem } from '@react-native-material/core'
import { useState } from 'react'
import { NativeBaseProvider } from 'native-base'

const Notifications = ({ navigation }) => {
    const LoggedUser = useSelector((state) => state.auth)
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetNotifsQuery(LoggedUser.user.payload.access)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    };
    // console.log(error);
    return (
        <ScrollView
            style={{ marginTop: 50 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <Flex fill justify='center'
                bg={COLORS.white}
                h={70}
            >

                <Text style={styles.title} > <Ionicons size={25} name='notifications' /> Notifications</Text>

            </Flex>

            {isLoading ?
                (
                    <>
                        <ActivityIndicator />
                    </>
                )
                :

                <>

                    {
                        error ?
                            (
                                <>
                                    <Text>Une erreur est survenu


                                    </Text>
                                </>

                            )
                            :
                            (<>
                                {data.map((notif, key) => (
                                    (
                                        <NativeBaseProvider key={key}>
                                            <ListItem
                                                onPress={() => { navigation.navigate('NotifsDetails', { notifs: notif }) }}
                                                leading={<Ionicons name='notifications' />}
                                                title={(notif.date)}
                                                trailing={<Ionicons name='md-chevron-forward' />}

                                            />
                                        </NativeBaseProvider>

                                    )

                                ))}


                            </>)
                    }
                </>



            }
        </ScrollView >
    )
}

export default Notifications

const styles = StyleSheet.create({
    title: {
        // backgroundColor: COLORS.white,
        // height: 70,
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center'
        fontSize: 25
    }
})