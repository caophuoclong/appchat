import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import IUser, { IConversation, IFriendsAll, INotification, participation } from '../interface/IUser';
import IMessage from "../interface/IMessage";
import userApi, { DataResponseGetFriends } from '../services/user.api';
import notiApi from '../services/notification';
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
        participation: participation;
    } | null;
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
const initialState: UserState = {
    _id: '26032001',
    name: 'Phuoc Long',
    email: 'caophuoclong1@gmail.com',
    numberPhone: '0342200770',
    dateOfBirth: {
        date: 15,
        month: 2,
        year: 2008,
    },
    gender: 'male',
    username: 'caophuoclong1',
    imgUrl: 'https://picsum.photos/40',
    conversations: [
        {
            _id: '',
            participants: [
                {
                    _id: '222',
                    imgUrl: 'https://picsum.photos/40',
                    name: 'longs',
                    username: 'asdfojskl',
                },
            ],
            latest: {
                _id: '',
                text: '',
                senderId: '',
                receiverId: '',
                type: 'text',
                createAt: '',
            },
            unreadmessages: [],
        },
    ],

    choosenFriend: null,
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
        handleSetOnline: (state: UserState, action: PayloadAction<boolean>) => {
            state.choosenFriend!.participation!.isOnline = action.payload;
        },
        handleChooseFriend: (
            state: UserState,
            action: PayloadAction<{
                participation: participation;
                conversationId: string;
            }>
        ) => {
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
                if (conversation._id === action.payload.conversationId) {
                    conversation.unreadmessages = []
                }
            })
            console.log(xxx);
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
        updateUnReadMessasges: (state: UserState, action: PayloadAction<{ conversationId: string, message: IMessage }>) => {
            const xxx: Array<IConversation> = JSON.parse(JSON.stringify([...state.conversations!]));
            xxx.forEach((conversation: IConversation) => {
                if (conversation._id === action.payload.conversationId) {
                    conversation.unreadmessages.push(action.payload.message);
                }
            })
            state.conversations = xxx;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload) {
                const { ...data } = action.payload as IUser;
                console.log(data);
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
            state.name = name;
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
    },
});

export const { updateId, handleChooseFriend, updateLatestMessage, updateUnReadMessasges, makeUnReadMessagesEmpty, handleUpdateTemp, handleSetOnline } = userSlice.actions;
export default userSlice.reducer;
