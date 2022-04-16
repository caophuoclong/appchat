import IGroup from "../interface/IGroup";
import { IConversation } from "../interface/IUser";
import axiosClient from "./axiosClient";

const groupApi = {
    createGroup: (params: IGroup) => {
        return new Promise<IConversation>(async (resolve, reject) => {
            try {
                const response: { code: number, status: string, message: string, data: IConversation } = await axiosClient.post("/group/create", {
                    name: params.name,
                    participants: params.participants,
                    avatar: params.avatar
                })
                if (response.code === 200) {
                    resolve(response.data);
                } else {
                    reject("Create failed")
                }
            } catch (error) {
                reject("failed")
            }
        })
    },
    getGroupConversation: (params: { id: string }) => {
        return new Promise<IConversation>(async (resolve, reject) => {
            try {
                const response: { code: number, status: string, message: string, data: IConversation } = await axiosClient.get(`/group/get/${params.id}`,)
                if (response.code === 200) {
                    resolve(response.data);
                } else {
                    reject("Create failed")
                }
            } catch (error) {
                reject("failed")
            }
        })
    },
    addMemberToGroup: (params: {
        participants: Array<string>,
        conversationId: string
    }) => {
        console.log(params);
        return new Promise<[IConversation, string]>(async (resolve, reject) => {
            try {
                const response: { code: number, status: string, message: string, data: [IConversation, string] } = await axiosClient.put(`/group/add`, {
                    _idConversation: params.conversationId,
                    _id: params.participants
                })
                if (response.code === 200) {
                    resolve(response.data);
                } else {
                    reject("Create failed")
                }
            } catch (error) {
                reject("failed")
            }
        })

    }
}

export default groupApi;