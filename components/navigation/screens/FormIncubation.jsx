import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useGetDataForIncCreationQuery } from '../../../src/services/api/HomeApi'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import RNPickerSelect from "react-native-picker-select";
import { COLORS } from '../../../assets/constants/theme'
import { ActivityIndicator, Button, Flex, TextInput } from '@react-native-material/core'
import { useCreateIncubationMutation } from '../../../src/services/api/HomeApi'

export default function FormIncubation() {

    const LoggedUser = useSelector((state) => state.auth)
    const { data, isSuccess, refetch } = useGetDataForIncCreationQuery({ token: LoggedUser.user.payload.access })
    const [incType, setincType] = useState([])
    const [inc, setInc] = useState([])
    const [selectedValue, setSelectedValue] = useState('default');
    const [CreateIncubation] = useCreateIncubationMutation()
    const [postData, setPostData] = useState({
        "incubation_type": 1,
        "incubator": 1,
        "temparature": 0.0,
        "humidity": 0.0,
        "gas": 0.0,
        "eggs_number": null,
        "inclinaision_degree": 0.0,
        "water_level1": 0.0,
        "water_level2": 0.0
    })

    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        setIsLoading(true)
        const res = await CreateIncubation({ token: LoggedUser.user.payload.access, body: postData })
        if (res.data) {
            alert('Success')
        }
        else {
            alert('Some Fields is required')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        if (isSuccess) {
            setincType([])
            setInc([])
            data.incubation_type.forEach(element => {
                setincType((prev) => [...prev, element])
            });
            data.inc.forEach(element => {
                setInc((prev) => [...prev, element])
            });
            console.log(inc);
            console.log("INCUBATIONS TYPES ", incType);
        }
    }, [isSuccess])

    const [refreshing, setRefreshing] = useState(false)

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

            <Flex p={20} >
                <Text>
                    Add Incubations
                </Text>

                <Text style={{ marginTop: 25, fontSize: 21 }} >
                    Incubation type
                </Text>

                <View style={styles.picker}>

                    {
                        incType.length > 0 && (
                            <>
                                <RNPickerSelect
                                    value={postData.incubation_type}
                                    label='Choose Incubation Type'
                                    onValueChange={(value) => { setPostData({ ...postData, incubation_type: value }) }}
                                    items={incType.map((type) => ({
                                        label: type.name, // Use the appropriate property from your incType object
                                        value: type.id, // Use the appropriate property from your incType object
                                    }))}
                                />
                            </>
                        )
                    }

                </View>

                <Text style={{ marginTop: 25, fontSize: 21 }} >
                    Choose Incubator
                </Text>

                <View style={styles.picker}>

                    {
                        inc.length > 0 && (
                            <>
                                <RNPickerSelect
                                    label='Choose Incubator'
                                    value={postData.incubator}
                                    onValueChange={(value) => { setPostData({ ...postData, incubator: value }) }}

                                    items={inc.map((incs) => ({
                                        label: incs.serial_number, // Use the appropriate property from your incType object
                                        value: incs.id, // Use the appropriate property from your incType object
                                    }))}
                                />
                            </>
                        )
                    }

                </View>

                <TextInput
                    style={{ marginTop: 30 }}
                    variant='outlined'
                    placeholder='Eggs Number'
                    inputMode='numeric'
                    value={postData.eggs_number}
                    onChangeText={(target) => setPostData({ ...postData, eggs_number: target })}

                />

                <Button
                    disabled={isLoading}
                    title={!isLoading ? 'Add incubation' : ''}
                    style={{
                        backgroundColor: COLORS.primary,
                        marginTop: 20,
                        padding: 10,
                    }}
                    onPress={handleSubmit}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ color: 'white' }}>Add incubation</Text>
                    )}
                </Button>
            </Flex>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

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
    }
})