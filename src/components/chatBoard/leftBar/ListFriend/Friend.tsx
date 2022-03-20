import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { participation } from '../../../../interface/IUser';
import { handleChooseFriend } from '../../../../reducers/userSlice';
import IMessage from "../../../../interface/IMessage";
import { formatDate } from '../../mainChat/ChatBox/MessageList/Message';

export interface IFriendProps {
  friendInfo: {
    _id: string,
    participants: Array<participation>,
    latest?: IMessage | undefined,
  };
}

export function Friend({friendInfo}: IFriendProps) {
  const { _id, participants, latest  } = friendInfo;
  const user = useAppSelector(state => state.user);
  const [participation, setParticipation] = React.useState<participation | null>(null);
  React.useEffect(()=>{
    const participation1 = participants.filter(value=> value._id !== user._id)[0];
      setParticipation(participation1!);
  },[user])
  const dispatch = useAppDispatch();
  const handleSelectUser = ()=>{
    if(participation)
    dispatch(handleChooseFriend({conversationId: _id,participation}));
    
  }
  return (
    <div className="flex gap-2 my-6 px-2 py-1 hover:bg-gray-200 bg-opacity-25 cursor-pointer" onClick={handleSelectUser}>
      <img className="w-10 h-10 rounded-full" src={participation ? participation!.imgUrl ? participation!.imgUrl : "https://picsum.photos/40": ""} alt="Avatar" />
      <div className="w-full">
        <div className="flex justify-between gap-8 w-full items-center">
          <div className="flex gap-2 w-52">
            <p id={participation ? participation!._id : ""} className="text-base font-semibold truncate">{participation ?participation!.name : ""}</p>
            {
              (participation ? participation!.name!.length : "") <= 12?<p className="truncate text-sm">@{participation ? participation!.username:""}</p>:null
            }
          </div>
          <p className="text-xs">{formatDate(new Date(latest?.createAt as Date).getTime())}</p>
        </div>
        <div className="w-full">
            <p className="truncate text-xs w-48">
              {latest?.text}
            </p>
        </div>
      </div>
    </div>
  );
}
