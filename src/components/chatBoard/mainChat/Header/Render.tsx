import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { IConversation } from '../../../../interface/IUser';
import { setHideGroupDetail, setShowGroupDetail } from '../../../../reducers/globalSlice';

interface RenderProps {
  type?: string;
  conversation: IConversation;
}

const GroupConversation = ({
  imgUrl,
  name,
  numberMember,
  handleSetShowGroupDetail,
}: {
  imgUrl: string;
  name: string;
  numberMember: number;
  handleSetShowGroupDetail: () => void;
}) => {
  return (
    <>
      <div className="flex items-center gap-4 w-full">
        <img className="w-9 h-9 rounded-full" src={imgUrl || 'https://picsum.photos/40'} alt="" />
        <div className="flex flex-col">
          <p className="text-xl font-bold text-glareBlack">{name}</p>
          <p className="text-xs text-gray-400 font-medium">{numberMember + 1} members</p>
        </div>
        <div className="ml-auto mr-4 cursor-pointer" onClick={handleSetShowGroupDetail}>
          ...
        </div>
      </div>
    </>
  );
};

const DirectConversation = (imgUrl: string, isOnline: boolean, name: string, username: string) => {
  return (
    <>
      <div className="relative">
        <img className="w-9 h-9 rounded-full" src={imgUrl || 'https://picsum.photos/40'} alt="" />
        {isOnline ? (
          <div className="absolute w-3 h-3 rounded-full bg-green-500 right-0 bottom-1"></div>
        ) : (
          <div className="absolute w-3 h-3 rounded-full bg-red-500 right-0 bottom-1"></div>
        )}
      </div>
      <div>
        <p className="text-base text-glareBlack">{name}</p>
        <p className="text-xs text-glareGray ">@{username}</p>
      </div>
    </>
  );
};

export default function Render({ type, conversation }: RenderProps) {
  const user = useAppSelector((state) => state.user);
  const isShowGroupDetail = useAppSelector((state) => state.global.showGroupDetail);
  const dispatch = useAppDispatch();
  const handleSetShowGroupDetail = () => {
    console.log(123);
    if (!isShowGroupDetail) {
      dispatch(setShowGroupDetail());
    } else {
      dispatch(setHideGroupDetail());
    }
  };
  if (type === 'group') {
    const numberMember = conversation.participants.length;
    return (
      <GroupConversation
        imgUrl={conversation.imgUrl!}
        name={conversation.name!}
        numberMember={numberMember}
        handleSetShowGroupDetail={handleSetShowGroupDetail}
      />
    );
  } else {
    const participants = conversation.participants;
    const participant = participants.find((participant) => participant._id !== user._id)!;
    const friend = user.friends.find((friend) => friend._id === participant._id)!;
    return DirectConversation(friend.imgUrl, friend.isOnline, friend.name, friend.username);
  }
}
