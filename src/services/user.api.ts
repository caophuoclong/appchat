import { AxiosResponse } from "axios";
import IUser from "../interface/IUser";
import axiosClient from "./axiosClient";

const userApi = {
    login: async (username: string, password: string) => {
        const url = "/user/signin";
        const user = await axiosClient.post(url, {
            username: username,
            password: password,
        })
        return user as AxiosResponse<{
            accessToken: string,
        }>;
    },
    register: (username: string, password: string, email: string) => {
        return new Promise<{
            code: number,
            status: string,
            message: string,
        }>(async (resolve, reject) => {
            const url = "/user/signup";
            try {
                const user = await axiosClient.post(url, {
                    username: username,
                    password: password,
                    email: email,
                }) as {
                    code: number,
                    status: string,
                    message: string,
                }
                resolve(user);
            } catch (error) {
                reject(error);
            }

        })

    },
    getMe: () => {
        return new Promise<AxiosResponse<IUser>>(async (resolve, reject) => {
            const url = "/user/me";
            try {
                const user = await axiosClient.get(url);
                resolve(user);

            } catch (error) {
                reject(new Error("Some thing wrong"))
            }
        })
    },
    updateUserInfomation: (data: IUser) => {
        return new Promise<AxiosResponse<IUser>>(async (resolve, reject) => {
            const url = "/user/update";
            try {
                const user = await axiosClient.post(url, {
                    ...data
                });
                resolve(user);

            } catch (error) {
                reject(new Error("Some thing wrong"))
            }
        })
    }
}
export default userApi;