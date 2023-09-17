import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Flex, TextInput } from '@react-native-material/core'
import { COLORS, FONT_SIZES } from '../../../assets/constants/theme'
import SelectComponent from '../components/SelectComponent'
import RNPickerSelect from "react-native-picker-select";
import { useGetGpsQuery } from '../../../src/services/api/GpsManegement'
import { useSelector } from 'react-redux'
import BtnBlue from '../components/BtnBlue'
import RNDateTimePicker from '@react-native-community/datetimepicker'
const Suivie = () => {
    const Value = null
    // console.log(Value);
    const LoggedUser = useSelector((state) => state.auth)
    const { data, isLoading, isSuccess, isError, refetch } = useGetGpsQuery(LoggedUser.user.payload.access)
    // const [refreshing, setRefreshing] = useState(false);
    const [selectedValue, setselectedValue] = useState('')
    const [formData, setFormData] = useState({
        startD: '',
        endD: ''
    })
    const [gpsList, setgpsList] = useState([])
    const [btnLoading, setbtnLoading] = useState(false)
    if (isSuccess) {
        let MyData = []
        data.forEach(element => {
            gpsList.push({ value: element.id, label: element.code })
        });



        console.log(MyData);
    }
    const handlePress = () => {
        setbtnLoading(true)
        setTimeout(() => {
            setbtnLoading(false)
        }, 2000);
    }

    return (
        <ScrollView>
            <Flex style={styles.header} items='center' direction='row' justify='center' >
                <Flex style={styles.headerChild} bg={COLORS.white} fill justify='center' items='center' >
                    <Text style={{ ...FONT_SIZES.h1.h1 }}>Suivie et historique</Text>
                </Flex>
            </Flex>

            <Flex fill direction='row' grow={3} p={12} justify='between'>
                <TextInput style={styles.inputSec}
                    variant='outlined'
                    placeholder='Date debut'
                />

                <TextInput style={styles.inputSec}
                    variant='outlined'
                    placeholder='Heure de debut'
                />
            </Flex>

            <Flex fill direction='row' grow={3} p={12} justify='between'>
                <TextInput style={styles.inputSec}
                    variant='outlined'
                    placeholder='Date de fin'
                />

                <TextInput style={styles.inputSec}
                    variant='outlined'
                    placeholder='Heure de fin'
                />
            </Flex>

            <View style={{ padding: 12 }}>
                {/* <SelectComponent
                    items={gpsList}
                    // key={0}
                    label='Selectionnez un gps'
                // target={Value}
                /> */}

                <View style={styles.picker}>

                    <RNPickerSelect
                        label='Selectionnez le type de compte'
                        onValueChange={(value) => setselectedValue(value)}
                        items={gpsList}
                    />
                </View>

            </View>

            <View style={{ padding: 12 }}>
                <BtnBlue label='Rechercher' isLoading={btnLoading} handlePress={handlePress} />
            </View>


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
    }
})