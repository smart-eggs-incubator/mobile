import { StyleSheet, ScrollView, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT_SIZES } from '../../../assets/constants/theme'
import { ActivityIndicator, Divider, FAB, IconButton, ListItem } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import { useGetGpsQuery } from '../../../src/services/api/GpsManegement'
import { useSelector } from 'react-redux'
const GpsManagement = ({ navigation }) => {
    const LoggedUser = useSelector((state) => state.auth)
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetGpsQuery(LoggedUser.user.payload.access)
    const [refreshing, setRefreshing] = useState(false);
    // console.log(error);
    const onRefresh = async () => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    };
    useEffect(() => {

    }, [])
    return (
        <ScrollView style={{ position: 'relative', flex: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <IconButton icon={<Ionicons name='add' color={COLORS.white} size={25} />} style={styles.icon}
                onPress={() => navigation.navigate('GpsForm')}
            />
            <Divider />
            <Text style={styles.title} >Liste de vos Incubateurs</Text>
            <View style={{ padding: 14 }}>
                {
                    !isSuccess ?
                        <>
                            <ActivityIndicator />
                        </>
                        :
                        <>
                            {
                                isError ?
                                    <>
                                        <Text>Erreur</Text>
                                    </>
                                    :
                                    <>
                                        {data.map((gps, key) => (
                                            <ListItem key={key}
                                                // onPress={}
                                                leading={<Ionicons name='locate' />}
                                                title={(gps.serial_number)}
                                                trailing={<Ionicons name='md-chevron-forward' />}

                                            />
                                        ))}
                                    </>
                            }


                        </>
                }
            </View>
        </ScrollView>
    )
}

export default GpsManagement

const styles = StyleSheet.create({
    icon: {
        // position: "absolute",
        alignSelf: 'flex-end',
        margin: 25,
        backgroundColor: COLORS.primary,
        color: COLORS.white
    },
    title: {
        fontSize: 25,
        marginTop: 25,
        padding: 20
    }
})