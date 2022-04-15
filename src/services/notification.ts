import { INotification } from '../interface/IUser';
import axiosClient from './axiosClient';

const notiApi = {
    markSeenNoti: (_id: string) => {
        return new Promise<string>((resolve, reject) => {
            const url = '/noti/update';
            axiosClient
                .put(
                    url,
                    {},
                    {
                        params: {
                            _id,
                        },
                    }
                )
                .then((res) => {
                    resolve(res.data as string);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    addNotification: ({
        notification,
        _id,
    }: {
        notification: {
            user: string;
            type: string,
        };
        _id: string;
    }) => {
        return new Promise<{
            code: number;
            status: string;
            message: string;
        }>(async (resolve, reject) => {
            const url = '/noti/add';
            try {
                const res = (await axiosClient.post(url, {
                    notification,
                    _id,
                })) as {
                    code: number;
                    status: string;
                    message: string;
                };
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    },
    getNotification: () => {
        return new Promise<Array<INotification>>(async (resolve, reject) => {
            const url = '/noti/';
            try {
                const res = await axiosClient.get(url) as {
                    code: number,
                    data: Array<INotification>
                };
                if (res.code === 200) {
                    resolve(res.data);
                } else {
                    reject([])
                }
            } catch (error) {
                reject("Error");
            }
        })
    }
};
export default notiApi;
