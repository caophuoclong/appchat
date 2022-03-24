import * as React from 'react';
import { ChatHeader } from './Header';
import { InputBox } from './InputBox';
import  MessageList  from './MessageList';
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom"
export interface IChatProps {
    className: string;
}

export function Chat (props: IChatProps) {
  return (
    <div className={props.className}>
      <ChatHeader className="px-9 py-3" />
      <ScrollToBottom  initialScrollBehavior="smooth" id="messagesList" className="h-85 overflow-auto relative">
        <MessageList />
      </ScrollToBottom>
      <InputBox className="px-9 py-5 mt-auto mr-0"/>
    </div>
  );
}
