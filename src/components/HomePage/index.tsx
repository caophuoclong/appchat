import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import Header from '../../Common/Header';
import LeftBar from './Leftbar';
import Main from './Main';
import Message from './Message';
import RightBar from './Rightbar';
import FullPageLoading from '../chatBoard/FullPageLoading';
import { getMe } from '../../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { SocketContext } from '../../context/socket';

type Props = {};

export default function HomePage({}: Props) {
  const showMessageModal = useAppSelector((state) => state.global.showMessageModal);
  const conversations = useAppSelector((state) => state.user.conversations);
  const socket = React.useContext(SocketContext);
  const user = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (typeof socket.emit === 'function') socket && user._id && socket.emit('init_user', user._id);
  }, [socket, user]);
  React.useEffect(() => {
    if (socket) {
      if (conversations) {
        conversations.forEach((conversation) => {
          socket.emit('join_room', conversation._id);
        });
      }
    }
  }, [socket, conversations?.length]);
  React.useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('/sign');
    }
    const xxx = async () => {
      try {
        const actionResult = await dispatch(getMe());
        const unwrap = unwrapResult(actionResult);

        console.log(unwrap);
        // setTimeout(() => {
        //   dispatch(turnOffLoading(false));
        // }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    xxx();
  }, []);
  return (
    <div className="">
      <Header />
      {loading && <FullPageLoading className="h-screen" />}
      <div className="grid grid-cols-10 gap-10 mx-8 grid-flow-col">
        <LeftBar className="col-span-2 sidebar mt-4" />
        <Main className="col-span-6 flex flex-col gap-y-10 pb-8" />
        <RightBar className="col-span-2 sidebar mt-4" />
      </div>
      {showMessageModal && (
        <Message className="fixed w-80 bottom-0 right-12 -translate-x-1/2 rounded-lg rounded-b-none bg-white border" />
      )}
    </div>
  );
}
