import { configureStore } from "@reduxjs/toolkit"
import { globalSlice, userSlice } from "./reducers"


export const store = configureStore({
    reducer: {
        user: userSlice,
        global: globalSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch