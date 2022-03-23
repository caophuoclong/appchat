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
  const dispatch = useAppDispatch();
  React.useEffect(()=>{
    if(user.temp === user.choosenFriend?.conversationId){
      dispatch(makeUnReadMessagesEmpty({conversationId: user.choosenFriend?.conversationId}));
    }
  },[messages])

  return (
    <ScrollToBottom initialScrollBehavior="smooth" id="messagesList" className={props.className}>
      {
        loading && <FullPageLoading/>
      }
      {
        messages.map((message,index)=> <Message key={index} message={message}/>)
      }
    </ScrollToBottom>
  );
}
