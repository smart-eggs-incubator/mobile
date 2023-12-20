import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

console.log(process.env.AI_BASE_API_URL)
const Analisys = () => {
    return (
        <View style={{ width: "100%", height: Dimensions.get('window').height - 100, marginTop: 100 }} >
            <WebView source={{ uri: process.env.AI_BASE_API_URL }} style={{ flex: 1 }} />
        </View>
    )
}

export default Analisys

const styles = StyleSheet.create({})