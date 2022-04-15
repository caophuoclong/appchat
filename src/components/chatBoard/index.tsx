import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate } from 'react-router-dom';
import { getMe, turnOffLoading } from '../../reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { unwrapResult } from '@reduxjs/toolkit';
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../context/socket';
import IUser from '../../interface/IUser';
import { getConversation } from '../../reducers/message';
import moment from 'moment';
import 'moment/locale/es-us';
import 'moment/locale/vi';
import InforConversation from './InfoConversation';
export interface IChatProps {}

export function Chat(props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const socket = React.useContext(SocketContext);
  const conversations = useAppSelector((state) => state.user.conversations);
  const [user1, setUser1] = React.useState({} as IUser);
  const lang = useAppSelector((state) => state.global.language);
  React.useEffect(() => {
    if (lang === 'en') {
      moment.locale('es');
    } else {
      moment.locale('vi');
    }
  }, [lang]);
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
        setTimeout(() => {
          dispatch(turnOffLoading(false));
        }, 500);
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
    console.log(conversations);
    if (socket) {
      if (conversations) {
        conversations.forEach((conversation) => {
          socket.emit('join_room', conversation._id);
        });
      }
    }
  }, [socket, conversations?.length]);
  React.useEffect(() => {
    try {
      if (conversations) {
        conversations.map(async (conversation) => {
          if (conversation._id !== '') {
            const actionResult = await dispatch(
              getConversation({
                id: conversation._id,
                page: 1,
              })
            );
            unwrapResult(actionResult);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [conversations?.length]);
  const isShowGroupDetail = useAppSelector((state) => state.global.showGroupDetail);
  return (
    <div className="flex h-screen min-w-full">
      {loading && <FullPageLoading className="h-screen" />}
      <LeftBar />
      <MainChat />
      {isShowGroupDetail && <InforConversation />}
    </div>
  );
}
