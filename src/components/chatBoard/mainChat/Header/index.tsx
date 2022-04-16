import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { IConversation } from '../../../../interface/IUser';
import { setHideGroupDetail } from '../../../../reducers/globalSlice';
import { setEmptyChoosen } from '../../../../reducers/userSlice';
import Render from './Render';

export interface IChatHeaderProps {
  className: string;
}

export function ChatHeader(props: IChatHeaderProps) {
  const conversationId = useAppSelector((state) => state.user.choosenFriend.conversationId);
  const conversations = useAppSelector((state) => state.user.conversations);
  const dispatch = useAppDispatch();
  const onBack = () => {
    dispatch(setHideGroupDetail());
    dispatch(setEmptyChoosen());
  };

  const conversation1 = useAppSelector((state) => state.global.conversation);
  const conversation2 = conversations!.find((conversation) => conversation._id === conversationId)!;
  let conversation;
  conversation = Object.keys(conversation1).length !== 0 ? conversation1 : conversation2;
  return (
    <div
      className={props.className}
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex gap-2">
        <div
          onClick={onBack}
          className="text-3xl text-gray-700 font-bold lg:hidden block cursor-pointer"
        >
          &lt;
        </div>
        <Render type={conversation.type} conversation={conversation} />
      </div>
    </div>
  );
}
