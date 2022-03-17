import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFriend } from "../interface/IFriend";

interface UserState {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    listFriend: Array<IFriend>;
    choosenFriend: IFriend | null;
}

const initialState: UserState = {
    id: "26032001",
    name: "Phuoc Long",
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