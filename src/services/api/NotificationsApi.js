import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DJANGO_BASE_API_URL } from "@env"


export const NotificationsApi = createApi({
    reducerPath: 'Notifications',
    baseQuery: fetchBaseQuery({
        baseUrl: DJANGO_BASE_API_URL,
    }),
    endpoints: (builder) => ({
        getNotifs: builder.query({
            query: (token) => ({
                url: 'get_notifs/',
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            })
        })
    })
})

export const { useGetNotifsQuery } = NotificationsApi