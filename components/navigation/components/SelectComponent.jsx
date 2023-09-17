import { StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import React, { } from 'react'
import { COLORS } from '../../../assets/constants/theme';

const SelectComponent = ({ items, target, label }) => {
    return (
        <View style={styles.picker}>

            <RNPickerSelect
                label={label}
                onValueChange={(value) => { target = value }}
                items={items}
            />
        </View>
    )
}

export default SelectComponent

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