import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { ActivityIndicator, Box, Flex, Pressable, TextInput } from '@react-native-material/core'
import { COLORS } from '../../../assets/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { useCreateGpsMutation, useGetGpsQuery } from '../../../src/services/api/GpsManegement'


const GpsForm = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fromSta, setFromSta] = useState({ serial_number: '' })
    const user = useSelector((state) => state.auth)
    const [createGps] = useCreateGpsMutation(user.user.payload.access)
    const [error, setError] = useState({
        isError: false,
        message: ''
    })


    const handlePress = async () => {
        setIsLoading(true);
        // console.log("SERIAL NUMBER", fromSta.serial_number);
        const res = await createGps({ token: user.user.payload.access, data: { serial_number: fromSta.serial_number } })

        if (res.error) {
            // console.log(res.error);
            if (res.error.data.message.serial_number) {
                setError({ ...error, isError: true })
                setError({ ...error, message: res.error.data.message.serial_number })

            }
            else {
                setError({ ...error, isError: true })
                setError({ ...error, message: res.error.data.message })

            }

        }
        if (res.data) {
            navigation.pop()
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500);

    };
    return (
        <ScrollView>
            <Flex fill justify='center' p={10} style={styles.from}>
                <View bg={COLORS.white} p={10} fill>
                    <Text style={{ marginBottom: 5 }} > Numero de série</Text>
                    <TextInput

                        placeholder='Numero de série'
                        inputMode='text'
                        variant='outlined'
                        onChangeText={(target) => setFromSta({ ...fromSta, serial_number: target })}
                        leading={<Ionicons name='locate' size={25} color={COLORS.primary} />}
                        error={!error.isError}

                    />


                    {
                        !error.isError && (
                            <>
                                <Text style={{ color: 'red' }} > {error.message} </Text>
                            </>
                        )
                    }
                    <Pressable style={{
                        backgroundColor: COLORS.primary,
                        padding: 15,
                        marginTop: 20,
                        borderRadius: 5
                    }}
                        disabled={isLoading}
                        onPress={handlePress}
                    >

                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 25 }}> Valider </Text>

                        )}
                    </Pressable>
                </View>
            </Flex>
        </ScrollView>
    )
}

export default GpsForm

const styles = StyleSheet.create({
    from: {
        marginTop: 100,
        backgroundColor: COLORS.white,
        paddingTop: 50,
        paddingBottom: 50,


    }
})