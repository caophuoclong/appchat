import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { setEmptyChoosen } from '../../../../reducers/userSlice';

export interface IChatHeaderProps {
  className: string;
}
const CurrentFriend = (props: any) => {
  const choosenFriend = useAppSelector(
    (state) => state.user.choosenFriend?.participation
  );
  const dispatch = useAppDispatch();
  const onBack = () => {
    dispatch(setEmptyChoosen());
  };
  return (
    <div className="flex gap-2">
      <div
        onClick={onBack}
        className="text-3xl text-gray-700 font-bold lg:hidden block cursor-pointer"
      >
        &lt;
      </div>
      <div className="relative">
        <img
          className="w-9 h-9 rounded-full"
          src={choosenFriend?.imgUrl || 'https://picsum.photos/40'}
          alt=""
        />
        {choosenFriend?.isOnline ? (
          <div className="absolute w-3 h-3 rounded-full bg-green-500 right-0 bottom-1"></div>
        ) : (
          <div className="absolute w-3 h-3 rounded-full bg-red-500 right-0 bottom-1"></div>
        )}
      </div>
      <div>
        <p className="text-base text-glareBlack">
          {choosenFriend?.name}
        </p>
        <p className="text-xs text-glareGray ">
          @{choosenFriend?.username}
        </p>
      </div>
    </div>
  );
};
export function ChatHeader(props: IChatHeaderProps) {
  return (
    <div
      className={props.className}
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
    >
      <CurrentFriend />
    </div>
  );
}
