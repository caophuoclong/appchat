import { configureStore } from "@reduxjs/toolkit"
import { globalSlice, messageSlice, userSlice } from "./reducers"


export const store = configureStore({
    reducer: {
        user: userSlice,
        global: globalSlice,
        messages: messageSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch