import { AxiosResponse } from "axios";
import Exception from "../exceptions";
import IUser, { IConversation, IGetMeResponse } from "../interface/IUser";
import axiosClient from "./axiosClient";

const userApi = {
    login: async (username: string, password: string) => {
        const url = "/user/signin";
        const user: {
            code: number, status: string, message: string,
            data: {
                accessToken: string,
                refreshToken: string,
            }
        } = await axiosClient.post(url, {
            username: username,
            password: password,
        })
        return user;
    },
    register: (username: string, password: string, email: string) => {
        return new Promise<{
            code: number,
            status: string | number,
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
        return new Promise<IUser>(async (resolve, reject) => {
            const url = "/user/me";
            try {
                const user: IGetMeResponse = await axiosClient.get(url);
                if (user.code === 200) {
                    resolve(user.data);
                }
                if (user.code === 400 && user.message === "Token expired!") {
                    userApi.refreshToken().then(() => {
                        reject(new Exception(400, "Done"));
                    });
                }

            } catch (error: any) {
                reject(new Exception(500, error.message))
            }
        })
    },
    getListConversation: () => {
        return new Promise<Array<IConversation>>(async (resolve, reject) => {
            try {
                const url = "/user/conversations"
                const res = await axiosClient.get(url) as {
                    code: number,
                    data: Array<IConversation>
                };
                if (res.code === 200) {
                    resolve(res.data);
                } else {
                    reject("Error");
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    getListFriendAll: () => {
        return new Promise<{
            friends: Array<string>,
            friendsPending: Array<string>,
            friendsRejected: Array<string>,
            friendsRequested: Array<string>,
        }>(async (resolve, reject) => {
            try {
                const url = "/user/friendsall"
                const res = await axiosClient.get(url) as {
                    code: number,
                    data: {
                        friends: Array<string>,
                        friendsPending: Array<string>,
                        friendsRejected: Array<string>,
                        friendsRequested: Array<string>,
                    }
                };
                if (res.code === 200) {
                    resolve(res.data);
                } else {
                    reject("Error");
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    refreshToken: () => {
        return new Promise<{}>(async (resolve, reject) => {
            const url = "/token/refresh"
            const token: {
                code: number,
                status: string,
                message: string,
                token: string,
            } = await axiosClient.post(url, {
                refreshToken: JSON.parse(localStorage.getItem("refresh_token")!)
            })
            if (token.code === 200) {
                localStorage.setItem("access_token", JSON.stringify(token.token))
                resolve({});
            } else {
                console.log(token);
                alert("Session expired! Please login again");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.reload();
            }
        })
    },
    updateUserInfomation: (data: Partial<IUser>) => {
        return new Promise<{ code: number, status: string, message: string, data: IUser }>(async (resolve, reject) => {
            const url = "/user/update";
            try {
                const user: { code: number, status: string, message: string, data: IUser } = await axiosClient.put(url, {
                    ...data
                });
                console.log(user);
                resolve(user);

            } catch (error) {
                reject(new Error("Some thing wrong"))
            }
        })
    }
}
export default userApi;