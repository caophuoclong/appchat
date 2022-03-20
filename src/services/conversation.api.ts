import { AxiosResponse } from "axios";
import IMessage from "../interface/IMessage";
import axiosClient from "./axiosClient";

const conversationApi = {
    getConversation: (id: string) => {
        const url = "/conversation/" + id;
        return new Promise<Array<IMessage>>(async (resolve, reject) => {
            try {
                const conversation = await axiosClient.get(url);
                console.log(conversation.data);
                const messages: Array<IMessage> = conversation.data.messages;
                resolve(messages);
            } catch (error) {
                console.log(error);
                reject(new Error("Some thing wrong"))
            }
        })
    }
};

export default conversationApi;
