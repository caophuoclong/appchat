import * as React from 'react';
import { useAppSelector } from '../../../../../hook';
import IMessage from '../../../../../interface/IMessage';
import moment from 'moment';
export interface IMessageProps {
  message: IMessage;
}
export const formatDate = (now: number) => {
  const date = new Date(now);
  const formated = moment(date).format('hh:mm');
  if (formated === 'Invalid date') {
    return null;
  }
  return formated;
};
const Right = ({
  message,
  date,
  type,
}: {
  message: string;
  date: number;
  type: 'image' | 'text';
}) => {
  formatDate(date);
  switch (type) {
    case 'text':
      return (
        <div className="bg-glareGreen text-white w-fit max-w-1/2 ml-auto mr-4 py-3 px-8 my-2 rounded-2xl rounded-br-none -z-10 text-sm lg:text-xl">
          {message}

          <br />
          <p className="text-right text-xs text-glareGray500 mt-2">
            {formatDate(date)}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className="text-white w-fit max-w-1/2 ml-auto mr-4 py-3 my-2 rounded-2xl rounded-br-none">
          <img className="max-h-96" src={message} alt="" />

          <br />
          <p className="text-right text-xs text-glareGray500 mt-2">
            {formatDate(date)}
          </p>
        </div>
      );
    default:
      return <div></div>;
  }
};
const Left = ({
  message,
  date,
  type,
}: {
  message: string;
  date: number;
  type: 'image' | 'text';
}) => {
  const choosendFriend = useAppSelector(
    (state) => state.user.choosenFriend
  );
  switch (type) {
    case 'text':
      return (
        <div className="bg-glareGray text-white w-fit max-w-1/2 ml-4 py-3 px-8 my-2 rounded-2xl rounded-bl-none text-sm lg:text-xl">
          {message}
          <p className="text-xs text-glareGray500 mt-2">
            {formatDate(date)}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className="text-white w-fit max-w-1/2 ml-4 py-3 my-2 rounded-2xl rounded-bl-none">
          <img src={message} alt="" />
          <br />
          <p className="text-right text-xs text-glareGray500 mt-2">
            {formatDate(date)}
          </p>
        </div>
      );
    default:
      return <div></div>;
  }
};

export function Message({ message }: IMessageProps) {
  const user = useAppSelector((state) => state.user);
  let isCurrentUser = false;
  if (user._id === message.senderId) {
    isCurrentUser = true;
  }

  return (
    <>
      {isCurrentUser ? (
        <Right
          message={message.text}
          date={new Date(message.createAt!).getTime()}
          type={message.type}
        />
      ) : (
        <Left
          message={message.text}
          date={new Date(message.createAt!).getTime()}
          type={message.type}
        />
      )}
    </>
  );
}
