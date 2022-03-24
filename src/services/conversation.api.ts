import { AxiosResponse } from "axios";
import IMessage from "../interface/IMessage";
import message from "../reducers/message";
import axiosClient from "./axiosClient";

const conversationApi = {
    getConversation: (id: string, page: number) => {
        const url = "/conversation/" + id;
        return new Promise<{
            messageList: Array<IMessage>,
            conversationId: string
        }>(async (resolve, reject) => {
            try {
                const conversation = await axiosClient.get(url, {
                    params: {
                        page
                    }
                });
                const messages: Array<IMessage> = conversation.data.messages;
                resolve({
                    messageList: messages,
                    conversationId: id
                });
            } catch (error) {
                console.log(error);
                reject(new Error("Some thing wrong"))
            }
        })
    }
};

export default conversationApi;
