import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { COLORS, FONT_SIZES, SIZES } from '../../../assets/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@react-native-material/core';

import { DropDownPicker } from "react-native-dropdown-picker";

const Services = ({ isVisible, closeModal }) => {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const items = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    return (
        <Modal

            style={{ height: SIZES.window - 50, }}

            isVisible={isVisible}
            onBackdropPress={closeModal}
            // swipeDirection={['down']} // Allow swiping down to close
            animationIn="slideInUp" // Custom animation for opening
            animationOut="slideOutDown" // Custom animation for closing
        // propagateSwipe // Allow swiping through the modal

        >
            <ScrollView style={{ backgroundColor: 'white', height: SIZES.window - 50, padding: 25, position: "relative" }}>
                {/* Your modal content */}

                <TouchableOpacity onPress={closeModal}
                    style={{
                        position: "absolute",
                        right: 5,
                        top: 10,
                        // backgroundColor: COLORS.gray2

                    }}

                >
                    <Ionicons name='close-circle' color={COLORS.primary} size={40} />
                </TouchableOpacity>

                <View style={{ padding: 25 }} >
                    <Text style={{ ...FONT_SIZES.h1.h1, color: COLORS.primary }} >
                        Services
                    </Text>
                    <Text>Gestion des servies</Text>

                    <Text style={{ ...FONT_SIZES.h2.h2 }} > Selectionnez votre service </Text>

                    {/* <DropDownPicker
                        items={items}
                        // defaultValue={selectedValue}
                        containerStyle={{ height: 40, width: 200 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={(item) => setSelectedValue(item.value)}
                    /> 
                    */}
                </View>
            </ScrollView>
        </Modal>
    )
}

export default Services

const styles = StyleSheet.create({})