import * as React from 'react';
import Select from 'react-select';
import { dateType, updateInformation } from '../../../reducers/userSlice';
import { monthOptions } from '../../../constants/monthOption';
import { yearOptions } from '../../../constants/yearOption';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { setSelectedModal } from '../../../reducers/globalSlice';
import {AiOutlineCamera}  from "react-icons/ai"
import Modal from './Modal';
import upload from '../../../services/uploadImage';


export interface IInformationProps {}

export default function Information(props: IInformationProps) {
  const lang = useAppSelector((state) => state.global.language);
  const user = useAppSelector((state) => state.user);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [numberPhone, setNumberPhone] = React.useState(user.numberPhone);
  const [date, setDate] = React.useState(user.dateOfBirth.date);
  const [month, setMonth] = React.useState(user.dateOfBirth.month);
  const [year, setYear] = React.useState(user.dateOfBirth.year);
  const [gender, setGender] = React.useState(user.gender);
  const [avatar, setAvatar] = React.useState({
    isChange: false,
    img: user.imgUrl
  });
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isIncorrectEmail, setIsIncorrectEmail] = React.useState(false);
  const [isIncorrectPhone, setIsIncorrectPhone] = React.useState(false);
  const dispatch = useAppDispatch();
  const updateRef = React.useRef<HTMLButtonElement>(null);
  const handleCancelChangeInfo = () => {
    dispatch(setSelectedModal(null));
  };
  const whatDate = () => {
    const listDate = [];
    const dateInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= dateInMonth; i++) {
      const xxx = {
        value: i,
        label: `${i}`,
      };
      listDate.push(xxx);
    }
    return listDate;
  };

  React.useEffect(()=>{
    if(name !== user.name || email !== user.email || numberPhone !== user.numberPhone || date !== user.dateOfBirth.date || month !== user.dateOfBirth.month || year !== user.dateOfBirth.year || gender !== user.gender || avatar.isChange === true) 
    setIsDisabled(false)
    else
    setIsDisabled(true);
  },[name, email, numberPhone, date, month, year,gender, avatar]);
  React.useEffect(()=>{
    if(!email?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    setIsIncorrectEmail(true);
    else
    setIsIncorrectEmail(false);
  },[email])
  React.useEffect(()=>{
    if(!numberPhone?.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/))
    setIsIncorrectPhone(true);
    else
    setIsIncorrectPhone(false);
  },[numberPhone])
  const readFile = (file: File)=>{
    return new Promise<ArrayBuffer | string >((resolve, reject)=>{
      const fr = new FileReader();
      fr.onload = ()=>{
        resolve(fr.result!);
      }
      fr.onerror = ()=>{
        reject(fr)
      }
      fr.readAsDataURL(file);
    })
  }
  const handleChangeAvatar = (event: React.ChangeEvent)=>{
    const file = (event.target! as HTMLInputElement).files![0];
    readFile(file).then(result=>{
      setAvatar({
        isChange: true,
        img: result as string
      });
    })
  }
  const handleUpdateInformation = async () => {
    if(avatar.isChange){
      if(numberPhone?.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/) && email?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        const result = await upload(avatar.img);
        const {data} = result;
        const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME
        const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${data.version}/${data.public_id}.png`
        dispatch(updateInformation({
          name,
          email,
          numberPhone,
          dateOfBirth:{
            date,
            month,
            year,
          },
          gender,
          imgUrl: url,
        }))
      }else {
        alert("Data is incorrect")
      }
    }else{
      if(numberPhone?.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/) && email?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        dispatch(updateInformation({
          name,
          email,
          numberPhone,
          dateOfBirth:{
            date,
            month,
            year,
          },
          gender,
        }))
      } else{
        alert("Data is incorrect")
      }
    }
  };
  return (
    <Modal
      customStyle={{
        content: {
          width: 'max-content',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          minHeight: "580px"
        },
      }}
      heading={
        <p className="text-2xl font-bold text-left mr-20">
          {lang === 'en' ? 'User information' : 'Thông tin người dùng'}
        </p>
      }
    >
      <div>
      <div className="w-fit my-4 mx-auto relative group">
        <img
          className="w-20 h-20 rounded-full"
          src={avatar.img || "https://picsum.photos/40"}
          alt="avatart user"
        />
        <input onChange={handleChangeAvatar} type="file" accept="image/*" hidden id="avatarChange" />
        <label htmlFor="avatarChange" className="absolute bottom-0 p-2 rounded-full right-0 group-hover:visible invisible bg-black cursor-pointer">
            <AiOutlineCamera size="18px" fill="white"/>
        </label>
      </div>
      <div className="mb-2">
        <label htmlFor="" className="text-sm">
          {lang === 'en' ? 'Name: ' : 'Tên hiển thị: '}
        </label>
        <br />
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          className="border-2 border-gray-400 outline-none w-full py-1 px-2 rounded-lg"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="" className="text-sm">
          {lang === 'en' ? 'Email address: ' : 'Địa chỉ email: '}
        </label>
        <br />
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="text"
          className="border-2 border-gray-400 outline-none w-full py-1 px-2 rounded-lg"
        />
        {isIncorrectEmail && <span className="text-xs text-red-500">
          {lang === 'en' ? 'Email is incorrect' : 'Email không hợp lệ'}
        </span>}
      </div>
      <div className="mb-2">
        <label htmlFor="" className="text-sm">
          {lang === 'en' ? 'Number phone: ' : 'Số điện thoại: '}
        </label>
        <br />
        <input
          value={numberPhone}
          onChange={(event) => {
            setNumberPhone(event.target.value);
          }}
          type="text"
          className="border-2 border-gray-400 outline-none w-full py-1 px-2 rounded-lg"
        />
        {isIncorrectPhone && <span className="text-xs text-red-500">
          {lang === 'en' ? 'Number phone is incorrect' : 'Số điện thoại không hợp lệ'}
        </span>}
      </div>
      <div className="mb-2">
        <label htmlFor="" className="text-sm">
          {lang === 'en' ? 'Date of birth: ' : 'Ngày sinh: '}
        </label>
        <br />
        <div className="flex justify-between">
          <Select
            maxMenuHeight={120}
            options={whatDate()}
            value={whatDate()[date - 1]}
            onChange={(data) => {
              setDate(data!.value);
              
            }}
          />
          <Select
            maxMenuHeight={120}
            options={monthOptions}
            value={monthOptions[month - 1]}
            onChange={(data) => {
              setMonth(data!.value);
              
            }}
          />
          <Select
            maxMenuHeight={120}
            options={yearOptions()}
            value={yearOptions()[new Date().getFullYear() - year]}
            onChange={(data) => {
              setYear(data!.value);
              
            }}
          />
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="" className="text-sm">
          {lang === 'en' ? 'Gender: ' : 'Giới tính: '}
        </label>
        <div className="flex gap-4 items-center">
          <div>
            <input
              hidden
              id="radio1"
              type="radio"
              name="gender"
              onChange={() => {
                setGender('male');
                
              }}
              checked={gender === 'male' ? true : false}
              value="male"
            />
            <label htmlFor="radio1">
              <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              {lang === 'en' ? 'Male' : 'Nam'}
            </label>
          </div>
          <div>
            <input
              hidden
              id="radio2"
              type="radio"
              name="gender"
              onChange={() => {
                setGender('female');
                
              }}
              value="female"
              checked={gender === 'female' ? true : false}
            />
            <label htmlFor="radio2">
              <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
              {lang === 'en' ? 'Female' : 'Nữ'}
            </label>
          </div>
          <div>
            <input
              hidden
              id="radio3"
              type="radio"
              name="gender"
              onChange={() => {
                setGender('other');
                
              }}
              value="other"
              checked={gender === 'other' ? true : false}
            />
            <label htmlFor="radio3">
              <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>{' '}
              {lang === 'en' ? 'Other' : 'Khác'}
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleCancelChangeInfo}
          className=" text-glareGray200 p-2 px-4 rounded-xl bg-gray-500 shadow-lg shadow-gray-500/50"
        >
          {lang === 'en' ? 'Cancel' : 'Huỷ'}
        </button>
        <button
          disabled={isDisabled}
          ref={updateRef}
          onClick={handleUpdateInformation}
          className=" text-glareGray200 p-2 px-4 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/50"
        >
          {lang === 'en' ? 'Update' : 'Cập nhật'}
        </button>
      </div>
      </div>
    </Modal>
  );
}
