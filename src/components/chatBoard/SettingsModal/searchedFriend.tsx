import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import {CgMoreO} from "react-icons/cg";
import { useAppDispatch, useAppSelector } from '../../../hook';
import { sendFriendRequest } from '../../../reducers/globalSlice';
import { getMe, refreshConversations } from '../../../reducers/userSlice';
import friendApi from '../../../services/friend';
import notiApi from '../../../services/notification';
import SelectLanguage from '../../Select';
import sw2 from "sweetalert2";
import { SocketContext } from '../../../context/socket';
import StagingFriends from './stagingFriends';
type Props = {
  _id: string;
  name?: string;
  imgUrl?: string;
  username: string;
  className?: string;
};

export default function Friends({
  _id,
  name,
  imgUrl,
  username,
  className
}: Props) {
  return (
    <div className={`flex w-full py-2 gap-4 items-center ${className}`}>
      <img className="w-10 h-10r rounded-full border-2" src={imgUrl} alt="" />
      <div>
        <p>{name}</p>
        <p className="text-xs">@{username}</p>
      </div>
      <StagingFriends _id={_id}/>
    </div>
  );
}
