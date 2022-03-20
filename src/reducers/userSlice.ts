import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import IUser, { participation } from "../interface/IUser";
import userApi from "../services/user.api";
export type dateType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
interface UserState extends IUser {
    choosenFriend: {
        conversationId: string,
        participation: participation
    } | null;
}
export const getMe = createAsyncThunk("get_me", async () => {
    try {
        const xxx = await userApi.getMe();
        return xxx;
    } catch (error) {
        console.log("12312312");
        console.log(error);
    }
})

const initialState: UserState = {
    _id: "26032001",
    name: "Phuoc Long",
    email: "caophuoclong1@gmail.com",
    numberPhone: "0342200770",
    dateOfBirth: {
        date: 15,
        month: 2,
        year: 2008
    },
    gender: "male",
    username: "caophuoclong1",
    imgUrl: "https://picsum.photos/40",
    conversations: [
        {
            _id: "",
            participants: [
                {
                    _id: "222",
                    imgUrl: "https://picsum.photos/40",
                    name: "longs",
                    username: "asdfojskl",
                }
            ],
            lastest: {
                _id: "",
                text: "",
                senderId: "",
                receiverId: "",
                type: "text",
                createAt: "",
            }
        }

    ],
    choosenFriend: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateId: (state, action) => {
            const { payload } = action;
            state._id = payload;
        },
        handleChooseFriend: (state: UserState, action: PayloadAction<{ participation: participation, conversationId: string }>) => {
            return {
                ...state,
                choosenFriend: action.payload
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getMe.fulfilled, (state, action) => {
            if (action.payload) {
                const { data } = action.payload;
                state._id = data._id;
                state.name = data.name;
                state.email = data.email;
                state.gender = data.gender;
                state.numberPhone = data.numberPhone;
                state.dateOfBirth = data.dateOfBirth;
                state.conversations = data.conversations;
            }
        })
    }

})

export const { updateId, handleChooseFriend } = userSlice.actions;
export default userSlice.reducer;