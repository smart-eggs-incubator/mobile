import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DJANGO_BASE_API_URL } from "@env"


export const GpsApi = createApi({
    reducerPath: 'Gps',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://172.20.10.5:8000/' }),
    endpoints: (builder) => ({
        getGps: builder.query({

            query: (token) => ({
                url: 'incubators_list/',
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`,
                },

            }),

        }),
        createGps: builder.mutation({
            query: (data) => ({
                url: 'create_incubator/',
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${data.token}`,
                    'Content-type': 'application/json'
                },
                body: data.data,

            })
        })

    })
})

export const { useGetGpsQuery, useCreateGpsMutation } = GpsApi

