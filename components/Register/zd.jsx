import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/constants/theme';
import { ActivityIndicator, Box, Flex, TextInput } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../../src/services/userAuthApi';
import { storeToken } from '../../src/services/AsyncStorageServices';
import { setAuthAsTrue } from '../../src/services/AuthSateSlice';
// import { styles } from './Register';

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
