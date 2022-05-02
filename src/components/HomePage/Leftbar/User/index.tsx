import React from 'react';
import IUser from '../../../../interface/IUser';

export default function User(props: Pick<IUser, 'username' | 'name' | 'imgUrl'>) {
  return (
    <div className="flex items-center shadow-lg rounded-lg gap-x-3 p-2 px-4 bg-white">
      <img src={props.imgUrl} className="row-span-2 rounded-md w-10 h-10 col-span-2"></img>
      <div className="">
        <p className="text-lg font-bold">{props.name}</p>
        <p className="text-sm text-gray-400 font-semibold">@{props.username}</p>
      </div>
    </div>
  );
}
