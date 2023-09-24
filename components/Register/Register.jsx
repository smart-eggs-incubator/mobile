import { StyleSheet } from 'react-native'
import { COLORS } from '../../assets/constants/theme'
import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';

import { ActivityIndicator, Box, Flex, TextInput } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../../src/services/userAuthApi';
import { storeToken } from '../../src/services/AsyncStorageServices';
import { setAuthAsTrue } from '../../src/services/AuthSateSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import RNPickerSelect from "react-native-picker-select";
// import { Register } from './Register'


export const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [registerUser] = useRegisterUserMutation();
    const [postData, setPostData] = useState({
        email: '',
        name: '',
        password: '',
        password2: '',
        tc: true,
        type_de_compte: 'Particulier'
    });
    const handlePress = async () => {
        setIsLoading(true);
        const res = await registerUser(postData);
        if (res.data) {
            await storeToken(res.data.token);
            dispatch(setAuthAsTrue());
        }
        if (res.error) {
            console.log(res.error.data.errors);
            // console.log(res.error);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer} style={{ backgroundColor: COLORS.white }}>
            <View style={styles.header}>
                <Text style={styles.registerText}> Register</Text>
            </View>
            <View style={styles.background}>
                {/* <Image source={images.tracking} /> */}
            </View>

            <Flex fill justify='center' direction='row'>
                <View style={styles.form}>
                    <TextInput
                        onChangeText={(target) => setPostData({ ...postData, email: target })}

                        style={styles.input}
                        inputMode='email'
                        placeholder='Email'
                        variant='outlined'
                        color={COLORS.gray}
                        leading={<Ionicons name='mail' size={20} color={COLORS.gray} />} />
                    <TextInput
                        onChangeText={(target) => setPostData({ ...postData, name: target })}
                        style={styles.input}
                        inputMode='email'
                        placeholder='Name'
                        variant='outlined'
                        color={COLORS.gray}
                        leading={<Ionicons name='person' size={20} color={COLORS.gray} />} />

                    <TextInput
                        onChangeText={(target) => setPostData({ ...postData, password: target })}
                        style={styles.input}
                        inputMode='text'
                        variant='outlined'
                        secureTextEntry
                        placeholder='Password'
                        color={COLORS.lightBlue}
                        leading={<Ionicons name='lock-closed' size={20} color={COLORS.gray} />} />
                    <TextInput
                        onChangeText={(target) => setPostData({ ...postData, password2: target })}
                        style={styles.input}
                        inputMode='text'
                        variant='outlined'
                        secureTextEntry
                        placeholder='Confirm password'
                        color={COLORS.lightBlue}
                        leading={<Ionicons name='lock-closed' size={20} color={COLORS.gray} />} />

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
                            <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 25 }}> Register </Text>

                        )}
                    </Pressable>
                </View>
            </Flex>

            <Flex fill justify='center' direction='row' style={styles.loginSection}>

                <Pressable style={styles.registerBtn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerBtnText}>Login</Text>
                </Pressable>
            </Flex>
            <Box style={{
                height: 200, backgroundColor: COLORS.primary,
                transform: [{ translateY: -30 }],
                zIndex: -1
            }}></Box>
        </ScrollView>
    );
};


export const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        width: '100%',
        padding: 25,
        // borderBottomLeftRadius: 70,
        // borderBottomRightRadius: 70,
        height: 300,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        // position: "absolute",

    },
    registerText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 30
    },
    input: {
        marginTop: 15,


    },
    form: {
        backgroundColor: COLORS.white,

        padding: 20,
        width: '90%',
        shadowColor: 'gray',
        elevation: 50,
        shadowOffset: 20,
        shadowOpacity: 20,
        shadowRadius: 5,
        borderRadius: 10,
        transform: [{ translateY: -80 }],


    },

    registerBtn: {
        padding: 20,
        backgroundColor: COLORS.white,
        width: "80%",
        borderRadius: 70,
        shadowColor: 'gray',
        elevation: 50,
        shadowOffset: 20,
        shadowOpacity: 20,
        shadowRadius: 5
    },
    registerBtnText: {
        textAlign: "center",
        fontWeight: "bold",
        color: COLORS.primary,
        fontSize: 18
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
export default Register