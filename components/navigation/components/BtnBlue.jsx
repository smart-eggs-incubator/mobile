import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../../assets/constants/theme'
import { ActivityIndicator, Pressable } from '@react-native-material/core'

export default function BtnBlue({ label, handlePress, isLoading }) {
    return (
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
                <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 25 }}> {label} </Text>

            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({})