import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { setSelectedModal } from '../../../../reducers/globalSlice';
import { SelectedType } from '../../../../reducers/globalSlice';
import Modal from '../../SettingsModal/Modal';
import Friends from '../../SettingsModal/searchedFriend';
import Select from '../../../Select';
type Props = {};
enum SelectedView {
  NULL,
  FRIENDS,
  REQUESTED,
  PENDING,
}
export default function ShowFriends({}: Props) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.global.language);
  const selectedModal = useAppSelector(
    (state) => state.global.selectedModal
  );
  const [selectView, setSelectView] = React.useState<SelectedView>(
    SelectedView.FRIENDS
  );
  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      height: '580px',
      width: '50%',
      minWidth: '620px',
    },
  };
  const friends = useAppSelector((state) => state.user.friends);
  const friendsRequested = useAppSelector(
    (state) => state.user.friendsRequested
  );
  const friendsPending = useAppSelector(
    (state) => state.user.friendsPending
  );
  const options = [
    {
      label: lang === 'en' ? 'Friends' : 'Bạn bè',
      value: SelectedView.FRIENDS,
    },
    {
      label: lang === 'en' ? 'Friends Requested' : 'Yêu cầu kết bạn',
      value: SelectedView.REQUESTED,
    },
    {
      label: lang === 'en' ? 'Friends Pending' : 'Đang chờ',
      value: SelectedView.PENDING,
    },
  ];
  const numberOfFriendRequest = friendsRequested.length;
  React.useEffect(() => {
    console.log(friends);
    console.log(selectView == 1);
  }, [selectView]);
  return (
    <div className="">
      <div className="flex gap-x-2 items-center group p-1 px-4 hover:bg-gray-400 rounded-full transition-all duration-300 h-8">
        <button
          onClick={() => {
            dispatch(setSelectedModal(SelectedType.MAKEFRIEND));
          }}
          className="hidden group-hover:block transition-all border-blue-600 hover:border-b-2"
        >
          <BiUserPlus size="24px" />
        </button>
        <button
          onClick={() => {
            dispatch(setSelectedModal(SelectedType.MAKEGROUP));
          }}
          className="hidden group-hover:block transition-all border-blue-600 hover:border-b-2"
        >
          <AiOutlineUsergroupAdd size="24px" />
        </button>
        <button
          className="relative border-blue-600 hover:border-b-2"
          onClick={() => {
            dispatch(setSelectedModal(SelectedType.SHOWFRIENDS));
          }}
        >
          <FaUserFriends size="24px" />
          {numberOfFriendRequest !== 0 && (
            <div className="absolute text-xs bg-red-500 text-gray-300 p-1 rounded-full w-5 h-5 top-0 right-0 translate-x-2 -translate-y-2">
              {numberOfFriendRequest}
            </div>
          )}
        </button>
      </div>

      {selectedModal === SelectedType.SHOWFRIENDS && (
        <Modal
          customStyle={customStyle}
          heading={
            <div>
              {lang === 'en' ? 'Friends' : 'Danh sách bạn bè'}
            </div>
          }
        >
          <div className="lg:flex p-1 gap-4 bg-green-200 my-2 rounded-2xl">
            <Select
              value={selectView!}
              onChange={(value: SelectedView) => {
                setSelectView(value);
                console.log(value);
              }}
              options={options}
              className1="lg:hidden w-full px-4"
            ></Select>
            <button
              onClick={() => setSelectView(SelectedView.FRIENDS)}
              className={` lg:block hidden cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === SelectedView.FRIENDS && 'bg-glareGreen'
              }`}
            >
              {lang === 'en' ? 'Friends' : 'Bạn bè'}
            </button>
            <button
              onClick={() => setSelectView(SelectedView.REQUESTED)}
              className={` lg:block hidden relative cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === SelectedView.REQUESTED &&
                'bg-glareGreen'
              }`}
            >
              {lang === 'en'
                ? 'Friends Requested'
                : 'Yêu cầu kết bạn'}
              {numberOfFriendRequest !== 0 && (
                <div className="absolute text-xs bg-red-500 text-gray-300 p-1 rounded-full w-5 h-5 top-0 right-0 translate-x-2 -translate-y-2">
                  {numberOfFriendRequest}
                </div>
              )}
            </button>
            <button
              onClick={() => setSelectView(SelectedView.PENDING)}
              className={`lg:block hidden cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === SelectedView.PENDING && 'bg-glareGreen'
              }`}
            >
              {lang === 'en' ? 'Friends Pending' : 'Đang chờ'}
            </button>
          </div>
          {selectView == 1 ? (
            <div className="flex lg:gap-x-4 gap-y-4 lg:flex-wrap lg:flex-row flex-col">
              {friends.map((friend, index) => (
                <Friends
                  className="w-64 h-12"
                  _id={friend._id}
                  username={friend.username}
                  imgUrl={friend.imgUrl || 'https://picsum.photos/40'}
                  name={friend.name}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
          {selectView == 2 ? (
            <div className="flex gap-1 gap-y-4 flex-wrap">
              {friendsRequested.map((friend, index) => (
                <Friends
                  className="w-64 h-12"
                  _id={friend._id}
                  username={friend.username}
                  imgUrl={friend.imgUrl || 'https://picsum.photos/40'}
                  name={friend.name}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
          {selectView == 3 ? (
            <div className="flex gap-x-4 gap-y-4 flex-wrap">
              {friendsPending.map((friend, index) => (
                <Friends
                  className="w-64 h-12"
                  _id={friend._id}
                  username={friend.username}
                  imgUrl={friend.imgUrl || 'https://picsum.photos/40'}
                  name={friend.name}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </Modal>
      )}
    </div>
  );
}
