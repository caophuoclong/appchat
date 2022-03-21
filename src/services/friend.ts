import { number } from "yup/lib/locale";
import Exception from "../exceptions";
import IUser from "../interface/IUser";
import axiosClient from "./axiosClient";

const friendApi = {
    searchFriend: ({ type, value }: { type: string, value: string }) => {
        return new Promise<Array<Pick<IUser, "_id" | "name" | "username" | "imgUrl">>>(async (resolve, reject) => {
            try {
                const url = "/user/search";

                const user: {
                    code: number,
                    status: string,
                    message: string,
                    data: Pick<IUser, "_id" | "name" | "username" | "imgUrl">[]
                } = await axiosClient.get(url, {
                    params: { type, value }
                })
                if (user.code === 200) {
                    resolve(user.data);
                } else {
                    reject(new Exception(404, "Cannot find user with " + type))
                }
            } catch (error) {
                throw error;
            }
        })
    },
    sendFriendRequest: (id: string) => {
        return new Promise<{ code: number, status: string, message: string }>(async (resolve, reject) => {
            const url = "/user/addfriend"
            const response: { code: number, status: string, message: string } = await axiosClient.put(url, {
                _id: id
            })
            if (response.code === 200) {
                resolve(response)
            } else {
                reject(response);
            }

        })

    }
}
export default friendApi;