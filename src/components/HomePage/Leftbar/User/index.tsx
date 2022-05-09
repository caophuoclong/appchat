import React from 'react';
import LoadingSkeleton from '../../../../Common/LoadingSkeleton';
import { useAppSelector } from '../../../../hook';
import IUser from '../../../../interface/IUser';

function UserSkeleton() {
  return (
    <>
      <LoadingSkeleton className="row-span-2 rounded-md w-10 h-10 col-span-2"></LoadingSkeleton>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-bold">
          <LoadingSkeleton className="w-40 h-5" />
        </p>
        <p className="text-sm text-gray-400 font-semibold">
          <LoadingSkeleton className="w-20 h-5" />
        </p>
      </div>
    </>
  );
}

export default function User(props: Pick<IUser, 'username' | 'name' | 'imgUrl'>) {
  const isLoading = useAppSelector((state) => state.user.loading);
  return (
    <div className="flex items-center shadow-lg rounded-lg gap-x-3 p-2 px-4 bg-white">
      {isLoading ? (
        <UserSkeleton />
      ) : (
        <>
          <img src={props.imgUrl} className="row-span-2 rounded-md w-10 h-10 col-span-2"></img>
          <div className="">
            <p className="text-lg font-bold">{props.name}</p>
            <p className="text-sm text-gray-400 font-semibold">@{props.username}</p>
          </div>
        </>
      )}
    </div>
  );
}
