import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS } from '../../../assets/constants/theme'
import { Flex } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import WebView from 'react-native-webview'

import * as Permissions from 'expo-permissions';


// import * as Speech from 'expo-speech'

// import * as ExpoStt from 'expo-stt';

// import { Voice } from 'expo-speech'
// import { Voice } from 'expo-speech'
// import { } from '@react-native-voice/voice'²



const Chat = () => {

    // const speechGreating = () => {
    //     Speech.speak('Yo, Whats\'op TIOMéLA ,jou daniel: je suis ton assistant virtuel')
    // }

    const requestMicrophonePermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

        if (status === 'granted') {
            // Microphone permission granted, you can load your WebView here
            // Replace 'YOUR_WEBVIEW_URL' with the actual URL of your WebView
            alert('allowed')
        } else {
            // Handle permission denied or other cases
        }
    };

    requestMicrophonePermission()
    const [recognizedText, setRecognizedText] = useState('');
    const [error, setError] = useState(false)
    const [IsRocording, setIsRocording] = useState(false)

    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const handlePressapps = () => {
        setFirst(true)
        setSecond(false)
        setThird(false)
        // speechGreating()
        // Speech.VoiceQuality('')
        // Speech.speak('HELLO, DANIEL , i am your virtual assistant ?')

    }
    const handlePresssend = () => {
        setFirst(false)
        setSecond(true)
        setThird(false)
    }
    const handlePresstrash = () => {
        setFirst(false)
        setSecond(false)
        setThird(true)
    }


    // Voice.onSpeechStart = () => { setIsRocording(true) }
    return (
        // <ScrollView>
        //     <Flex justify='center' direction='row' fill >

        //         <View style={styles.header}   >
        //             <Ionicons color={COLORS.white} name='mic' size={75} />
        //             <Text style={{ color: COLORS.white, fontSize: 40 }} > Assistant vocal </Text>
        //         </View>

        //     </Flex>
        //     <Flex justify='evenly' direction='row' alignItems='center' mt={50} p={10}  >
        //         <Pressable style={{
        //             ...styles.pressable,
        //             ...(first ? { backgroundColor: COLORS.primary, color: 'white' } : {}),
        //         }} onPress={handlePressapps} >
        //             <Ionicons size={30} color={first ? 'white' : COLORS.primary} name='apps' />
        //         </Pressable>

        //         <Pressable style={{
        //             ...styles.pressable,
        //             ...(second ? { backgroundColor: COLORS.primary, color: 'white' } : {}),
        //         }} onPress={handlePresssend} >
        //             <Ionicons size={30} color={second ? 'white' : COLORS.primary} name='send' />
        //         </Pressable>
        //         <Pressable style={{
        //             ...styles.pressable,
        //             ...(third ? { backgroundColor: COLORS.primary, color: 'white' } : {}),
        //         }} onPress={handlePresstrash} >
        //             <Ionicons size={30} color={third ? 'white' : COLORS.primary} name='archive' />
        //         </Pressable>
        //     </Flex>

        //     <Flex p={5} mt={5} >
        //         <Text>{recognizedText}</Text>
        //     </Flex>
        // </ScrollView>
        <View style={{ width: "100%", height: Dimensions.get('window').height - 100, marginTop: 100 }} >
            <WebView source={{ uri: 'http://172.20.10.5:8000/voice/' }} style={{ flex: 1 }}
                javaScriptEnabled={true}
                allowsFullscreenVideo={true}
            // mediaPlaybackRequiresUserAction={false}

            />
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    header: {
        height: 200,
        backgroundColor: COLORS.primary,
        padding: 10,
        marginTop: 50,
        width: Dimensions.get('window').width - 30,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable: {
        backgroundColor: COLORS.white,
        padding: 30,
        elevation: 2,
        borderRadius: 200,
        // ...SHADOWS.medium

    }

})