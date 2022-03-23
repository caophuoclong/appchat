import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { Message } from './Message';
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom"
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../../../../context/socket';
import { makeUnReadMessagesEmpty } from '../../../../../reducers/userSlice';
export interface IMessageListProps {
    className: string;
}

export function MessageList (props: IMessageListProps) {
  const messages = useAppSelector(state => state.messages.messages);
  const loading = useAppSelector(state => state.messages.loading);
  const user = useAppSelector(state => state.user);
  const [isTyping, setIsTyping] = React.useState(false);
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.global.language);
  const socket = React.useContext(SocketContext);
  React.useEffect(()=>{
    if(user.temp === user.choosenFriend?.conversationId){
      dispatch(makeUnReadMessagesEmpty({conversationId: user.choosenFriend?.conversationId}));
    }
  },[messages])
  React.useEffect(()=>{
    socket.on("reply_typing", (data: boolean)=>{
      console.log(data);
      setIsTyping(data);
    })
  },[socket])
  
  return (
    <ScrollToBottom initialScrollBehavior="smooth" id="messagesList" className={props.className}>
      {
        loading && <FullPageLoading/>
      }
      {
        messages.map((message,index)=> <Message key={index} message={message}/>)
      }
      {isTyping&&<div className="absolute bottom-0 bg-white border boder-gray-300 px-2 rounded-lg flex gap-2 w-80 items-center text-md">
      {<span className="w-1/3 truncate">{user.choosenFriend?.participation.name}</span>}
        {
        lang === "en" ? 
        ` is typing`
        : ` đang soạn tin nhắn`
      }
      <div className="loading"></div>
      
      </div>}
    </ScrollToBottom>
  );
}
