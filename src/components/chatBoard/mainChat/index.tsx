import { unwrapResult } from '@reduxjs/toolkit';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { getConversation } from '../../../reducers/message';
import { Chat } from './ChatBox';
import { Greeting } from './Greeting';

export interface IMainChatProps {}

export function MainChat(props: IMainChatProps) {
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const dispatch = useAppDispatch();
  React.useEffect(()=>{
    const xxx = async ()=>{
      try{
        if(choosenFriend){
        const actionResult = await dispatch(getConversation(choosenFriend?.conversationId!));
        const unwrap = unwrapResult(actionResult);
      }
      }catch(error){
        console.log(error);
      }
    }
    xxx();
  },[choosenFriend])
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
