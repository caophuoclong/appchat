import * as React from 'react';
import { MoreIcon } from '../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../hook';
import {
  makeSearchedFriendsUndefined,
  SelectedType,
  setShowModalOptionFalse,
  setShowModalOptionTrue,
} from '../../../reducers/globalSlice';
import Information from '../SettingsModal/Information';
import MakeFriend from '../SettingsModal/Makefriend';
import MakeGroup from '../SettingsModal/MakeGroup';
import Settings from '../SettingsModal/Settings';
import { ModalOptions } from './modalOptions';

export interface IUserProps {
  className: string;
}

export function User(props: IUserProps) {
  const { imgUrl, name, username } = useAppSelector(
    (state) => state.user
  );
  const showModalOption = useAppSelector(
    (state) => state.global.showModalOption
  );
  const selectedModal = useAppSelector(
    (state) => state.global.selectedModal
  );
  const dispatch = useAppDispatch();
  const handleChangeShowModal = () => {
    if (showModalOption) dispatch(setShowModalOptionFalse());
    else dispatch(setShowModalOptionTrue());
  };
  React.useEffect(() => {
    dispatch(makeSearchedFriendsUndefined());
  }, [selectedModal]);
  return (
    <div style={{ height: '10%' }} className={props.className}>
      <img
        className="w-12 h-12 rounded-full"
        src={imgUrl || 'https://picsum.photos/40'}
        alt=""
      />
      <div>
        <p className="text-glareBlack text-base font-semibold">
          {name}
        </p>
        <p className="text-glareGray text-base font-normal">
          @{username}
        </p>
      </div>
      <div className="relative justify-self-end ml-auto mr-4">
        {showModalOption ? (
          <ModalOptions className="flex flex-col p-4 pb-2 absolute w-80 min-h-40 bg-gray-50 -translate-y-full lg:-translate-x-8  lg:left-full after:content-[''] after:border-l-8 after:border-l-transparent after:border-r-8 after:border-r-transparent after:border-t-8 after:border-t-gray-50 after:absolute after:bottom-0 after:translate-y-full lg:after:left-4 after:right-4 shadow-2xl rounded-xl drop-shadow-2xl z-10 -translate-x-full left-full" />
        ) : null}
        <button
          className="ml-auto mr-2"
          onClick={handleChangeShowModal}
        >
          <MoreIcon />
        </button>
      </div>
      {selectedModal === SelectedType.INFORMATION && <Information />}
      {selectedModal === SelectedType.SETTINGS && <Settings />}
      {selectedModal === SelectedType.MAKEFRIEND && <MakeFriend />}
      {selectedModal === SelectedType.MAKEGROUP && <MakeGroup />}
    </div>
  );
}
