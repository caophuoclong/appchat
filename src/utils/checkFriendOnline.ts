import { Socket } from "socket.io-client";
import { participation } from "../interface/IUser";

const checkOnlineInGroup = (socket: Socket, userId: string, participants: Array<participation>) => {
    participants.filter(participant => participant._id !== userId).forEach(id => {
        socket.emit("check_online", id);
    })
}

const checkFriendOnline = (socket: Socket, id: string) => {
    socket.emit("check_online", id);
}

export { checkFriendOnline, checkOnlineInGroup };