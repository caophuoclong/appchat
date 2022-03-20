import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate } from "react-router-dom"
import { getMe } from '../../reducers/userSlice';
import { useAppDispatch } from '../../hook';

export interface IChatProps {
}

export function Chat (props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(()=>{
    const access_token = localStorage.getItem('access_token');
    if(!access_token){
      navigate('/sign');
    }
    const xxx = async ()=>{
      try{
        const actionResult = dispatch(getMe());
      }catch(error){
        console.log(error);
      }
    }
    xxx();
    
  },[])

  return (
    <div className="flex h-screen min-w-full">
      <LeftBar/>
      <MainChat/>
    </div>
  );
}
