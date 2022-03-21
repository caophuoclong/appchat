import IMessage from "./IMessage"
interface IUser {
    _id: string,
    username: string,
    name?: string,
    email: string,
    numberPhone?: string,
    gender?: string,
    imgUrl: string,
    dateOfBirth: {
        date: number,
        month: number,
        year: number,
    },
    conversations?: Array<IConversation>
}
export interface IConversation {
    _id: string,
    participants: Array<participation>,
    latest?: IMessage,
}
export interface IGetMeResponse {
    code: number,
    status: string,
    message: string,
    data: IUser,
}
export type participation = Pick<IUser, "_id" | "username" | "name" | "imgUrl">
export default IUser;