import * as React from 'react';
import Modal from './Modal';
import { GrLanguage } from 'react-icons/gr';
import Switch from 'react-switch';
import { UKFlag, VietNamFlag } from '../../../assets/images';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { changeLanguage } from '../../../reducers/globalSlice';
export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
    const lang = useAppSelector(state => state.global.language);
    const dispatch = useAppDispatch();
    const [checked, setChecked] = React.useState(lang === "en" ? true : false );
    const handleChangeLanguage = ()=>{
        setChecked(prev => !prev);
    }
    React.useEffect(()=>{
        if(checked){
            window.localStorage.setItem("lang", "en" );
            dispatch(changeLanguage("en"))
        }else{
            window.localStorage.setItem("lang", "vn" );
            dispatch(changeLanguage("vn"))
        }
    },[checked])
  return (
    <Modal
      customStyle={{
        content: {
            width: "max-content",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "20px",
        },
      }}
      heading={<div className="flex items-center gap-2 mb-2">
      <GrLanguage size="24px" />
      <p>{lang === "en" ? "Language" : "Ngôn ngữ"}</p>
  </div>}
    >
      <div>
        <label className="flex items-center gap-4 py-3">
          <span>{lang === "en" ? "Change language: " : "Thay đổi ngôn ngữ: "}</span>
          <img src={VietNamFlag} alt="Viet Nam Flag"/>
          <Switch
            checked={checked}
            offColor="#FF0000"
            onColor="#0000FF"
            onChange={handleChangeLanguage}
          />
          <img src={UKFlag} alt="UK flag"/>
        </label>
      </div>
    </Modal>
  );
}
