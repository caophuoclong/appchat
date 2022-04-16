import * as React from 'react';
import Modal from '../../chatBoard/SettingsModal/Modal';
import { GrLanguage } from 'react-icons/gr';
import Switch from 'react-switch';
import { UKFlag, VietNamFlag } from '../../../assets/images';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { changeLanguage } from '../../../reducers/globalSlice';
export interface ISettingsProps {}

export default function UpdateInfoGroup(props: ISettingsProps) {
  const lang = useAppSelector((state) => state.global.language);

  return (
    <Modal
      customStyle={{
        content: {
          width: 'max-content',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
        },
      }}
      heading={<div></div>}
    >
      <div className="bg-black"></div>
    </Modal>
  );
}
