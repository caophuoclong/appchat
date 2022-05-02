import * as React from 'react';
import { BiUser, BiUserPlus } from 'react-icons/bi';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hook';
import {
  SelectedType,
  setSelectedModal,
  setShowModalOptionFalse,
} from '../../../reducers/globalSlice';
import { useNavigate } from 'react-router-dom';
export interface ISettingModalProps {}

const Button = (props: {
  onClick?: React.MouseEventHandler;
  className?: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex my-2 gap-4 ${props.className ? props.className : ''}`}
    >
      {props.children}
    </button>
  );
};

export function SettingModal(props: ISettingModalProps) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.global.language);
  const handleCloseModal = () => {
    dispatch(setShowModalOptionFalse());
  };
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={handleCloseModal} className="mr-0 ml-auto my-0 absolute right-4">
        <FaTimes size="24px" />
      </Button>
      <Button
        onClick={() => {
          dispatch(setSelectedModal(SelectedType.INFORMATION));
        }}
      >
        <BiUser size="24px" />
        <p>{lang === 'en' ? 'Information' : 'Thông tin người dùng'}</p>
      </Button>
      <Button
        onClick={() => {
          dispatch(setSelectedModal(SelectedType.SETTINGS));
        }}
      >
        <FiSettings size="24px" />
        <p>{lang === 'en' ? 'Settings' : 'Cài đặt'}</p>
      </Button>
      <Button
        onClick={() => {
          dispatch(setSelectedModal(SelectedType.MAKEFRIEND));
        }}
      >
        <BiUserPlus size="24px" />
        <p>{lang === 'en' ? 'Add Friend' : 'Thêm bạn'}</p>
      </Button>
      <Button
        onClick={() => {
          window.localStorage.removeItem('access_token');
          navigate('/');
        }}
        className="mt-12 mb-0"
      >
        <FiLogOut size="24px" />
        <p>{lang === 'en' ? 'Log out' : 'Đăng xuất'}</p>
      </Button>
    </>
  );
}
