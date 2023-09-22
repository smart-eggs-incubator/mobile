

import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { authStateSlice } from "../services/AuthSateSlice";
import { GpsApi } from '../services/api/GpsManegement';
import { NotificationsApi } from '../services/api/NotificationsApi';
import { HomeApi } from '../services/api/HomeApi';



export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        auth: authStateSlice.reducer,
        [GpsApi.reducerPath]: GpsApi.reducer,
        [NotificationsApi.reducerPath]: NotificationsApi.reducer,
        [HomeApi.reducerPath]: HomeApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAuthApi.middleware,
            GpsApi.middleware,
            NotificationsApi.middleware,
            HomeApi.middleware
        ),
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)