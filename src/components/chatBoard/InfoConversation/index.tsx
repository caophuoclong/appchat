import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go';
import Member from './Member';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiTimes } from 'react-icons/ti';
import { SelectedType, setHideGroupDetail, setSelectedModal } from '../../../reducers/globalSlice';
import UpdateInfoGroup from './updateInfoGroup';

interface Props {}

export default function InforConversation({}: Props) {
  const lang = useAppSelector((state) => state.global.language);
  const conversation = useAppSelector((state) => state.global.conversation);
  const btnAddMember = React.useRef<HTMLDivElement>(null);
  const memberList = React.useRef<HTMLDivElement>(null);
  const [showGroupMember, setShowGroupMember] = React.useState(false);
  const [showEditName, setShowEditName] = React.useState(false);
  const handleShowGroupMember = () => {
    setShowGroupMember(!showGroupMember);
  };
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (btnAddMember.current) {
      btnAddMember.current.classList.add('fixed');
    }
    if (memberList.current) {
      if (memberList.current.scrollTop === 0) {
        btnAddMember.current?.classList.remove('fixed');
      }
    }
  };
  const dispatch = useAppDispatch();
  const handleAddMember = () => {
    dispatch(setSelectedModal(SelectedType.ADDMEMBER));
  };
  return (
    <div className="lg:w-4/12 w-11/12  border relative">
      <button
        onClick={() => {
          dispatch(setHideGroupDetail());
        }}
        className="absolute right-2 top-2 rounded-full hover:bg-gray-400"
      >
        <TiTimes size="24px" />
      </button>

      <div className="text-center border-b p-4 lg:text-2xl text-sm font-bold">
        {lang === 'en' ? 'Group info' : 'Thông tin nhóm'}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center border-b py-4">
        <img
          src={conversation.imgUrl}
          alt="avatar group"
          className="rounded-full lg:w-14 lg:h-14 w-12 h-12"
        />
        <div className="lg:text-3xl text-md font-bold flex gap-x-2 items-center">
          {conversation.name}
          <button className="p-1 rounded-full bg-gray-400">
            <AiOutlineEdit size="16px" />
          </button>
        </div>
      </div>
      <div className="border-b p-2">
        <div
          className="text-sm font-medium flex justify-between items-center cursor-pointer group"
          onClick={handleShowGroupMember}
        >
          <p>{lang === 'en' ? 'Members' : 'Thành viên nhóm'}</p>
          <div
            className={`${showGroupMember ? 'rotate-90' : ''} transition-all duration-300 ml-auto`}
          >
            <GoTriangleRight size="12px" />
          </div>
        </div>
      </div>
      {showGroupMember && (
        <div
          ref={memberList}
          onScroll={handleScroll}
          className="h-80 overflow-y-auto px-2 py-4 border-b"
        >
          <div>
            <div
              onClick={handleAddMember}
              className="bg-gray-400 rounded-md p-1 mx-auto w-fit cursor-pointer text-sm lg:text-base mb-4"
            >
              {lang === 'en' ? 'Add members' : 'Thêm thành viên'}
            </div>
          </div>
          <Member
            name={conversation.creator!.name!}
            imgUrl={conversation.creator!.imgUrl!}
            isCreator
          />
          {conversation.participants.map((participant, index) => (
            <Member key={index} name={participant.name} imgUrl={participant.imgUrl} />
          ))}
        </div>
      )}
      {showEditName && <UpdateInfoGroup />}
    </div>
  );
}
