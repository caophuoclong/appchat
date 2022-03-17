import * as React from 'react';
import { useAppSelector } from '../../../../../hook';
import IMessage from '../../../../../interface/IMessage';
export interface IMessageProps {
  message: IMessage;
}
const Right = ({ message, date }: { message: string; date: number }) => {
  return (
    <div className="bg-glareGreen text-white w-1/2 ml-auto mr-16 py-3 px-14 my-2 rounded-2xl rounded-br-none">
      {message}
    </div>
  );
};
const Left = ({ message, date }: { message: string; date: number }) => {
  const choosendFriend = useAppSelector((state) => state.user.choosenFriend);
  return <div className="bg-glareGray text-white w-1/2 ml-16 py-3 px-14 my-2 rounded-2xl rounded-bl-none">
  {message}
</div>;
};

export function Message({ message }: IMessageProps) {
  const user = useAppSelector((state) => state.user);
  let isCurrentUser = false;
  if (
    user.username === message.senderUsername ||
    user.id === message.senderId
  ) {
      isCurrentUser = true;
  }

  return (
    <>
      {isCurrentUser ? (
        <Right message={message.text} date={message.date} />
      ) : (
        <Left message={message.text} date={message.date} />
      )}
    </>
  );
}
