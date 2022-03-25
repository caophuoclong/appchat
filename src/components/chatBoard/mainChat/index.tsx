import { unwrapResult } from '@reduxjs/toolkit';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { getConversation } from '../../../reducers/message';
import { Chat } from './ChatBox';
import { Greeting } from './Greeting';

export interface IMainChatProps {}

export function MainChat(props: IMainChatProps) {
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  return (
    <div className="w-5/6 h-full flex items-center">
      {choosenFriend.conversationId !== "" ? (
        <Chat className="flex flex-col h-full w-full" />
      ) : (
        <Greeting className="w-1/2 mx-32" />
      )}
    </div>
  );
}
