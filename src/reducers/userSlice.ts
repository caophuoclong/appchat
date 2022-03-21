import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import IUser, { IConversation, participation } from '../interface/IUser';
import IMessage from "../interface/IMessage";
import userApi from '../services/user.api';
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
}
export const getMe = createAsyncThunk(
    'get_me',
    (params, thunkApi) => {
        return new Promise<IUser>(async (resolve, reject) => {
            try {
                const xxx = await userApi.getMe();
                resolve(xxx);
            } catch (error) {
                if (error === 'Done') thunkApi.dispatch(getMe());
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
        },
    ],
    choosenFriend: null,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateId: (state, action) => {
            const { payload } = action;
            state._id = payload;
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state, action) => {
            state.loading = true;
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
            }
            state.loading = false;
        });

        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
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
    },
});

export const { updateId, handleChooseFriend, updateLatestMessage } = userSlice.actions;
export default userSlice.reducer;
