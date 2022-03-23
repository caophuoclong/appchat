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
    conversations?: Array<IConversation>,
    friends: Array<string>,
    friendsPending: Array<string>,
    friendsRejected: Array<string>,
    friendsRequested: Array<string>,

}
export interface IConversation {
    _id: string,
    participants: Array<participation>,
    latest?: IMessage,
    unreadmessages: Array<IMessage>,
}
export interface IGetMeResponse {
    code: number,
    status: string,
    message: string,
    data: IUser,
}
export type participation = Pick<IUser, "_id" | "username" | "name" | "imgUrl"> & {
    isOnline?: boolean,
}
export default IUser;