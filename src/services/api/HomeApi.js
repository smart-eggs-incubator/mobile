import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DJANGO_BASE_API_URL } from "@env"



export const HomeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.DJANGO_BASE_API_URL }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: ({ token }) => {
                return {
                    url: 'homeView/',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        getIncubations: builder.query({
            query: ({ token }) => {
                return {
                    url: 'get_incubation/',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        getIncubationsState: builder.query({
            query: ({ id, inc, token }) => {
                return {
                    url: `incubation_state/${id}/${inc}/`,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        getIncubationSevedData: builder.query({
            query: ({ id, inc, token }) => {
                return {
                    url: `incubation_saved_data/${id}/${inc}/`,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),
        getDataForIncCreation: builder.query({
            query: ({ token }) => {
                return {
                    url: `get_data_create_incubation/`,

                    headers: {

                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        }),

        doAction: builder.mutation({
            query: ({ token, id, body }) => {
                return {
                    url: `do_action/${id}/`,
                    method: "POST",
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                    body: body

                }
            }
        }),

        CreateIncubation: builder.mutation({
            query: ({ token, body }) => {
                return {
                    url: `create_incubation/`,
                    method: "POST",
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                    body: body

                }
            }
        }),
        NoteIncubation: builder.mutation({
            query: ({ token, body }) => {
                return {
                    url: `note_incubation/`,
                    method: "POST",
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                    body: body

                }
            }
        }),
        getNote: builder.query({
            query: ({ token, id }) => {
                return {
                    url: `ncubation_note/${id}/`,
                    method: "GET",
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },


                }
            }
        })
    })
})

export const { useGetAllQuery,
    useGetIncubationsQuery,
    useGetIncubationsStateQuery,
    useGetIncubationSevedDataQuery,
    useGetDataForIncCreationQuery,
    useDoActionMutation,
    useCreateIncubationMutation,
    useNoteIncubationMutation,
    useGetNoteQuery
} = HomeApi