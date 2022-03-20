import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedType = "settings" | "information" | null;

interface GlobalState {
    showModalOption: boolean,
    leftBarLoading: boolean,
    mainChatLoading: boolean,
    language: "vn" | "en",
    selectedModal: SelectedType,
    socketId: string,
    message: {
        text: string;
        file: Array<ArrayBuffer | string>;
    }
}

const initialState: GlobalState = {
    showModalOption: false,
    leftBarLoading: false,
    mainChatLoading: false,
    language: window.localStorage.getItem("lang") as "en" | "vn",
    selectedModal: null,
    socketId: "",
    message: {
        text: "",
        file: [],
    }
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        toggleShowModalOption: (state: GlobalState) => {
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
        handleChangeImageFile: (state: GlobalState, action: PayloadAction<ArrayBuffer | string>) => {
            const { payload } = action;
            return {
                ...state,
                message: {
                    ...state.message,
                    file: [...state.message.file, payload]
                }
            }
        },
        handleMakeImageListEmpty: (state: GlobalState) => {
            return {
                ...state,
                message: {
                    ...state.message,
                    file: []
                }
            }
        },
        handleRemoveImageFile: (state: GlobalState, action: PayloadAction<ArrayBuffer | string>) => {
            return {
                ...state,
                message: {
                    ...state.message,
                    file: state.message.file.filter(item => item !== action.payload)
                }
            }
        },
        setSelectedModal: (state: GlobalState, action: PayloadAction<SelectedType>) => {
            return {
                ...state,
                selectedModal: action.payload,
            }
        },
        changeLanguage: (state: GlobalState, action: PayloadAction<"en" | "vn">) => {
            return {
                ...state,
                language: action.payload
            }
        },
        handleConnectToServer: (state: GlobalState, action: PayloadAction<string>) => {
            return {
                ...state,
                socketId: action.payload
            }
        }
    }

})

export const { toggleShowModalOption, handleChangeMessageText, handleChangeImageFile, handleRemoveImageFile, handleMakeImageListEmpty, setSelectedModal, changeLanguage } = globalSlice.actions;
export default globalSlice.reducer;