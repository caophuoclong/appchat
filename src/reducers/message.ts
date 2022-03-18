import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import IMessage from "../interface/IMessage";

interface MessageState {
    messages: Array<IMessage>
}

const initialState: MessageState = {
    messages: [
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            date: 2015,
            receiverId: "26032001",
            receiverUsername: "caophuoclong1",
            senderId: "27831",
            senderUsername: "caophuoclong",
            type: "text"
        },
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            date: 2015,
            receiverId: "26032001",
            receiverUsername: "caophuoclong1",
            senderId: "27831",
            senderUsername: "caophuoclong",
            type: "text"
        },
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            date: 2015,
            receiverId: "26032001",
            receiverUsername: "caophuoclong1",
            senderId: "27831",
            senderUsername: "caophuoclong",
            type: "text"
        },
        {
            text: "xin chao ban",
            date: 2015,
            receiverId: "27831",
            receiverUsername: "caophuoclong",
            senderId: "26032001",
            senderUsername: "caophuoclong1",
            type: "text"
        },
    ]
}

const messageSlice = createSlice({
    name: "Message Slice",
    initialState,
    reducers: {
        initMessage: (state: MessageState, action: PayloadAction<Array<IMessage>>) => {
            return {
                ...state,
                messages: action.payload,
            }
        },
        addNewMessage: (state: MessageState, action: PayloadAction<IMessage>) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
    }
})

export const { initMessage, addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;