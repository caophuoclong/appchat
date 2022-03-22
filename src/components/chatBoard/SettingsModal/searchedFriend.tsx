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
import { getMe } from '../../../reducers/userSlice';
import friendApi from '../../../services/friend';
import SelectLanguage from '../../Select';
type Props = {
  _id: string;
  name?: string;
  imgUrl?: string;
  username: string;
};

export default function SearchedFriend({
  _id,
  name,
  imgUrl,
  username,
}: Props) {
  const dispatch = useAppDispatch();
  const userFriends = useAppSelector((state) => state.user.friends);
  const userFriendsRequested = useAppSelector((state) => state.user.friendsRequested);
  const userFriendPending  = useAppSelector((state) => state.user.friendsPending);
  const userId = useAppSelector((state) => state.user._id);
  const [showButtonUpdate, setShowButtonUpdate] = React.useState(false);
  const [isAccept, setIsAccept] = React.useState<"n" | "y" | "none">("none");
  console.log(userFriendsRequested);
  const lang = useAppSelector((state) => state.global.language);
  const handleSendFriendRequest = async (id: string) => {
    try {
      const actionResul = await dispatch(sendFriendRequest(id));
      unwrapResult(actionResul);
      const actionResult = await dispatch(getMe());
      unwrapResult(actionResult)
      alert('Send friend request success');
    } catch (error) {
      alert('Send friend request failure');
    }
  };
  const handleSelect = (value: "n" | "y")=>{
      console.log(value);
    setIsAccept(value);
    setShowButtonUpdate(true);
  }
  const handleUpdateFriend = async (id: string)=>{
    if(isAccept){
      try{
        await friendApi.handleAcceptFriend(id);
        const actionResult = await dispatch(getMe());
        unwrapResult(actionResult);
      }catch(error){
        alert("Error! Login again");
      }
    }else{
      try{
        await friendApi.handleRejectFriend(id);
        const actionResult = await dispatch(getMe());
        unwrapResult(actionResult);
      }catch(eror){
        alert('Error! Login again');
      }
    }
  }
  
  return (
    <div className="flex w-full py-2 gap-4 items-center">
      <img className="w-10 h-10r rounded-full border-2" src={imgUrl} alt="" />
      <div>
        <p>{name}</p>
        <p className="text-xs">@{username}</p>
      </div>
      {
      userFriends.includes(_id) ? (
          <div
          className="ml-auto mr-2"
          >
              <AiOutlineCheckCircle size="24px" fill="green" />
          </div>
      ) : userFriendPending.includes(_id) ? <button className="ml-auto mr-2" disabled>
        <CgMoreO size="24px" fill="yellow"/>
      </button> :userFriendsRequested.includes(_id)? 
      <div className="ml-auto mr-2 flex gap-2">
        <SelectLanguage value={isAccept} onChange={handleSelect}  options={
            [
                {
                    value: "y",
                    label: lang === "en" ? "Accept": "Đồng ý",
                },
                {
                    value: "n",
                    label: lang === "en" ? "Decline": "Từ chối",
                }
            ]
        }>
            <option value="none" disabled hidden selected >{
                lang === "en" ? "Select one option" : "Hãy lựa chọn"
               }</option>
        </SelectLanguage>
        {
          showButtonUpdate && <button onClick={()=>{handleUpdateFriend(_id)}}>
            <AiFillCheckCircle size="24px" fill="green"/>
          </button>
        }
      </div>
        
      :
      userId !== _id ? (
        <button
          className="ml-auto mr-2"
          onClick={() => {
            handleSendFriendRequest(_id);
          }}
        >
          <AiFillPlusCircle fill="blue" size="24px" />
        </button>
      ): null
      }
    </div>
  );
}
