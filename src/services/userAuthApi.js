
import { DJANGO_BASE_API_URL } from "@env"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



console.log("BACKEND URL URL", DJANGO_BASE_API_URL);
export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: DJANGO_BASE_API_URL }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'register/',
                    method: "POST",
                    body: user,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            },

        }),

        loginUser: builder.mutation({
            query: (user) => {
                return {
                    url: 'login/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            },

        }),
        getLoggedUser: builder.query({
            query: (token) => {
                return {
                    url: 'profile/',
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        changeUserPassword: builder.mutation({
            query: ({ formdata, access }) => {
                return {
                    url: 'changepassword/',
                    method: 'POST',
                    body: formdata,
                    headers: {
                        'Authorization': `Bearer ${access}`,
                    }
                }
            }
        }),
        sendPasswordResetEmail: builder.mutation({
            query: (user) => {
                return {
                    url: 'send-reset-password-email/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            }
        }),
    }),
})


export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useSendPasswordResetEmailMutation } = userAuthApi