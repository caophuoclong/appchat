import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import IMessage from '../interface/IMessage';
import conversationApi from '../services/conversation.api';
import messageApi from '../services/message.api';

interface MessageState {
    messages: Array<IMessage>;
    loading: boolean;
}
export const getConversation = createAsyncThunk(
    'getMessages',
    async (id: string) => {
        return await conversationApi.getConversation(id);
    }
);
export const addMessage = createAsyncThunk(
    'addMessage',
    async (params: { message: IMessage; conversationId: string }) => {
        return new Promise<string>((resolve, reject) => {
            messageApi
                .addMessage(params.message, params.conversationId)
                .then(() => {
                    resolve('Done');
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
);

const initialState: MessageState = {
    messages: [],
    loading: false,
};

const messageSlice = createSlice({
    name: 'Message Slice',
    initialState,
    reducers: {
        initMessage: (
            state: MessageState,
            action: PayloadAction<Array<IMessage>>
        ) => {
            return {
                ...state,
                messages: action.payload,
            };
        },
        addNewMessage: (
            state: MessageState,
            action: PayloadAction<IMessage>
        ) => {
            const data = action.payload;

            return {
                ...state,
                messages: [...state.messages, data],
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getConversation.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getConversation.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                messages: action.payload,
            };
        });
        builder.addCase(addMessage.pending, (state, action) => {
            console.log("Pending");
        });
        builder.addCase(addMessage.fulfilled, (state, action) => {
            console.log("Sent");
        });
        builder.addCase(addMessage.rejected, (state, action) => {
            console.log("Rejected");
        });
    },
});

export const { initMessage, addNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
