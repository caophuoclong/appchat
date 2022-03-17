import * as React from 'react';
import { useAppDispatch } from '../../../../hook';
import { IFriend } from '../../../../interface/IFriend';
import { handleChooseFriend } from '../../../../reducers/userSlice';

export interface IFriendProps {
  friendInfo: IFriend;
}

export function Friend({friendInfo}: IFriendProps) {
  const {imgUrl, id, name, username} = friendInfo;
  const dispatch = useAppDispatch();
  const handleSelectUser = ()=>{
    dispatch(handleChooseFriend(friendInfo));
  }
  return (
    <div className="flex gap-2 my-6 px-2 py-1 hover:bg-gray-200 bg-opacity-25 cursor-pointer" onClick={handleSelectUser}>
      <img className="w-10 h-10 rounded-full" src={imgUrl} alt="Avatar" />
      <div className="w-full">
        <div className="flex justify-between gap-8 w-full items-center">
          <div className="flex gap-2 w-52">
            <p id={id} className="text-base font-semibold truncate">{name}</p>
            {
              name.length <= 12?<p className="truncate text-sm">@{username}</p>:null
            }
          </div>
          <p className="text-xs">{"Mar 26"}</p>
        </div>
        <div className="w-full">
            <p className="truncate text-xs w-48">
                thank a lot for your good recommendation 123 12312 12312
                </p>
        </div>
      </div>
    </div>
  );
}
