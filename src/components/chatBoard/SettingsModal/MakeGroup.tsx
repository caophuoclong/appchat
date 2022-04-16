import React from 'react';
import { BsCamera } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../hook';
import Modal from './Modal';
import { readFile } from '../../../utils';
import { SearchBox } from '../leftBar/SearchBox';
import {
  SelectedType,
  setConversationChoosen,
  setSelectedModal,
} from '../../../reducers/globalSlice';
import { addMemberToGroup, createGroupChat } from '../../../reducers/userSlice';
import { CLOUD_NAME } from '../../../configs';
import { uploadImage } from '../../../services';
import FullPageLoading from '../mainChat/ChatBox/MessageList/FullPageLoading';
import { unwrapResult } from '@reduxjs/toolkit';
import sw2 from 'sweetalert2';
import { IConversation } from '../../../interface/IUser';
import { SocketContext } from '../../../context/socket';
import notiApi from '../../../services/notification';
type Props = {};

export default function MakeGroup({}: Props) {
  const lang = useAppSelector((state) => state.global.language);
  const selectedModal = useAppSelector((state) => state.global.selectedModal);
  const [groupAvatar, setGroupAvatar] = React.useState<string | ArrayBuffer>('');
  const socket = React.useContext(SocketContext);
  const conversation = useAppSelector((state) => state.global.conversation);
  const user = useAppSelector((state) => state.user);
  const heading =
    SelectedType.MAKEGROUP === selectedModal ? (
      <p className="lg:text-2xl  text-sm font-bold">
        {lang === 'en' ? 'Create group' : 'Tạo nhóm'}
      </p>
    ) : (
      <p className="lg:text-2xl  text-sm font-bold">
        {lang === 'en' ? 'Add memberes' : 'Thêm thành viên'}
      </p>
    );
  const friends = useAppSelector((state) => state.user.friends);
  const userId = useAppSelector((state) => state.user._id);
  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      height: '90%',
      width: '25%',
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
  const [listIdFriends, setListIdFriends] = React.useState<Array<string>>([]);
  const participants = useAppSelector((state) => state.global.conversation.participants);
  const chossenFriend = useAppSelector((state) => state.user.choosenFriend.conversationId);
  const [newConversation, setNewConversation] = React.useState<IConversation>({} as IConversation);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const x: string[] = [];
    if (participants) participants.forEach((participant) => x.push(participant._id));
    setListIdFriends(x);
  }, [participants]);
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
  React.useEffect(() => {}, []);
  const handleCreateGroupChat = async () => {
    setLoading(true);
    const friendChecked = document.getElementsByName(
      'friendWishAddToGroup'
    ) as NodeListOf<HTMLInputElement>;
    const listFriend: Array<string> = [];
    friendChecked.forEach((friend) => {
      if (friend.checked) {
        listFriend.push(friend.id.split('_')[1]);
      }
    });
    if (SelectedType.ADDMEMBER === selectedModal) {
      const actionResult = await dispatch(
        addMemberToGroup({
          participants: listFriend,
          conversationId: chossenFriend,
        })
      );
      const unwrap = unwrapResult(actionResult);
      console.log(unwrap);
      listFriend.forEach((friend) => {
        unwrap[0].groupUnRead!.push({
          user: friend,
          messages: [],
        });
      });

      dispatch(setConversationChoosen(unwrap[0]));
      setNewConversation(unwrap[0]);
      setLoading(false);
    } else {
      let url;
      if (groupAvatar) {
        const data = await uploadImage(groupAvatar!);
        url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${data.data.version}/${data.data.public_id}.png`;
      }
      const actionResult = await dispatch(
        createGroupChat({
          name: inputText,
          participants: listFriend,
          avatar: url ? url : 'https://picsum.photos/56',
        })
      );
      try {
        const unwrap = unwrapResult(actionResult);
        setNewConversation(unwrap);
        sw2.fire({
          icon: 'success',
          text: lang === 'en' ? 'Create group successfully!' : 'Tạo nhóm thành công!',
          timer: 1500,
        });
        dispatch(setSelectedModal(SelectedType.NULL));
      } catch (error) {}
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (newConversation.participants) {
      newConversation.participants.forEach(async (participant) => {
        if (participant._id !== user._id) {
          socket.emit(
            'add_conversation',
            JSON.stringify({
              id: participant._id,
              conversation: newConversation,
            })
          );
          await notiApi.addNotification({
            notification: {
              type: 'addToGroup',
              user: userId,
              group: newConversation._id,
            },
            _id: participant._id,
          });
          socket.emit('live_noti', participant._id);
        }
      });
    }
  }, [socket, newConversation]);
  return (
    <Modal customStyle={customStyle} heading={heading}>
      {loading ? <FullPageLoading /> : <></>}
      <div className="flex flex-col h-full">
        {selectedModal === SelectedType.MAKEGROUP && (
          <div className="flex my-4 justify-between">
            <input
              onChange={(event: React.ChangeEvent) => {
                const file = (event.target! as HTMLInputElement)!.files![0];
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
              placeholder={lang === 'en' ? 'Enter group name' : 'Nhập tên nhóm'}
              className="w-3/4 lg:text-2xl text-md font-bold p-0 outline-none"
            />
          </div>
        )}
        <p className="lg:text-md text-sm font-semibold ">
          {lang === 'en' ? 'Add friends to group' : 'Thêm bạn bè vào nhóm'}
        </p>
        <SearchBox onSearch={handleSearch} className="mx-0 rounded-md" />

        <p
          className={`text-md font-bold text-right text-blue-400 ${
            !!count ? 'visible' : 'invisible'
          }`}
        >
          {count}/100
        </p>

        <div className="h-4/6 my-4 overflow-y-auto">
          {friends.map((friend, index) => {
            if (selectedModal === SelectedType.ADDMEMBER) {
              return (
                <div key={index} className="mb-4">
                  {friend.name!.toLowerCase().match(searchText.toLowerCase()) &&
                    !listIdFriends.includes(friend._id) &&
                    friend._id !== conversation.creator!._id && (
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
                          src={friend.imgUrl || 'https://picsum.photos/40'}
                          alt={`Avatar ${friend.name}`}
                        />
                        <span className="truncate">{friend.name}</span>
                      </label>
                    )}
                </div>
              );
            } else
              return (
                <div key={index} className="mb-4">
                  {friend.name!.toLowerCase().match(searchText.toLowerCase()) && (
                    <label className="flex gap-2 items-center " htmlFor={`checkbox_${friend._id}`}>
                      <input
                        onChange={handleCountFriendChecked}
                        type="checkbox"
                        id={`checkbox_${friend._id}`}
                        name="friendWishAddToGroup"
                        className="text-lg rounded-full"
                      />
                      <img
                        className="w-11 h-11 rounded-full"
                        src={friend.imgUrl || 'https://picsum.photos/40'}
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
            disabled={isDisabled && selectedModal === SelectedType.MAKEGROUP}
            onClick={handleCreateGroupChat}
            className=" text-glareGray200 p-2 px-4 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/50"
          >
            {selectedModal === SelectedType.MAKEGROUP
              ? lang === 'en'
                ? 'Create'
                : 'Tạo nhóm'
              : lang === 'en'
              ? 'Add'
              : 'Thêm'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
