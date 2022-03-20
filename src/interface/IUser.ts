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
    conversations?: Array<{
        _id: string,
        participants: Array<participation>,
        lastest?: IMessage,
    }>
}
export type participation = Pick<IUser, "_id" | "username" | "name" | "imgUrl">
export default IUser;