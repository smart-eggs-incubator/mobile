import { View, StyleSheet, ScrollView, Text, Image, ActivityIndicator, Pressable, } from 'react-native'
import { Box, Flex, TextInput, } from '@react-native-material/core'
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { COLORS } from '../../assets/constants/theme'
import images from '../../assets/constants/images'
import { StackActions } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NativeBaseProvider, useToast } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../src/services/userAuthApi';

import { storeToken } from '../../src/services/AsyncStorageServices';
import { setAuthAsTrue } from '../../src/services/AuthSateSlice';


const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

const Login = ({ navigation }) => {
    // const toast = useToast();
    const [data, setdata] = useState({
        email: '',
        password: ''
    })
    const [loginUser] = useLoginUserMutation()

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isError, setIsError] = useState(false)
    const user = useSelector((state) => state.auth)
    const handlePress = async () => {
        setIsLoading(true);
        setIsError(false)
        const res = await loginUser(data)
        // console.log("SENDING RESQUEST");
        if (res.data) {
            // console.log(res.data);
            await storeToken(res.data.token)
            dispatch(setAuthAsTrue(res.data.token))

        }

        else if (res.error) {
            // console.log(res.error.data.errors);
            setTimeout(() => {
                setIsLoading(false);
                setIsError(true)
            }, 1000);

        }
        else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }


    };


    const [passwordHide, setPasswordHide] = useState(true)
    return (

        // <NativeBaseProvider>

        <ScrollView contentContainerStyle={styles.scrollContentContainer} style={{ backgroundColor: COLORS.white, flex: 1, width: '100%' }}>

            {/* <View style={styles.cercleOne}></View> */}
            <View style={styles.header} ></View>

            <Flex fill justify='center' direction='row' style={{ width: '100%' }}>

                <View style={styles.login}>
                    <View style={styles.logo}>
                        <Image source={images.logo} style={{ width: 200, height: 200, objectFit: 'contain' }} />
                    </View>
                    <View style={styles.form}>
                        {
                            isError &&
                            (
                                <>
                                    <View style={{
                                        backgroundColor: '#fc5858',
                                        padding: 20,
                                        textAlign: 'center',
                                        borderRadius: 7
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 15,
                                                fontWeight: 'bold',
                                                color: 'white',
                                            }}
                                        > Login ou mot de passe incorrect </Text>
                                    </View>
                                </>
                            )
                        }

                        <TextInput
                            inputContainerStyle={{ backgroundColor: COLORS.lightWhite }}
                            inputMode='text'
                            style={styles.input}
                            onChangeText={(target) => setdata({ ...data, email: target })}
                            value={data.email}
                            placeholder="email"
                            keyboardType="default"
                            importantForAccessibility='auto'
                            variant='outlined'
                            leading={<Ionicons name="person" size={25} color={COLORS.gray} />}
                            color={COLORS.lightBlue}

                        />

                        <TextInput
                            inputContainerStyle={{ backgroundColor: COLORS.lightWhite }}
                            style={styles.input}
                            onChangeText={(target) => setdata({ ...data, password: target })}
                            value={data.password}
                            placeholder="Password"
                            keyboardType="default"
                            importantForAccessibility='auto'
                            variant='outlined'
                            secureTextEntry={passwordHide}
                            inputMode='email'
                            leading={<Ionicons name="lock-closed" size={25} color={COLORS.gray} />}
                            color={COLORS.lightBlue}
                            helperText=''
                            trailing={
                                passwordHide ?
                                    (<Ionicons name='eye' size={25} onPress={() => setPasswordHide(!passwordHide)} color={COLORS.gray} />) :
                                    (<Ionicons name='eye-off' size={25} onPress={() => setPasswordHide(!passwordHide)} color={COLORS.gray} />)}

                        />

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
                                <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 25 }}> Login </Text>

                            )}
                        </Pressable>
                    </View>
                </View>

            </Flex>

            <Flex fill justify='center' direction='row' style={styles.loginSection}>

                <Pressable style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerBtnText} >Register</Text>
                </Pressable>
            </Flex>
            <Box style={{
                height: 200, backgroundColor: COLORS.primary,
                transform: [{ translateY: -50 }],
                zIndex: -1
            }}></Box>
            {/* <Flex fill justify='center' direction='row' >
                <View style={{ padding: 25, backgroundColor: COLORS.lightBlue, borderRadius: 20, marginTop: 25 }}>
                    <Ionicons name='logo-google' size={30} />
                </View>
            </Flex> */}


        </ScrollView >
        // </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    header: {
        height: 200,
        backgroundColor: COLORS.primary
    },
    login: {
        transform: [{ translateY: -50 }],
        backgroundColor: COLORS.white,
        width: '90%',
        padding: 30,
        shadowColor: 'gray',
        shadowOffset: 20,
        shadowOpacity: 20,
        elevation: 15,
        shadowRadius: 5,
        borderRadius: 10,
    },

    logo: {
        width: "100%",
        flex: 1,
        alignItems: "center"
    }, input: {
        marginTop: 20
    },
    form: {
        padding: 0,
    },
    loginSection: {
        padding: 25,
        width: '100%'
    },
    loginBtn: {
        backgroundColor: COLORS.primary,
        padding: 20,
        width: '40%',
        borderRadius: 50,
        shadowColor: 'gray',
        shadowOffset: 30,
        shadowOpacity: 5,
        elevation: 15,
        shadowRadius: 15,
    }, loginText: {
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 18
    },
    registerBtn: {
        padding: 20,
        backgroundColor: COLORS.white,
        width: "80%",
        borderRadius: 70,
        shadowColor: 'gray',
        // shadowOffset: 20,
        shadowOpacity: 20,
        elevation: 15,
        shadowRadius: 5
    },
    registerBtnText: {
        textAlign: "center",
        fontWeight: "bold",
        color: COLORS.primary,
        fontSize: 18
    }
})
export default Login