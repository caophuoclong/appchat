import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { participation } from '../../../../interface/IUser';
import { handleChooseFriend, makeUnReadMessagesEmpty } from '../../../../reducers/userSlice';
import IMessage from '../../../../interface/IMessage';
import { SocketContext } from '../../../../context/socket';
import RenderInfoConversation from './RenderInfoConversation';

export interface IFriendProps {
  converstationInfor: {
    _id: string;
    participants: Array<participation>;
    latest?: IMessage | undefined;
    unreadmessages: Array<IMessage>;
    name?: string;
    imgUrl?: string;
    groupUnRead?: Array<{
      user: string;
      messages: Array<IMessage>;
    }>;
  };
}

export function GroupConversation({ converstationInfor }: IFriendProps) {
  const { _id, participants, latest, unreadmessages, groupUnRead } = converstationInfor;
  let unReadLength = 0;
  const lang = useAppSelector((state) => state.global.language);
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const user = useAppSelector((state) => state.user);
  const socket = React.useContext(SocketContext);
  if (groupUnRead) {
    const user1 = groupUnRead.find((group) => group.user === user._id);
    if (user1) {
      unReadLength = user1.messages.length;
    }
  }
  const dispatch = useAppDispatch();
  const handleSelectUser = async () => {
    if (choosenFriend.conversationId !== _id) {
      dispatch(handleChooseFriend({ conversationId: _id }));
      dispatch(makeUnReadMessagesEmpty({ conversationId: _id }));
      socket.emit(
        'choose_conversation',
        JSON.stringify({
          user_id: user._id,
          conversation_id: _id,
        })
      );
    }
  };
  return (
    <div
      className="flex gap-2 my-6 px-2 py-1 hover:bg-gray-200 bg-opacity-25 cursor-pointer z-0"
      onClick={handleSelectUser}
    >
      <RenderInfoConversation
        lang={lang}
        imgUrl={converstationInfor.imgUrl}
        latest={latest}
        _id={_id}
        name={converstationInfor.name!}
        username={''}
        unReadLength={unReadLength}
      />
    </div>
  );
}
