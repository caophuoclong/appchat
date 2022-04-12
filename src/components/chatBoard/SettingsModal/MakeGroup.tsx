import React from 'react';
import { BsCamera } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../hook';
import Modal from './Modal';
import { readFile } from '../../../utils';
import { SearchBox } from '../leftBar/SearchBox';
import {
  SelectedType,
  setSelectedModal,
} from '../../../reducers/globalSlice';
type Props = {};

export default function MakeGroup({}: Props) {
  const lang = useAppSelector((state) => state.global.language);
  const [groupAvatar, setGroupAvatar] = React.useState<
    string | ArrayBuffer
  >('');
  const heading = (
    <p className="lg:text-2xl  text-sm font-bold">
      {lang === 'en' ? 'Create group' : 'Tạo nhóm'}
    </p>
  );
  const friends = useAppSelector((state) => state.user.friends);
  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      height: '90%',
      width: '50%',
    },
  };
  const handleSearch = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchText(value);
  };
  const [searchText, setSearchText] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [inputText, setInputText] = React.useState('');
  const dispatch = useAppDispatch();
  const handleCountFriendChecked = () => {
    const friendChecked = document.getElementsByName(
      'friendWishAddToGroup'
    ) as NodeListOf<HTMLInputElement>;
    let count1 = 0;
    friendChecked.forEach((friend) => {
      if (friend.checked) {
        count1 += 1;
      }
    });
    setCount(count1);
  };
  React.useEffect(() => {
    inputText && !!count && setIsDisabled(false);
  }, [inputText, count]);
  return (
    <Modal customStyle={customStyle} heading={heading}>
      <div className="flex flex-col h-full">
        <div className="flex my-4 justify-between">
          <input
            onChange={(event: React.ChangeEvent) => {
              const file = (event.target! as HTMLInputElement)!
                .files![0];
              readFile(file).then((result) => {
                setGroupAvatar(result);
              });
            }}
            type="file"
            accept="img/"
            hidden
            id="groupAvatar"
          />
          <label htmlFor="groupAvatar">
            {!groupAvatar && (
              <div className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center bg-gray-200">
                <BsCamera size="24px" />
              </div>
            )}
            {groupAvatar && (
              <img
                src={groupAvatar as string}
                alt="group avatar"
                className="w-12 h-12 rounded-full"
              />
            )}
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(event: React.ChangeEvent) => {
              const value = event.target as HTMLInputElement;
              setInputText(value.value);
            }}
            placeholder={
              lang === 'en' ? 'Enter group name' : 'Nhập tên nhóm'
            }
            className="w-3/4 lg:text-2xl text-md font-bold p-0 outline-none"
          />
        </div>
        <p className="lg:text-md text-sm font-semibold ">
          {lang === 'en'
            ? 'Add friends to group'
            : 'Thêm bạn bè vào nhóm'}
        </p>
        <SearchBox
          onSearch={handleSearch}
          className="mx-0 rounded-md"
        />

        <p
          className={`text-md font-bold text-right text-blue-400 ${
            !!count ? 'visible' : 'invisible'
          }`}
        >
          {count}/100
        </p>

        <div className="h-4/6 my-4 overflow-y-auto">
          {friends.map((friend, index) => {
            console.log(index);
            return (
              <div key={index}>
                {friend
                  .name!.toLowerCase()
                  .match(searchText.toLowerCase()) && (
                  <label
                    className="flex gap-2 items-center "
                    htmlFor={`checkbox_${friend._id}`}
                  >
                    <input
                      onChange={handleCountFriendChecked}
                      type="checkbox"
                      id={`checkbox_${friend._id}`}
                      name="friendWishAddToGroup"
                      className="text-lg rounded-full"
                    />
                    <img
                      className="w-11 h-11 rounded-full"
                      src={
                        friend.imgUrl || 'https://picsum.photos/40'
                      }
                      alt={`Avatar ${friend.name}`}
                    />
                    <span className="truncate">{friend.name}</span>
                  </label>
                )}
              </div>
            );
          })}
          <div></div>
        </div>
        <div className="mt-auto mb-2 flex gap-4 flex-row-reverse">
          <button
            onClick={() => {
              dispatch(setSelectedModal(SelectedType.NULL));
            }}
            className=" text-glareGray200 p-2 px-4 rounded-xl bg-gray-500 shadow-lg shadow-gray-500/50"
          >
            {lang === 'en' ? 'Cancel' : 'Huỷ'}
          </button>
          <button
            disabled={isDisabled}
            // onClick={}
            className=" text-glareGray200 p-2 px-4 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/50"
          >
            {lang === 'en' ? 'Create' : 'Tạo nhóm'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
