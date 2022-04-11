import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { setSelectedModal } from '../../../../reducers/globalSlice';
import Modal from '../../SettingsModal/Modal';
import Friends from '../../SettingsModal/searchedFriend';
type Props = {};

export default function ShowFriends({}: Props) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.global.language);
  const selectedModal = useAppSelector(
    (state) => state.global.selectedModal
  );
  const [selectView, setSelectView] = React.useState<
    'friends' | 'requested' | 'pending' | null
  >('friends');
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
  const numberOfFriendRequest = friendsRequested.length;
  return (
    <div className="">
      <button
        className="relative"
        onClick={() => {
          dispatch(setSelectedModal('showFriends'));
        }}
      >
        <FaUserFriends size="24px" />
        {numberOfFriendRequest !== 0 && (
          <div className="absolute text-xs bg-red-500 text-gray-300 p-1 rounded-full w-5 h-5 top-0 right-0 translate-x-2 -translate-y-2">
            {numberOfFriendRequest}
          </div>
        )}
      </button>
      {selectedModal === 'showFriends' && (
        <Modal
          customStyle={customStyle}
          heading={
            <div>
              {lang === 'en' ? 'Friends' : 'Danh sách bạn bè'}
            </div>
          }
        >
          <div className="flex p-1 gap-4 bg-green-200 my-2 rounded-2xl">
            <button
              onClick={() => setSelectView('friends')}
              className={` cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === 'friends' && 'bg-glareGreen'
              }`}
            >
              {lang === 'en' ? 'Friends' : 'Bạn bè'}
            </button>
            <button
              onClick={() => setSelectView('requested')}
              className={`relative cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === 'requested' && 'bg-glareGreen'
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
              onClick={() => setSelectView('pending')}
              className={` cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${
                selectView === 'pending' && 'bg-glareGreen'
              }`}
            >
              {lang === 'en' ? 'Friends Pending' : 'Đang chờ'}
            </button>
          </div>
          {selectView === 'friends' ? (
            <div className="flex gap-x-4 gap-y-4 flex-wrap">
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
          {selectView === 'requested' ? (
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
          {selectView === 'pending' ? (
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
