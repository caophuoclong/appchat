import * as React from 'react';
import { ChatHeader } from './Header';
import { InputBox } from './InputBox';
import { MessageList } from './MessageList';

export interface IChatProps {
    className: string;
}

export function Chat (props: IChatProps) {
  return (
    <div className={props.className}>
      <ChatHeader className="px-9 py-3" />
      <MessageList className="h-85"/>
      <InputBox className="px-9 py-5 mt-auto mr-0"/>
    </div>
  );
}
