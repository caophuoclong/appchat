import IMessage from "../interface/IMessage";
import axiosClient from "./axiosClient";

const conversationApi = {
    getConversation: (id: string, page: number) => {
        const url = "/conversation/" + id;
        return new Promise<{
            page: number,
            isMore: boolean,
            messageList: Array<IMessage>,
            conversationId: string
        }>(async (resolve, reject) => {
            try {
                const conversation = await axiosClient.get(url, {
                    params: {
                        page
                    }
                });
                const messages: Array<IMessage> = conversation.data.conversation.messages;
                const pageResult = conversation.data.conversation.page;
                const isMore = conversation.data.conversation.isMore;
                resolve({
                    page: pageResult,
                    isMore,
                    messageList: messages,
                    conversationId: id
                });
            } catch (error) {
                console.log(error);
                reject(new Error("Some thing wrong"))
            }
        })
    },
    makeUnReadMessagesEmpty: (id: string) => {
        const url = "/conversation/" + id;
        return new Promise(async () => {
            await axiosClient.put(url);
        })
    }
};

export default conversationApi;
