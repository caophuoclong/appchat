import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
    showModalOption: boolean,
    leftBarLoading: boolean,
    mainChatLoading: boolean,
    message: {
        text?: string;
        file: Array<string>;
    }
}

const initialState: GlobalState = {
    showModalOption: false,
    leftBarLoading: false,
    mainChatLoading: false,
    message: {
        text: "",
        file: [],
    }
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        toggleShowModalOption: (state: GlobalState, action: PayloadAction<boolean>) => {
            const { payload } = action;
            if (!payload) {
                return {
                    ...state,
                    showModalOption: false,
                }
            } else
                return {
                    ...state,
                    showModalOption: !state.showModalOption
                }
        },
        handleChangeMessageText: (state: GlobalState, action: PayloadAction<string>) => {
            const { payload } = action;
            return {
                ...state,
                message: {
                    ...state.message,
                    text: payload,
                }
            }
        },
        handleChangeImageFile: (state: GlobalState, action: PayloadAction<string>) => {
            const { payload } = action;
            return {
                ...state,
                message: {
                    ...state.message,
                    file: [...state.message.file, payload]
                }
            }
        }


    }
})

export const { toggleShowModalOption, handleChangeMessageText, handleChangeImageFile } = globalSlice.actions;
export default globalSlice.reducer;