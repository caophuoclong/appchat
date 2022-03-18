import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriend } from "../interface/IFriend";

export type dateType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
interface UserState {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    email: string,
    numberPhone: string;

    dateOfBirth: {
        date: number,
        month: number,
        year: number,
    };
    gender: "male" | "female" | "other",
    listFriend: Array<IFriend>;
    choosenFriend: IFriend | null;
}

const initialState: UserState = {
    id: "26032001",
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
    listFriend: [
        {
            id: "27831",
            name: "caophuoclong",
            username: "caophuoclong",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
        {
            id: "2312",
            name: "Man Muoi",
            username: "manman",
            imgUrl: "https://picsum.photos/40"
        },
    ],
    choosenFriend: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateId: (state, action) => {
            const { payload } = action;
            state.id = payload;
        },
        handleChooseFriend: (state: UserState, action: PayloadAction<IFriend>) => {
            return {
                ...state,
                choosenFriend: action.payload
            }
        }

    }

})

export const { updateId, handleChooseFriend } = userSlice.actions;
export default userSlice.reducer;