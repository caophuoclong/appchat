import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate } from "react-router-dom"
import { getMe } from '../../reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { unwrapResult } from '@reduxjs/toolkit';
import FullPageLoading from './FullPageLoading';

export interface IChatProps {
}

export function Chat (props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.user.loading);
  React.useEffect(()=>{
    const access_token = localStorage.getItem('access_token');
    if(!access_token){
      navigate('/sign');
    }
    const xxx = async ()=>{
      try{
        const actionResult = await dispatch(getMe());
        const unwrap = unwrapResult(actionResult);
      }catch(error){
        console.log(error);
      }
    }
    xxx();
    
  },[])

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
