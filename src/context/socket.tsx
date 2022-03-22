import React from "react";
import { io, Socket } from "socket.io-client";
import {SOCKET_HOST} from "../configs/"
import { useAppDispatch, useAppSelector } from "../hook";
import { handleSetSocketId } from "../reducers/globalSlice";
import IMessage from "../interface/IMessage"
import { updateLatestMessage } from "../reducers/userSlice";
import { addNewMessage } from "../reducers/message";
export const SocketContext= React.createContext<Socket>({} as Socket);
const Provider = (props: {children: JSX.Element})=>{
    const user = useAppSelector(state =>state.user);
    const [socket, setSocket] = React.useState<Socket>({}as Socket);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        const socket = io(SOCKET_HOST!,{
            "transports" : ["websocket"]
        });
        setSocket(socket);
        socket.on("new_connection",(data=>{
            dispatch(handleSetSocketId(data));
        }))
        socket.on("receive_message",(data: string)=>{
            const {conversationId, message} = JSON.parse(data) as {
                conversationId: string,
                message: IMessage
            }
            dispatch(updateLatestMessage({
                message,
                conversationId
            }))
            dispatch(addNewMessage(message));
        });
        socket.on("check_online", ()=>{

        })
    },[])

    return(
        <SocketContext.Provider value={socket} >
        {
            props.children
        }
        </SocketContext.Provider>
    )
}
export default Provider;