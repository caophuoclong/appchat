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
        [key: string]: {
            messages: Array<IMessage>,
            page: number,
            isMore: boolean,
        }
    };
    loading: boolean;
}
export const getMessages = createAsyncThunk(
    'getMessages',
    async ({ id, page }: { id: string, page: number }) => {
        return await conversationApi.getMessages(id, page);
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
    messagesList: {

    },
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
                    [data.conversationId]: {
                        ...state.messagesList[data.conversationId],
                        messages: [
                            ...state.messagesList[data.conversationId].messages,
                            data.message,
                        ]
                    },
                },
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            if (state.messagesList[action.payload.conversationId]) {
                console.log(action.payload);
                return {
                    ...state,
                    loading: false,
                    messagesList: {
                        ...state.messagesList,
                        [action.payload.conversationId]: {
                            messages: [
                                ...action.payload.messageList.reverse(),
                                ...state.messagesList[action.payload.conversationId].messages
                            ],
                            page: action.payload.page,
                            isMore: action.payload.isMore,
                        },
                    }
                };

            } else {
                return {
                    ...state,
                    loading: false,
                    messagesList: {
                        ...state.messagesList,
                        [action.payload.conversationId]: {
                            messages:
                                [...action.payload.messageList.reverse()]
                            ,
                            page: action.payload.page,
                            isMore: action.payload.isMore,
                        },
                    }
                };

            }
        });
        builder.addCase(getMessages.rejected, (state, action) => {
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
