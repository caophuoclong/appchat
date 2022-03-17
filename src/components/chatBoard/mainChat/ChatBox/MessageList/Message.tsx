import * as React from 'react';
import { useAppSelector } from '../../../../../hook';
import IMessage from '../../../../../interface/IMessage';
import moment from "moment";
export interface IMessageProps {
  message: IMessage;
}
const formatDate = (now: number) : string=>{
  const date = new Date( now);
  const formated = moment(date).format("MMM DD, hh:mm");
  console.log(formated);
  return formated;

}
const Right = ({ message, date }: { message: string; date: number }) => {
  formatDate(date);
  return (
    <div className="bg-glareGreen text-white w-fit max-w-1/2 ml-auto mr-16 py-3 px-8 my-2 rounded-2xl rounded-br-none">
      {message}
      {/* <img src="https://picsum.photos/200" alt="" /> */}
      <br/>
      <p className="text-right text-xs text-glareGray500 mt-2">{formatDate(date)}</p>
    </div>
  );
};
const Left = ({ message, date }: { message: string; date: number }) => {
  const choosendFriend = useAppSelector((state) => state.user.choosenFriend);
  return <div className="bg-glareGray text-white w-fit max-w-1/2 ml-16 py-3 px-8 my-2 rounded-2xl rounded-bl-none">
  {message}
  <p className="text-xs text-glareGray500 mt-2">{formatDate(date)}</p>
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
