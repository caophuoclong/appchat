import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import {
  AiFillPlusCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { sendFriendRequest } from '../../../reducers/globalSlice';
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
  const [isAccept, setIsAccept] = React.useState<"n" | "y" | "none">("none");
  console.log(userFriendsRequested);
  const lang = useAppSelector((state) => state.global.language);
  const handleSendFriendRequest = async (id: string) => {
    try {
      const actionResul = await dispatch(sendFriendRequest(id));
      const unwrap = unwrapResult(actionResul);
      alert('Send friend request success');
    } catch (error) {
      alert('Send friend request failure');
    }
  };
  const handleSelect = (value: "n" | "y")=>{
      console.log(value);
    setIsAccept(value);
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
      ) : userFriendsRequested.includes(_id)? 
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
      :(
        <button
          className="ml-auto mr-2"
          onClick={() => {
            handleSendFriendRequest(_id);
          }}
        >
          <AiFillPlusCircle fill="blue" size="24px" />
        </button>
      )}
    </div>
  );
}
