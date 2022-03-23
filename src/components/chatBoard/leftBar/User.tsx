import * as React from 'react';
import { MoreIcon } from '../../../assets/icons';
import {  useAppDispatch, useAppSelector } from '../../../hook';
import { makeSearchedFriendsUndefined, setShowModalOptionFalse, setShowModalOptionTrue } from '../../../reducers/globalSlice';
import Information from '../SettingsModal/Information';
import MakeFriend from '../SettingsModal/Makefriend';
import Settings from '../SettingsModal/Settings';
import { ModalOptions } from './modalOptions';

export interface IUserProps {
  className: string
}

export function User (props: IUserProps) {
    const {imgUrl, name, username} = useAppSelector(state => state.user);
    const  showModalOption  = useAppSelector(state => state.global.showModalOption);
    const  selectedModal  = useAppSelector(state => state.global.selectedModal);
    const dispatch = useAppDispatch();
    const handleChangeShowModal = ()=>{
      if(showModalOption)
      dispatch(setShowModalOptionFalse());
      else
      dispatch(setShowModalOptionTrue());

    }
    React.useEffect(()=>{
      dispatch(makeSearchedFriendsUndefined());
    },[selectedModal])
    return (
    <div className={props.className}>
      <img className="w-12 h-12 rounded-full" src={imgUrl || "https://picsum.photos/40"} alt="" />
      <div>
        <p className="text-glareBlack text-base font-semibold">{name}</p>
        <p className="text-glareGray text-base font-normal">@{username}</p>
      </div>
      <div className="relative justify-self-end ml-auto mr-4">
      {showModalOption ? <ModalOptions className="flex flex-col p-4 pb-2 absolute w-80 min-h-40 bg-gray-50 -translate-y-full -translate-x-8 -top-1/2 left-full after:content-[''] after:border-l-8 after:border-l-transparent after:border-r-8 after:border-r-transparent after:border-t-8 after:border-t-gray-50 after:absolute after:bottom-0 after:translate-y-full after:left-4 shadow-2xl rounded-xl drop-shadow-2xl z-10"/>:null}
      <button onClick={handleChangeShowModal} >
        
        <MoreIcon />
      </button>
      </div>
      {
        selectedModal === "information" && <Information/>
      }
      {
        selectedModal === "settings" && <Settings/>
      }
      {
        selectedModal === "makeFriend" && <MakeFriend/>
      }
    </div>
  );
}
