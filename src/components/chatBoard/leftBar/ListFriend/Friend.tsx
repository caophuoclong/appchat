import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { participation } from '../../../../interface/IUser';
import {
  handleChooseFriend,
  makeUnReadMessagesEmpty,
} from '../../../../reducers/userSlice';
import IMessage from '../../../../interface/IMessage';
import { formatDate } from '../../mainChat/ChatBox/MessageList/Message';
import { ImFilePicture } from 'react-icons/im';
import { SocketContext } from '../../../../context/socket';

export interface IFriendProps {
  friendInfo: {
    _id: string;
    participants: Array<participation>;
    latest?: IMessage | undefined;
    unreadmessages: Array<IMessage>;
  };
  unReadLength: number;
}

export function Friend({ friendInfo, unReadLength }: IFriendProps) {
  const { _id, participants, latest, unreadmessages } = friendInfo;
  const lang = useAppSelector((state) => state.global.language);
  const user = useAppSelector((state) => state.user);
  const socket = React.useContext(SocketContext);
  const [participation, setParticipation] =
    React.useState<participation | null>(null);
  React.useEffect(() => {
    const participation1 = participants.filter(
      (value) => value._id !== user._id
    )[0];
    setParticipation({
      ...participation1!,
      isOnline: false,
    });
  }, [user]);
  const dispatch = useAppDispatch();
  const handleSelectUser = () => {
    if (participation) {
      dispatch(
        handleChooseFriend({ conversationId: _id, participation })
      );
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
  };

  return (
    <div
      className="flex gap-2 my-6 px-2 py-1 hover:bg-gray-200 bg-opacity-25 cursor-pointer"
      onClick={handleSelectUser}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={
          participation
            ? participation!.imgUrl
              ? participation!.imgUrl
              : 'https://picsum.photos/40'
            : ''
        }
        alt="Avatar"
      />
      <div className="w-full">
        <div className="flex justify-between gap-8 w-full items-center">
          <div className="flex gap-2 w-52">
            <p
              id={participation ? participation!._id : ''}
              className="text-base font-semibold truncate"
            >
              {participation ? participation!.name : ''}
            </p>
            {(participation ? participation!.name!.length : '') <=
            12 ? (
              <p className="truncate text-sm">
                @{participation ? participation!.username : ''}
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-xs">
              {formatDate(
                new Date(latest?.createAt as Date).getTime()
              )}
            </p>
            {unReadLength === 0 ? null : (
              <div
                className="text-white bg-red-500 rounded-full flex w-4 h-4 mx-auto justify-center items-center"
                style={{
                  fontSize: '10px',
                }}
              >
                {unReadLength}
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="truncate text-xs w-48">
            {latest?.type === 'text' ? (
              latest?.text
            ) : (
              <div className="flex">
                <ImFilePicture size="12px" />
                {lang === 'en' ? 'Picture' : 'Hình Ảnh'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
