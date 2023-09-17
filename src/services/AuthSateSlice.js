import { createSlice } from "@reduxjs/toolkit";

export const authStateSlice = createSlice({
    name: "auth",
    initialState: {
        state: false,
        user: {}
    },
    reducers: {
        removeAuth: (state) => {

            state.state = false
            state.user = {}
            return state
        },
        setAuthAsTrue: (state, payload) => {

            state.state = true
            state.user = payload
            return state
        },
    }
})

export const { removeAuth, setAuthAsTrue } = authStateSlice.actions

