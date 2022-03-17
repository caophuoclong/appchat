import * as React from 'react';
import { useAppSelector } from '../../../../../hook';
import { Message } from './Message';

export interface IMessageListProps {
    className: string;
}

export function MessageList (props: IMessageListProps) {
  const messages = useAppSelector(state => state.messages.messages);
  const messageListRef = React.useRef<HTMLDivElement>(null);
  console.log(messageListRef.current);
  const scrollToBottom = ()=>{
    if(messageListRef.current){
    const scrollHeight = messageListRef.current.scrollHeight;
    messageListRef.current.scrollTo(0, scrollHeight);
    }
  }
  
  React.useEffect(()=>{
    scrollToBottom();
  },[messages])
  return (
    <div id="messagesList" ref={messageListRef} className={props.className}>
      {
        messages.map((message,index)=> <Message key={index} message={message}/>)
      }
    </div>
  );
}
