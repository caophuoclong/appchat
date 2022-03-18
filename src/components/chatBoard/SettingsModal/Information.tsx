import * as React from 'react';
import Select from 'react-select';
import { dateType } from '../../../reducers/userSlice';
import { monthOptions } from '../../../constants/monthOption';
import { yearOptions } from '../../../constants/yearOption';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { setSelectedModal } from '../../../reducers/globalSlice';
import Modal from './Modal';

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
  const [isDisabled, setIsDisabled] = React.useState(true);
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
    if(name !== user.name || email !== user.email || numberPhone !== user.numberPhone || date !== user.dateOfBirth.date || month !== user.dateOfBirth.month || year !== user.dateOfBirth.year || gender !== user.gender) 
    setIsDisabled(false)
    else
    setIsDisabled(true);
  },[name, email, numberPhone, date, month, year,gender])

  const handleUpdateInformation = () => {
    console.log('updated');
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
    >
      <div className="border-b-2 border-black">
        <p className="text-2xl font-bold text-left mr-20">
          {lang === 'en' ? 'User information' : 'Thông tin người dùng'}
        </p>
      </div>
      <div className="w-fit my-4 mx-auto">
        <img
          className="w-20 h-20 rounded-full"
          src={user.imgUrl}
          alt="avatart user"
        />
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
    </Modal>
  );
}
