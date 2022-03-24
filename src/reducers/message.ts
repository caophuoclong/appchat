import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import IMessage from '../interface/IMessage';
import conversationApi from '../services/conversation.api';
import messageApi from '../services/message.api';

interface MessageState {
    messagesList: {
        [key: string]: Array<IMessage>
    };
    loading: boolean;
}
export const getConversation = createAsyncThunk(
    'getMessages',
    async ({ id, page }: { id: string, page: number }) => {
        return await conversationApi.getConversation(id, page);
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
    messagesList: {},
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
            action: PayloadAction<{ message: IMessage, conversationId: string }>
        ) => {
            const data = action.payload;
            return {
                ...state,
                messagesList: {
                    ...state.messagesList,
                    [data.conversationId]: [
                        ...state.messagesList[data.conversationId],
                        data.message,
                    ],
                },
            }
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
                messagesList: {
                    ...state.messagesList,
                    [action.payload.conversationId]: action.payload.messageList,
                }
            };
        });
        builder.addCase(getConversation.rejected, (state, action) => {
            state.loading = false;
        })
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
