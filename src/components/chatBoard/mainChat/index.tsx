import { unwrapResult } from '@reduxjs/toolkit';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { getConversation } from '../../../reducers/message';
import { Chat } from './ChatBox';
import { Greeting } from './Greeting';

export interface IMainChatProps {}

export function MainChat(props: IMainChatProps) {
  const choosenFriend = useAppSelector(
    (state) => state.user.choosenFriend
  );
  const mainBoardRef = React.useRef<HTMLDivElement>(null);
  const mainBoardReponsive = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      if (choosenFriend.conversationId === '') {
        mainBoardRef.current?.classList.add('hidden');
      } else {
        mainBoardRef.current?.classList.remove('hidden');
      }
    } else {
      mainBoardRef.current?.classList.remove('hidden');
    }
  };
  React.useEffect(() => {
    mainBoardReponsive();
  }, [choosenFriend]);
  window.addEventListener('resize', mainBoardReponsive);
  return (
    <div
      ref={mainBoardRef}
      className="lg:w-5/6 w-full h-full flex items-center"
    >
      {choosenFriend.conversationId !== '' ? (
        <Chat className="flex flex-col h-full w-full" />
      ) : (
        <Greeting className="w-1/2 mx-32 hidden lg:block" />
      )}
    </div>
  );
}
