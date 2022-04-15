import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import {
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';
import { SocketContext } from '../../../context/socket';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { sendFriendRequest } from '../../../reducers/globalSlice';
import {
  getMe,
  refreshConversations,
  refreshFriendsAll,
} from '../../../reducers/userSlice';
import friendApi from '../../../services/friend';
import notiApi from '../../../services/notification';
import SelectLanguage from '../../Select';
import sw2 from 'sweetalert2';

type Props = {
  _id: string;
};

export default function StagingFriends({ _id }: Props) {
  const dispatch = useAppDispatch();
  const socket = React.useContext(SocketContext);
  const user = useAppSelector((state) => state.user);
  const [stage, setStage] = React.useState<
    'friend' | 'requested' | 'pending' | null
  >(null);
  const lang = useAppSelector((state) => state.global.language);
  const friends = useAppSelector((state) => state.user.friends);
  const [view, setView] = React.useState<JSX.Element>();
  const [isAccept, setIsAccept] = React.useState<'n' | 'y' | 'none'>(
    'none'
  );
  const [showButtonUpdate, setShowButtonUpdate] =
    React.useState(false);

  const friendsRequested = useAppSelector(
    (state) => state.user.friendsRequested
  );
  const friendsPending = useAppSelector(
    (state) => state.user.friendsPending
  );
  const checkStage = () => {
    const searchFriends = friends.find(
      (friend) => friend._id === _id
    );
    if (searchFriends) {
      setStage('friend');
      return;
    }
    const searchFriendsRequested = friendsRequested.find(
      (friend) => friend._id === _id
    );
    if (searchFriendsRequested) {
      setStage('requested');
      return;
    }
    const searchFriendsPending = friendsPending.find(
      (friend) => friend._id === _id
    );
    if (searchFriendsPending) {
      setStage('pending');
      return;
    }
  };
  React.useEffect(() => {
    checkStage();
  }, [friends, friendsRequested, friendsPending]);
  const handleSelect = (value: 'n' | 'y') => {
    console.log(value);
    handleUpdateFriend(_id, value);
  };
  const handleUpdateFriend = async (id: string, option: "n" | "y") => {
    if (option === "y") {
      try {
        await friendApi.handleAcceptFriend(id);
        await notiApi.addNotification({
          notification: {
            type: 'acceptFriend',
            user: `${user._id}`,
          },
          _id: id,
        });
        socket.emit('accept_friend', id);
        const actionResult1 = await dispatch(refreshFriendsAll());
        const actionResult = await dispatch(refreshConversations());
        unwrapResult(actionResult);

      } catch (error) {
        alert('Error! Login again');
      }
    } else {
      try {
        await friendApi.handleRejectFriend(id);
        const actionResult1 = await dispatch(refreshFriendsAll());
        const actionResult = await dispatch(refreshConversations());
        unwrapResult(actionResult);
      } catch (eror) {
        alert('Error! Login again');
      }
    }
  };
  const handleSendFriendRequest = async (id: string) => {
    try {
      const actionResul = await dispatch(sendFriendRequest(id));
      unwrapResult(actionResul);
      // fix here refresh only list friends
      const actionResult = await dispatch(refreshFriendsAll());
      console.log(unwrapResult(actionResult))
      await notiApi.addNotification({
        notification: {
          type: 'makeFriend',
          user: `${user._id}`,
        },
        _id: id,
      });
      socket.emit('live_noti');
      sw2.fire({
        icon: 'success',
        text:
          lang === 'en'
            ? 'Request sent'
            : 'Yêu cầu kết bạn đã được gửi',
        timer: 1500,
      });
      socket.emit('live_noti', id);
    } catch (error) {
      alert('Send friend request failure');
    }
  };
  React.useEffect(()=>{
      console.log("!234567");
  },[friendsPending])
  React.useEffect(()=>{
    if (stage === 'friend') {
        setView (
          <div className="ml-auto mr-2">
            <AiOutlineCheckCircle size="24px" fill="green" />
          </div>
        );
      } else if (stage === 'pending') {
        setView (
          <button className="ml-auto mr-2" disabled>
            <CgMoreO size="24px" fill="yellow" />
          </button>
        );
      } else if (stage === 'requested') {
        setView (
          <div className="ml-auto mr-2 flex gap-2">
            <SelectLanguage
              value={isAccept}
              onChange={handleSelect}
              options={[
                {
                  value: 'y',
                  label: lang === 'en' ? 'Accept' : 'Đồng ý',
                },
                {
                  value: 'n',
                  label: lang === 'en' ? 'Decline' : 'Từ chối',
                },
              ]}
            >
              <option value="none" disabled hidden selected>
                {lang === 'en' ? 'Select one option' : 'Hãy lựa chọn'}
              </option>
            </SelectLanguage>
            {/* {showButtonUpdate && (
              <button
                onClick={() => {
                  handleUpdateFriend(_id);
                }}
              >
                <AiFillCheckCircle size="24px" fill="green" />
              </button>
            )} */}
          </div>
        );
      } else {
        if (user._id !== _id)
          setView (
            <div className="ml-auto mr-2">
              <button
                onClick={() => {
                  handleSendFriendRequest(_id);
                }}
              >
                <AiFillPlusCircle fill="blue" size="24px" />
              </button>
            </div>
          );
        else
        setView(
            <></>
        )
      }
  },[stage, isAccept])
  return(
      <>{
          view
      }</>
  )
}
