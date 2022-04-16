import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser, { IConversation } from "../interface/IUser";
import { groupApi } from "../services";
import friendApi from "../services/friend";
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/vi';
// type SelectedType = "settings" | "information" | "makeFriend" | "showFriends" | null;
export enum SelectedType {
    NULL,
    SETTINGS,
    INFORMATION,
    MAKEFRIEND,
    SHOWFRIENDS,
    MAKEGROUP,
    ADDMEMBER
}
interface GlobalState {
    showModalOption: boolean,
    leftBarLoading: boolean,
    mainChatLoading: boolean,
    resultSearchFriendLoading: boolean,
    language: "vn" | "en",
    selectedModal: SelectedType,
    socketId: string,
    message: {
        text: string;
        file: Array<ArrayBuffer | string>;
    },
    searchedFriend?: Array<Pick<IUser, "_id" | "name" | "username" | "imgUrl">>,
    showGroupDetail: boolean,
    conversation: IConversation;
}
export const handleSearchFriend = createAsyncThunk("search_friend", (params: {
    type: string, value: string
}) => {
    const { type, value } = params;
    return new Promise<Array<Pick<IUser, "_id" | "name" | "username" | "imgUrl">>>((resolve, reject) => {
        friendApi.searchFriend({ type, value }).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    });
})
export const getConversationInfo = createAsyncThunk("get_conversation_info", (params: { id: string }) => {
    return new Promise<IConversation>(async (resolve, reject) => {
        groupApi.getGroupConversation(params).then(result => {
            resolve(result)
        })
    })
})
export const sendFriendRequest = createAsyncThunk("send_friend_request", (param: string) => {
    return new Promise<any>((resolve, reject) => {
        friendApi.sendFriendRequest(param).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
})
const initialState: GlobalState = {
    showModalOption: false,
    leftBarLoading: false,
    mainChatLoading: false,
    resultSearchFriendLoading: false,
    language: window.localStorage.getItem("lang") as "en" | "vn",
    selectedModal: SelectedType.NULL,
    showGroupDetail: false,
    socketId: "",
    message: {
        text: "",
        file: [],
    },
    conversation: {} as IConversation
}

const globalSlice = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        setConversationChoosen: (state: GlobalState, action: PayloadAction<IConversation>) => {
            state.conversation = action.payload;
        },
        setShowGroupDetail: (state: GlobalState) => {
            state.showGroupDetail = true;

        },
        setHideGroupDetail: (state: GlobalState) => {
            state.showGroupDetail = false;
        },
        setShowModalOptionFalse: (state: GlobalState) => {
            return {
                ...state,
                showModalOption: false
            }
        },
        setShowModalOptionTrue: (state: GlobalState) => {
            return {
                ...state,
                showModalOption: true,
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
            if (action.payload === "en") {
                moment.locale("en-au")
            } else {
                moment.locale("vi")
            }
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
        },
        makeSearchedFriendsUndefined: (state: GlobalState) => {
            return {
                ...state,
                searchedFriend: undefined
            }
        },
        handleSetSocketId: (state: GlobalState, action: PayloadAction<string>) => {
            return {
                ...state,
                socketId: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleSearchFriend.pending, (state) => {
            state.resultSearchFriendLoading = true;
        });
        builder.addCase(handleSearchFriend.fulfilled, (state, action) => {
            state.resultSearchFriendLoading = false;
            state.searchedFriend = action.payload;
        })
        builder.addCase(handleSearchFriend.rejected, (state, action) => {
            state.resultSearchFriendLoading = false;
            state.searchedFriend = [];
        })
    }

})

export const { setShowModalOptionFalse, setShowModalOptionTrue, handleChangeMessageText, handleChangeImageFile, handleRemoveImageFile, handleMakeImageListEmpty, setSelectedModal, changeLanguage, makeSearchedFriendsUndefined, handleSetSocketId, setShowGroupDetail, setHideGroupDetail, setConversationChoosen } = globalSlice.actions;
export default globalSlice.reducer;