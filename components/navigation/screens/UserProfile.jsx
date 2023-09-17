import { Dimensions, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SHADOWS } from '../../../assets/constants/theme'
import { ActivityIndicator, Avatar, Divider, Flex, IconButton } from '@react-native-material/core'
import images from '../../../assets/constants/images'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'

import { getToken, removeToken } from '../../../src/services/AsyncStorageServices'
import { removeAuth } from '../../../src/services/AuthSateSlice'
import { useGetLoggedUserQuery } from '../../../src/services/userAuthApi'
import { useSelector } from "react-redux";

const UserProfile = ({ }) => {
    const [token, setToken] = useState({})
    const dispatch = useDispatch()
    const [StartLogout, setStartLogout] = useState(false)
    const [userInfo, setUserInfo] = useState({ email: '', name: '', type_de_compte: '' })
    const [refreshing, setRefreshing] = useState(false);
    const user = useSelector((state) => state.auth)

    // console.log("USER UIN PROFILE PAGE  :  ", user);
    const { data, isSuccess, refetch } = useGetLoggedUserQuery(user.user.payload.access)
    // console.log(data);
    const onRefresh = async () => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);

    };

    const handleRemoveToken = async () => {
        await removeToken()
        setStartLogout(true)
        setTimeout(() => {
            dispatch(removeAuth())

        }, 2000)

    }








    useEffect(() => {
        (async () => {
            const token = await getToken()
            if (token) {
                const { access, refresh } = JSON.parse(token)
                setToken({
                    "access": access,
                    "refresh": refresh
                })
                // dispatch(setUserAccessToken({ access_token: access }))
            }
        })();
        if (isSuccess) {
            setUserInfo({ email: data.email, name: data.name, type_de_compte: data.type_de_compte })
        }

    }, [isSuccess, data])

    return (
        <ScrollView style={{ marginTop: 0 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <View style={{ height: 250, backgroundColor: COLORS.primary, position: 'relative' }}>
                <Avatar
                    size={150}

                    style={styles.avatar}
                    image={images.logo}
                />
                <IconButton onPress={handleRemoveToken} icon={<Ionicons name='log-out-outline' size={30} color={COLORS.primary} />} style={styles.logout} />
            </View>
            <View style={styles.info}>
                <View style={{ width: '90%', backgroundColor: COLORS.white, padding: 25, margin: 'auto', borderRadius: 7 }}>
                    <Flex justify='between' direction='row' m={15}>
                        <Text>Email</Text>
                        <Text> {userInfo.email}</Text>
                    </Flex>
                    <Divider />
                    <Flex justify='between' direction='row' m={15}>
                        <Text >Nom</Text>
                        <Text> {userInfo.name} </Text>
                    </Flex>
                    <Divider />
                    <Flex justify='between' direction='row' m={15}>
                        <Text >Type de compte</Text>
                        <Text> {userInfo.type_de_compte} </Text>
                    </Flex>
                </View>
            </View>

            <View >

            </View>


            {StartLogout ? (
                <View style={styles.logoutSection} >
                    <ActivityIndicator size='large' color={COLORS.primary} />
                </View>
            ) : (<></>)
            }
        </ScrollView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    avatar: {
        transform: [{ translateY: 180 }],
        marginLeft: 25
    },
    logout: {
        position: 'absolute',
        top: 70,
        right: 40,
        backgroundColor: COLORS.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutSection: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.lightOpacity2,
        zIndex: 100,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        marginTop: 100,
        // padding: 25,
        // backgroundColor: COLORS.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // ...SHADOWS.medium
    }
})