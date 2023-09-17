// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    isLogin: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
            state.isLogin = true
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.isError;

export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch(loginStart());
        console.log(data);
        const response = await axios.post('http://172.20.10.5:8000/api/login/',
            data,
            {
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type header
                },
            }
        );

        if (response.status === 200) {
            const payload = response.data;
            // console.log(payload);

            await AsyncStorage.setItem('token', payload.token.access);

            dispatch(loginSuccess({
                isError: false,
                isLoading: false,
                user: payload,
                isLogin: true
            }));
            return true
        } else {
            console.log(response);
            dispatch(loginFailure());
        }
    } catch (error) {
        dispatch(loginFailure());
    }
};

export default authSlice.reducer;
