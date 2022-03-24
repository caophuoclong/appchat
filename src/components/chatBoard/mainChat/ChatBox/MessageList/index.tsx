import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { Message } from './Message';
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../../../../context/socket';
import { makeUnReadMessagesEmpty } from '../../../../../reducers/userSlice';
export interface IMessageListProps {
}

export default function MessageList (props: IMessageListProps) {
  const messages = useAppSelector(state => state.messages.messagesList);
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
  socket.on("reply_typing", (data: {
    isTyping: boolean,
    conversationId: string,
  })=>{
    
    if(data.conversationId === user.choosenFriend!.conversationId){
      setIsTyping(data.isTyping);
    }else{
      setIsTyping(false);
    }
  })
  },[socket, user.choosenFriend])
  return (
      <>
      {
        loading && <FullPageLoading/>
      }
      {
        messages[user.choosenFriend?.conversationId!] ? messages[user.choosenFriend?.conversationId!].map((message,index)=> <Message key={index} message={message}/>) : <div>{"123"}</div>
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
      </>
  );
}
