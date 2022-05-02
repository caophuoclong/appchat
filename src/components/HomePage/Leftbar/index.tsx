import React from 'react';
import { useAppSelector } from '../../../hook';
import FunctionBar from './FunctionBar';
import Request from './Request';
import User from './User';
import IUser from '../../../interface/IUser';
type Props = {
  className: string;
};

export default function LeftBar({ className }: Props) {
  const user = useAppSelector((state) => state.user);
  return (
    <div className={`${className} flex flex-col gap-y-4`}>
      <User {...user} />
      <FunctionBar />
      <div className="flex items-center justify-evelny">
        <p className="font-semibold italic">Request</p>
        <span className="rounded-full bg-blue-500 text-xs w-6 h-6  flex items-center justify-center ml-auto mr-4 text-white">
          {user.friendsRequested.length}
        </span>
      </div>
      <Request />
    </div>
  );
}
