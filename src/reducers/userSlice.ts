import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import IUser, { IConversation, INotification, participation } from '../interface/IUser';
import IMessage from "../interface/IMessage";
import userApi, { DataResponseGetFriends } from '../services/user.api';
import notiApi from '../services/notification';
import IGroup from '../interface/IGroup';
import { groupApi } from '../services';
export type dateType =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30;
interface UserState extends IUser {
    choosenFriend: {
        conversationId: string;
    };
    loading: boolean;
    temp: string,
}
export const getMe = createAsyncThunk(
    'get_me',
    (params, thunkApi) => {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const xxx = await userApi.getMe();
                resolve(xxx);
            } catch (error: any) {
                if (error.message === 'Done') thunkApi.dispatch(getMe());
                if (error.status === 500) {
                    reject(error);
                }
            }
        });
    }
);
export const updateInformation = createAsyncThunk(
    'update_information',
    (params: Partial<IUser>) => {
        return new Promise<Partial<IUser>>(async (resolve, reject) => {
            try {
                const xxx = await userApi.updateUserInfomation(params);
                if (xxx.code === 200) {
                    const { data } = xxx;
                    const {
                        name,
                        email,
                        gender,
                        numberPhone,
                        dateOfBirth,
                        imgUrl,
                    } = data;
                    resolve({
                        name,
                        email,
                        gender,
                        numberPhone,
                        dateOfBirth,
                        imgUrl,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
);
export const markSeenNoti = createAsyncThunk("mark_seen_noti", (params: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const xxx = await notiApi.markSeenNoti(params);
            resolve(xxx);
        } catch (error) {
            reject(error);
        }
    })
})
export const refreshNoti = createAsyncThunk("refresh_noti", () => {
    return new Promise<Array<INotification>>((resolve, reject) => {
        try {
            const xxx = notiApi.getNotification();
            console.log(xxx);
            resolve(xxx);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
})
export const refreshConversations = createAsyncThunk("refresh_conversations", () => {
    return new Promise<Array<IConversation>>((resolve, reject) => {
        try {
            const xxx = userApi.getListConversation();
            resolve(xxx);
        } catch (error) {
            reject(error);
        }
    })
})
export const refreshFriendsAll = createAsyncThunk("refresh_friends_all", () => {
    return new Promise<DataResponseGetFriends>(async (resolve, reject) => {
        try {
            const xxx = userApi.getListFriendAll();
            resolve(xxx);
        } catch (error) {
            reject(error);
        }
    })
})
export const createGroupChat = createAsyncThunk("create_group_chat", (params: IGroup) => {
    return new Promise<IConversation>(async (resolve, reject) => {
        try {
            const group = await groupApi.createGroup(params);
            resolve(group)
        } catch (error) {
            reject("failed")
        }
    })
})
export const addMemberToGroup = createAsyncThunk("add_member_to_group", (params: { participants: Array<string>, conversationId: string }) => {
    return new Promise<[IConversation, string]>(async (resolve, reject) => {
        try {
            const conversation = await groupApi.addMemberToGroup(params)
            resolve(conversation)
        } catch (error) {
            reject("Add failed")
        }
    })
})
const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    numberPhone: '',
    dateOfBirth: {
        date: 15,
        month: 2,
        year: 2008,
    },
    gender: '',
    username: '',
    imgUrl: '',
    conversations: [],
    choosenFriend: {
        conversationId: '',
    },
    loading: false,
    friends: [],
    friendsPending: [],
    friendsRejected: [],
    friendsRequested: [],
    temp: "",
    notifications: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateId: (state, action) => {
            const { payload } = action;
            state._id = payload;
        },
        handleSetOnline: (state: UserState, action: PayloadAction<{ id: string, check: boolean }>) => {
            state.friends.filter(friend => {
                if (friend._id === action.payload.id) {
                    friend.isOnline = action.payload.check;
                }
                return [];
            })
        },
        handleChooseFriend: (
            state: UserState,
            action: PayloadAction<{
                conversationId: string;
            }>
        ) => {
            console.log(action.payload.conversationId);
            return {
                ...state,
                choosenFriend: action.payload,
            };
        },
        handleUpdateTemp: (state: UserState, action: PayloadAction<string>) => {
            state.temp = action.payload
        },
        makeUnReadMessagesEmpty: (state: UserState, action: PayloadAction<{ conversationId: string }>) => {
            const xxx: Array<IConversation> = JSON.parse(JSON.stringify([...state.conversations!]));
            xxx.forEach((conversation: IConversation) => {
                if (conversation.type === "direct") {
                    if (conversation._id === action.payload.conversationId) {
                        conversation.unreadmessages = []
                    }
                } else if (conversation.type === "group") {
                    if (conversation._id === action.payload.conversationId) {
                        if (conversation.groupUnRead) {
                            const found = conversation.groupUnRead.find(gr => gr.user === state._id)
                            if (found) {
                                found.messages = [];
                            }

                        }
                    }
                }
            })
            state.conversations = xxx;
        },
        updateLatestMessage: (state: UserState, action: PayloadAction<{
            message: IMessage,
            conversationId: string
        }>) => {
            const xxx: Array<IConversation> = JSON.parse(JSON.stringify([...state.conversations!]));
            // console.log(xxx);
            xxx.forEach((conversation: IConversation) => {
                if (conversation._id === action.payload.conversationId) {
                    conversation.latest = action.payload.message;
                }
            })
            state.conversations = xxx;
        },
        updateUnReadGroupMessage: (state: UserState, action: PayloadAction<{
            conversationId: string; message: IMessage;
        }>) => {
            const xxx: Array<IConversation> = JSON.parse(JSON.stringify([...state.conversations!]));
            xxx.forEach((conversation: IConversation) => {
                if (conversation._id === action.payload.conversationId) {
                    const x = conversation.groupUnRead!.find(gr => {
                        return gr.user === state._id
                    })!;
                    if (x && action.payload.conversationId !== state.choosenFriend.conversationId) {
                        x.messages.push(action.payload.message)
                    }
                }
            })
            state.conversations = xxx;
        },
        updateUnReadMessasges: (state: UserState, action: PayloadAction<{ conversationId: string, message: IMessage }>) => {
            const xxx: Array<IConversation> = JSON.parse(JSON.stringify([...state.conversations!]));
            xxx.forEach((conversation: IConversation) => {
                if (conversation._id === action.payload.conversationId && action.payload.conversationId !== state.choosenFriend.conversationId) {
                    conversation.unreadmessages.push(action.payload.message);
                }
            })
            state.conversations = xxx;
        },
        setLoading: (state: UserState) => {
            state.loading = true;
        },
        turnOffLoading: (state: UserState) => {
            state.loading = false;
        },
        setEmptyChoosen: (state: UserState) => {
            state.choosenFriend.conversationId = "";
        },
        addConversation: (state: UserState, action: PayloadAction<IConversation>) => {
            state.conversations!.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            if (action.payload) {
                const { ...data } = action.payload as IUser;
                state._id = data._id;
                state.username = data.username;
                state.name = data.name;
                state.email = data.email;
                state.gender = data.gender;
                state.numberPhone = data.numberPhone;
                state.dateOfBirth = data.dateOfBirth;
                state.conversations = data.conversations;
                state.imgUrl = data.imgUrl;
                state.friends = data.friends!;
                state.friendsPending = data.friendsPending!;
                state.friendsRejected = data.friendsRejected!;
                state.friendsRequested = data.friendsRequested!;
                state.notifications = data.notifications!
            }
            state.loading = false;
        });

        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
            alert("Server is down!");
        });

        builder.addCase(updateInformation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateInformation.fulfilled, (state, action) => {
            state.loading = false;
            const {
                name,
                email,
                gender,
                dateOfBirth,
                numberPhone,
                imgUrl,

            } = action.payload;
            console.log(action.payload);
            state.name = name!;
            state.email = email!;
            state.gender = gender;
            state.dateOfBirth = dateOfBirth!;
            state.numberPhone = numberPhone;
            state.imgUrl = imgUrl!;

        });
        builder.addCase(markSeenNoti.fulfilled, (state, action) => {
            state.notifications.forEach(notification => { if (notification._id === action.payload) notification.seen = true })
        })
        builder.addCase(refreshNoti.fulfilled, (state, action) => {
            state.notifications = action.payload;
        })
        builder.addCase(refreshConversations.fulfilled, (state, action) => {
            state.conversations = action.payload;
        })
        builder.addCase(refreshFriendsAll.fulfilled, (state, action) => {
            state.friends = action.payload.friends;
            state.friendsPending = action.payload.friendsPending;
            state.friendsRequested = action.payload.friendsRequested;
            state.friendsRejected = action.payload.friendsRejected
        })
        builder.addCase(createGroupChat.fulfilled, (state, action) => {
            state.conversations!.push(action.payload);
        })
    },
});

export const { updateId, handleChooseFriend, updateLatestMessage, updateUnReadMessasges, updateUnReadGroupMessage, makeUnReadMessagesEmpty, handleUpdateTemp, handleSetOnline, turnOffLoading, setLoading, setEmptyChoosen, addConversation } = userSlice.actions;
export default userSlice.reducer;
