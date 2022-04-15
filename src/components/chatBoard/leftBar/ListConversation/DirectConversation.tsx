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
  };
  unReadLength: number;
}

export function DirectConversation({ converstationInfor, unReadLength }: IFriendProps) {
  const { _id, participants, latest, unreadmessages } = converstationInfor;
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const lang = useAppSelector((state) => state.global.language);
  const user = useAppSelector((state) => state.user);
  const socket = React.useContext(SocketContext);
  const [participation, setParticipation] = React.useState<participation>({} as participation);
  React.useEffect(() => {
    const participation1 = participants.filter((value) => value._id !== user._id)[0];
    setParticipation({
      ...participation1!,
      isOnline: false,
    });
  }, [user]);
  const dispatch = useAppDispatch();
  const handleSelectUser = async () => {
    if (choosenFriend.conversationId !== _id) {
      if (participation) {
        dispatch(handleChooseFriend({ conversationId: _id }));
        dispatch(makeUnReadMessagesEmpty({ conversationId: _id }));
        socket.emit(
          'choose_conversation',
          JSON.stringify({
            user_id: user._id,
            conversation_id: _id,
          })
        );
        socket.emit('check_online', participation._id);
      }
    }
  };

  return (
    <div
      className="flex gap-2 my-6 px-2 py-1 hover:bg-gray-200 bg-opacity-25 cursor-pointer z-0"
      onClick={handleSelectUser}
    >
      <RenderInfoConversation
        lang={lang}
        imgUrl={participation?.imgUrl}
        latest={latest}
        _id={_id}
        name={participation.name}
        username={participation.username}
        unReadLength={unReadLength}
      />
    </div>
  );
}
