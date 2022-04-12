import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import Modal from './Modal';
import Select from '../../Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  handleSearchFriend,
  SelectedType,
  setSelectedModal,
} from '../../../reducers/globalSlice';
import Friend from './searchedFriend';
import FullPageLoading from '../FullPageLoading';
type Props = {};

export default function MakeFriend({}: Props) {
  const lang = useAppSelector((state) => state.global.language);
  const dispatch = useAppDispatch();
  const [type, setType] = React.useState<
    'username' | 'numberPhone' | 'email'
  >('username');
  const searchedFriend = useAppSelector(
    (state) => state.global.searchedFriend
  );
  const resultSearchFriendLoading = useAppSelector(
    (state) => state.global.resultSearchFriendLoading
  );
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(
        5,
        lang === 'en'
          ? 'At least 5 characters'
          : 'Tên đăng nhập phải ít nhất 5 ký tự'
      )
      .max(
        20,
        lang === 'en'
          ? 'No more than 20 characters'
          : 'Tên đăng nhập không quá 20 ký tự'
      )
      .matches(
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        lang === 'en'
          ? 'Invalid username'
          : 'Tên đăng nhập không hợp lệ'
      ),
    numberPhone: yup
      .string()
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        lang === 'en'
          ? 'Invalid phone number'
          : 'Số điện thoại không hợp lệ'
      ),
    email: yup
      .string()
      .email(lang === 'en' ? 'Invalid email' : 'Email không hợp lệ'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const options = [
    {
      value: 'username',
      label: lang === 'en' ? 'Username' : 'Tên tài khoản',
    },
    {
      value: 'numberPhone',
      label: lang === 'en' ? 'Number phone' : 'Số điện thoại',
    },
    {
      value: 'email',
      label: 'Email',
    },
  ];
  const handleSetType = (
    value: 'username' | 'numberPhone' | 'email'
  ) => {
    setType(value);
  };
  const customType = {
    content: {
      width: 'max-content',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      height: '580px',
    },
  };
  const onSubmit = (data: {
    username?: string | undefined;
    numberPhone?: string | undefined;
    email?: string | undefined;
  }) => {
    dispatch(
      handleSearchFriend({
        type,
        value: data[type]!,
      })
    );
  };
  const selectRef = useRef<HTMLSelectElement>(null);
  const handleMouseUp = () => {
    selectRef.current?.classList.remove('hidden');
  };
  const handleMouseDown = () => {
    selectRef.current?.classList.add('hidden');
  };
  return (
    <Modal
      customStyle={customType}
      heading={
        <p className="lg:text-2xl text-md font-bold">
          {lang === 'en' ? 'Add frined' : 'Thêm bạn'}
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-4 flex flex-col h-full"
      >
        <div className="flex gap-4 border-2 rounded-xl my-2 group px-2">
          <Select
            selectRef={selectRef}
            value={type}
            onChange={handleSetType}
            options={options}
            className1="lg:text-md text-sm"
          />
          <input
            onFocus={handleMouseDown}
            className="outline-none bg-transparent my-2 w-full select-auto"
            {...register(type)}
            onBlur={handleMouseUp}
            type="text"
          />
          <br />
        </div>
        {errors && errors[type] && (
          <div className="text-red-500 text-xs italic">
            {errors[type].message}
          </div>
        )}
        <div className="overflow-auto">
          {resultSearchFriendLoading && (
            <FullPageLoading className="h-full" />
          )}
          {searchedFriend && searchedFriend.length === 0 ? (
            <p>
              {lang === 'en' ? 'No result' : 'Không tìm thấy kết quả'}
            </p>
          ) : (
            searchedFriend &&
            searchedFriend.map((friend, index) => (
              <Friend
                key={friend._id}
                _id={friend._id}
                name={friend.name}
                username={friend.username}
                imgUrl={friend.imgUrl}
              />
            ))
          )}
        </div>
        <div className="flex justify-end mt-auto mb-0 gap-8">
          <button
            onClick={() => {
              dispatch(setSelectedModal(SelectedType.NULL));
            }}
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            {lang === 'en' ? 'Cancel' : 'Hủy'}
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            {lang === 'en' ? 'Search' : 'Tìm kiếm'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
