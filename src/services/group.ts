import IGroup from "../interface/IGroup";
import axiosClient from "./axiosClient";

const groupApi = {
    createGroup: (params: IGroup) => {
        return new Promise<string>(async (resolve, reject) => {
            try {

                const response: { code: number, status: string, message: string } = await axiosClient.post("/group/create", {
                    name: params.name,
                    participants: params.participants
                })
                if (response.code === 200) {
                    resolve("Create successfully!");
                } else {
                    resolve("Create failed")
                }
            } catch (error) {
                reject("failed")
            }
        })

    }
}

export default groupApi;