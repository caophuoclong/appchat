import * as React from 'react';
import { useAppSelector } from '../../../../../hook';
import { Message } from './Message';
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom"
export interface IMessageListProps {
    className: string;
}

export function MessageList (props: IMessageListProps) {
  const messages = useAppSelector(state => state.messages.messages);
  return (
    <ScrollToBottom initialScrollBehavior="smooth" id="messagesList" className={props.className}>
      {
        messages.map((message,index)=> <Message key={index} message={message}/>)
      }
    </ScrollToBottom>
  );
}
