import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate } from "react-router-dom"
import { getMe, turnOffLoading } from '../../reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { unwrapResult } from '@reduxjs/toolkit';
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../context/socket';
import IUser from '../../interface/IUser';

export interface IChatProps {
}

export function Chat (props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.user.loading);
  const socket = React.useContext(SocketContext);
  const [user, setUser] = React.useState<IUser>({} as IUser);
  React.useEffect(()=>{
    const access_token = localStorage.getItem('access_token');
    if(!access_token){
      navigate('/sign');
    }
    const xxx = async ()=>{
      try{
        const actionResult = await dispatch(getMe());
        const unwrap = unwrapResult(actionResult);
        setUser(unwrap);
        setTimeout(()=>{
          dispatch(turnOffLoading(false))
        },500);
      }catch(error){
        console.log(error);
      }
    }
    xxx();
  },[])
  React.useEffect(()=>{
    setTimeout(()=>{
      socket && user._id && socket.emit("init_user", user._id);
    },1);
  },[socket, user])

  return (
    <div className="flex h-screen min-w-full">
      {

      loading && <FullPageLoading className="h-screen"/>
      }
      <LeftBar/>
      <MainChat/>
    </div>
  );
}
