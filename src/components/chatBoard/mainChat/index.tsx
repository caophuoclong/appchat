import * as React from 'react';
import { useAppSelector } from '../../../hook';
import { Chat } from './ChatBox';
import { Greeting } from './Greeting';

export interface IMainChatProps {}

export function MainChat(props: IMainChatProps) {
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  return (
    <div className="w-5/6 h-full">
      {choosenFriend ? (
        <Chat className="flex flex-col h-full" />
      ) : (
        <Greeting className="w-1/2 my-80 mx-32 " />
      )}
    </div>
  );
}
