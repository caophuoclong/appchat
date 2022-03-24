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
    friends: Array<IFriendsAll>,
    friendsPending: Array<IFriendsAll>,
    friendsRejected: Array<IFriendsAll>,
    friendsRequested: Array<IFriendsAll>,
    notifications: Array<INotification>

}
export interface IFriendsAll {
    _id: string,
    username: string,
    name?: string,
    imgUrl: string,
}
export interface INotification {
    _id: string,
    user: {
        name: string,
        imgUrl: string,
        username: string,
    },
    type: string,
    date: Date
    seen: boolean
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