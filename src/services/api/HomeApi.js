import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DJANGO_BASE_API_URL } from "@env"



export const HomeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: DJANGO_BASE_API_URL }),
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
            query: ({ id, token }) => {
                return {
                    url: `incubation_state/${id}/`,
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                }
            }
        })
    })
})

export const { useGetAllQuery, useGetIncubationsQuery, useGetIncubationsStateQuery } = HomeApi