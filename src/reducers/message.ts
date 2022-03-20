import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import IMessage from "../interface/IMessage";
import conversationApi from "../services/conversation.api";

interface MessageState {
    messages: Array<IMessage>
}
export const getConversation = createAsyncThunk(
    "getMessages", async (id: string) => {
        return await conversationApi.getConversation(id);
    }
)

const initialState: MessageState = {
    messages: [
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            receiverId: "26032001",
            senderId: "27831",
            type: "text"
        },
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            receiverId: "26032001",
            senderId: "27831",
            type: "text"
        },
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            receiverId: "27831",
            senderId: "26032001",
            type: "text"
        },
        {
            text: "xin chao ban 2 chxin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch xin chao ban 2 ch  ",
            receiverId: "26032001",
            senderId: "27831",
            type: "text"
        },
        {
            text: "xin chao ban",
            receiverId: "27831",
            senderId: "26032001",
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
    },
    extraReducers: (builder) => {
        builder.addCase(getConversation.fulfilled, (state, action) => {
            return {
                ...state,
                messages: action.payload
            }
        })
    }
})

export const { initMessage, addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;