import React from "react";
import { io } from "socket.io-client";
import {SOCKET_HOST} from "../configs/"
import { useAppSelector } from "../hook";
const SocketContext= React.createContext({});
const Provider = (props: {children: JSX.Element})=>{
    const user = useAppSelector(state =>state.user);
    const socket = io(SOCKET_HOST!,{
        "transports" : ["websocket"]
    });
    socket.on("new_connection",(data=>{
        socket.emit("init_user",{id:user._id});
    }))
    socket.on("receive_message",({_id}:{_id: string, message: string})=>{

    })

    return(
        <SocketContext.Provider value={socket} >
        {
            props.children
        }
        </SocketContext.Provider>
    )
}
export default Provider;