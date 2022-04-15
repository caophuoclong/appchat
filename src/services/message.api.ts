import IMessage from "../interface/IMessage";
import axiosClient from "./axiosClient";
const messageApi = {
    addMessage: (message: IMessage, conversationId: string) => {
        const url = "/message/add/" + conversationId;
        return new Promise<string>(async (resolve, reject) => {
            try {
                const result = await axiosClient.post(url, {
                    ...message
                })
                resolve("Done");
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default messageApi;