import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate } from 'react-router-dom';
import { getMe, setLoading, turnOffLoading } from '../../reducers/userSlice';
import { setConversationChoosen } from '../../reducers/globalSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { unwrapResult } from '@reduxjs/toolkit';
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../context/socket';
import IUser from '../../interface/IUser';
import { getMessages } from '../../reducers/message';

import InforConversation from './InfoConversation';
import { getConversationInfo } from '../../reducers/globalSlice';
export interface IChatProps {}

export function Chat(props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const socket = React.useContext(SocketContext);
  const conversations = useAppSelector((state) => state.user.conversations);
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const conversation = useAppSelector((state) => state.global.conversation);
  const [user1, setUser1] = React.useState({} as IUser);
  const lang = useAppSelector((state) => state.global.language);
  const messages = useAppSelector((state) => state.messages.messagesList);
  const isShowGroupDetail = useAppSelector((state) => state.global.showGroupDetail);

  React.useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('/sign');
    }
    const xxx = async () => {
      try {
        const actionResult = await dispatch(getMe());
        const unwrap = unwrapResult(actionResult);
        setUser1(unwrap);
        console.log(unwrap);
        // setTimeout(() => {
        //   dispatch(turnOffLoading(false));
        // }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    xxx();
  }, [dispatch, navigate]);
  React.useEffect(() => {
    if (typeof socket.emit === 'function')
      socket && user1._id && socket.emit('init_user', user1._id);
  }, [socket, user1]);
  React.useEffect(() => {
    if (socket) {
      if (conversations) {
        conversations.forEach((conversation) => {
          socket.emit('join_room', conversation._id);
        });
      }
    }
  }, [socket, conversations?.length]);
  // React.useEffect(() => {
  //   dispatch(turnOffLoading(true));
  //   try {
  //     if (conversations) {
  //       conversations.map(async (conversation) => {
  //         if (conversation._id !== '') {
  //           const actionResult = await dispatch(
  //             getMessages({
  //               id: conversation._id,
  //               page: 1,
  //             })
  //           );
  //           const unwrap = unwrapResult(actionResult);
  //           console.log(unwrap);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [conversations?.length]);
  React.useEffect(() => {
    (async () => {
      dispatch(setLoading());
      if (choosenFriend.conversationId) {
        const result = await dispatch(getConversationInfo({ id: choosenFriend.conversationId }));
        const unwrap = unwrapResult(result);
        // console.log();
        if (!messages[choosenFriend.conversationId]) {
          const actionResult = await dispatch(
            getMessages({
              id: choosenFriend.conversationId,
              page: 1,
            })
          );
          const unwrap1 = unwrapResult(actionResult);
          console.log(unwrap1);
        }
        dispatch(setConversationChoosen(unwrap));
      }
      dispatch(turnOffLoading());
    })();
  }, [choosenFriend.conversationId]);
  return (
    <div className="flex h-screen min-w-full">
      {loading && <FullPageLoading className="h-screen" />}
      <LeftBar />
      <MainChat />
      {isShowGroupDetail && <InforConversation />}
    </div>
  );
}
