import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { IoIosMore } from 'react-icons/io';
import LoadingSkeleton from '../../../../Common/LoadingSkeleton';
import { SocketContext } from '../../../../context/socket';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { showMessageModal } from '../../../../reducers/globalSlice';
import { getMessages } from '../../../../reducers/message';
import { handleChooseFriend, makeUnReadMessagesEmpty } from '../../../../reducers/userSlice';
import { sortConversationByLatest } from '../../../../utils/sortConversationByLatest';
type Props = {
  className?: string;
};
function ContactItem({
  numberUnRead,
  imgUrl,
  name,
  id,
}: {
  numberUnRead?: number;
  imgUrl?: string;
  name?: string;
  id: string;
}) {
  const dispatch = useAppDispatch();
  const messageList = useAppSelector((state) => state.messages.messagesList);
  const handleChangeShowMessageModal = async (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget.tagName);
    dispatch(handleChooseFriend({ conversationId: id }));
    if (event.currentTarget.tagName === 'DIV') {
      dispatch(showMessageModal());
    }
    dispatch(makeUnReadMessagesEmpty({ conversationId: id }));

    if (!Object.keys(messageList).includes(id)) {
      const result = await dispatch(
        getMessages({
          id: id,
          page: 1,
        })
      );
      const unwrap = unwrapResult(result);
      console.log(unwrap);
    }
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log('!23123123');
  };
  return (
    <div
      onClick={handleChangeShowMessageModal}
      className="mb-2 rounded-lg p-2 flex gap-x-2 items-center cursor-pointer hover:bg-gray-200"
    >
      <img src={imgUrl || 'https://picsum.photos/44'} className="w-10 h-10 rounded-lg" />
      <p className="w-7/12 truncate text-sm font-bold" title={name}>
        {name}
      </p>
      <div className="flex items-center justify-center ml-2">
        {numberUnRead ? (
          <div className="w-5 h-5 text-sm rounded-3xl text-white bg-red-500 flex items-center justify-center">
            {numberUnRead <= 5 ? numberUnRead : '5+'}
          </div>
        ) : (
          <></>
          // <button onClick={handleMoreClick} className="py-1px px-1 border rounded-lg" title="More">
          //   <IoIosMore size="24px" />
          // </button>
        )}
      </div>
    </div>
  );
}
const ContactItemLoading = () => {
  return (
    <div className="mb-2 rounded-lg p-2 flex gap-x-2">
      <LoadingSkeleton className="w-10 h-10 rounded-lg"></LoadingSkeleton>
      <p className="w-7/12 truncate text-sm font-bold">
        <LoadingSkeleton className="w-[150px] h-[15px] mt-2"></LoadingSkeleton>
      </p>
    </div>
  );
};
export default function Contacts({ className }: Props) {
  const user = useAppSelector((state) => state.user);
  const isLoading = user.loading;
  const conversations = user.conversations;
  // console.log(conversations);
  // conversations?.map((conversation) => {
  //   if (conversation.type === 'group') {
  //     conversation.groupUnRead?.filter((cc) => {
  //       console.log(cc.user);
  //     });
  //   }
  // });
  return (
    <div className={`${className} relative`}>
      <p className="font-bold italic text-gray-400">Contacts</p>
      <div
        className="overflow-y-auto shadow-xl rounded-xl py-4 px-2 bg-white contactsItem scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full"
        style={{ height: '90%' }}
      >
        {isLoading
          ? Array(5)
              .fill(0)
              .map((item, index) => <ContactItemLoading key={index} />)
          : conversations &&
            sortConversationByLatest(conversations).map((conversation, index) => {
              if (conversation.type === 'direct') {
                return (
                  <ContactItem
                    key={index}
                    imgUrl={conversation.participants.filter((u) => u._id !== user._id)[0].imgUrl}
                    name={conversation.participants.filter((u) => u._id !== user._id)[0].name}
                    id={conversation._id}
                    numberUnRead={(() =>
                      conversation.unreadmessages
                        ? conversation.unreadmessages.filter(
                            (message) => message.senderId !== user._id
                          ).length
                        : 0)()}
                  />
                );
              } else if (conversation.type === 'group') {
                return (
                  (
                    <ContactItem
                      key={index}
                      id={conversation._id}
                      numberUnRead={
                        conversation.groupUnRead?.filter((cc) => cc.user === user._id)[0]?.messages
                          .length
                      }
                      imgUrl={conversation.imgUrl}
                      name={conversation.name}
                    />
                  ) || <></>
                );
              }
            })}
      </div>
    </div>
  );
}
