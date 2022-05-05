import moment from 'moment';
import React, { ChangeEvent, ReactEventHandler, useContext } from 'react';
import { VscChromeMinimize, VscChromeClose, VscChevronDown } from 'react-icons/vsc';
import { FaTimes } from 'react-icons/fa';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { BiPaperPlane } from 'react-icons/bi';
import { ReactComponent as Love } from '../../../assets/icons/love.svg';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { hideMessageModal } from '../../../reducers/globalSlice';
import { InputBox } from '../../chatBoard/mainChat/ChatBox/InputBox';
import { Link } from 'react-router-dom';
import { GroupMessageBaseOnDatetime } from '../../../utils/groupMessageBaseOnDatetime';
import { Left, Right } from '../../chatBoard/mainChat/ChatBox/MessageList/Message';
import { ComponentScroll } from '../../chatBoard/mainChat/ChatBox';
import { handleChooseFriend } from '../../../reducers/userSlice';
import { SocketContext } from '../../../context/socket';
import conversationApi from '../../../services/conversation.api';
type Props = {
  className?: string;
};

export default function Message({ className }: Props) {
  const fillColor = 'blue';
  const textColor = 'white';
  const dispatch = useAppDispatch();
  const [sendText, setSendText] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const inputForm = React.useRef<HTMLDivElement>(null);
  const functionForm = React.useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user);
  const socket = useContext(SocketContext);
  const handleOnChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        dispatch(hideMessageModal());
        return;

      default:
        return;
    }
  };
  React.useEffect(() => {
    const x1 = functionForm.current;
    const x2 = inputForm.current;
    if (x1 && x2) {
      if (message.length > 0) {
        x1.classList.remove('w-2/6');
        x1.classList.add('w-1/6');
        x2.classList.remove('w-3/6');
        x2.classList.add('w-4/6');
        setSendText(true);
      } else {
        x1.classList.add('w-2/6');
        x1.classList.remove('w-1/6');
        x2.classList.add('w-3/6');
        x2.classList.remove('w-4/6');
        setSendText(false);
      }
    }
  }, [message]);
  const handleCloseMessageModal = () => {
    dispatch(handleChooseFriend({ conversationId: '' }));
    socket.emit(
      'choose_conversation',
      JSON.stringify({
        user_id: user._id,
        conversation_id: '',
      })
    );
    dispatch(hideMessageModal());
  };
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const conversations = useAppSelector((state) => state.user.conversations);
  const choosenConversation = conversations?.find(
    (conversation) => conversation._id === choosenFriend.conversationId
  );
  const conversationInfo: {
    name?: string;
    imgUrl?: string;
    id?: string;
  } = {
    name: '',
    imgUrl: '',
  };
  if (choosenConversation?.type === 'group') {
    conversationInfo.name = choosenConversation.name;
    conversationInfo.imgUrl = choosenConversation.imgUrl;
  } else if (choosenConversation?.type === 'direct') {
    conversationInfo.name = choosenConversation.participants.filter(
      (participant) => participant._id !== user._id
    )[0].name;
    conversationInfo.imgUrl = choosenConversation.participants.filter(
      (participant) => participant._id !== user._id
    )[0].imgUrl;
    conversationInfo.id = choosenConversation.participants.filter(
      (participant) => participant._id !== user._id
    )[0]._id;
  }
  const moreOption = React.useRef<HTMLDivElement>(null);
  const xxx = React.useRef<HTMLDivElement>(null);
  const [showMoreOption, setShowMoreOption] = React.useState(false);
  const handleDropdownClick = () => {
    setShowMoreOption(!showMoreOption);
  };
  const messageList = useAppSelector((state) => state.messages.messagesList)[
    choosenFriend.conversationId
  ];
  const messageListAfterGroup = messageList && GroupMessageBaseOnDatetime(messageList?.messages);
  const isOnline = user.friends.filter((friend) => friend._id === conversationInfo.id)[0]?.isOnline;
  socket.emit(
    'choose_conversation',
    JSON.stringify({
      user_id: user._id,
      conversation_id: choosenFriend.conversationId,
    })
  );
  choosenConversation?.type === 'direct' && socket.emit('check_online', conversationInfo.id);
  React.useEffect(() => {
    conversationApi.makeUnReadMessagesEmpty(choosenFriend.conversationId);
  }, [choosenFriend.conversationId]);
  return (
    <div className={`${className} flex flex-col`} style={{ height: '45%' }}>
      {showMoreOption && (
        <div
          ref={moreOption}
          className="absolute -left-1/3 -translate-x-3/4 bg-white border p-2 w-96 flex flex-col gap-y-2 rounded-lg"
        >
          <button
            onClick={() => {
              setShowMoreOption(false);
            }}
            className="absolute right-1 top-1 z-50 p-1 hover:bg-gray-200 rounded-full"
          >
            <FaTimes size="18px" />
          </button>
          <Link
            to={`/messages/${choosenFriend.conversationId}`}
            className="rounded-lg hover:bg-gray-200 p-2 font-bold"
          >
            Open in cyper chat
          </Link>
        </div>
      )}
      <div className="flex items-center py-1px border-b shadow-lg">
        <div
          ref={xxx}
          onClick={handleDropdownClick}
          className="flex gap-x-1 items-center hover:bg-gray-200 px-2 rounded-lg cursor-pointer"
          style={{
            maxWidth: '70%',
            minWidth: '70%',
          }}
        >
          <>
            <div className="relative">
              <img
                className="w-9 h-9 rounded-full"
                src={conversationInfo.imgUrl || 'https://picsum.photos/40'}
                alt=""
              />
              {conversationInfo.id &&
                (isOnline ? (
                  <div className="absolute w-3 h-3 rounded-full bg-green-500 right-0 bottom-1"></div>
                ) : (
                  <div className="absolute w-3 h-3 rounded-full bg-red-500 right-0 bottom-1"></div>
                ))}
            </div>
            <div className="w-3/5">
              <p className="truncate  font-bold text-sm">{conversationInfo.name}</p>
              <p className="text-xs font-bold text-gray-400">
                {moment(new Date(2022, 3, 24, 10, 25)).fromNow()}
              </p>
            </div>
          </>
          <div className="ml-auto">
            <VscChevronDown size="24px" color="black" />
          </div>
        </div>
        <div className="flex  gap-x-2 w-3/5 justify-end">
          <button className="text-blue-500 hover:bg-blue-500 hover:text-white rounded-full p-2px">
            <VscChromeMinimize size="18px" />
          </button>
          <button
            onClick={handleCloseMessageModal}
            className="text-blue-500 hover:bg-blue-500 hover:text-white rounded-full p-2px"
          >
            <VscChromeClose size="18px" />
          </button>
        </div>
      </div>

      <ComponentScroll className="bg-white h-full overflow-y-auto">
        <>
          {messageListAfterGroup?.map((message) => (
            <div key={message.date}>
              <p className="text-center text-sm italic font-medium text-gray-300">
                {new Date(message.date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: 'numeric',
                })}
              </p>
              {message.messageList?.map((message, index) => {
                const date = new Date(message.createAt).getTime();
                if (message.senderId !== user._id) {
                  return (
                    <Left
                      key={index}
                      date={date}
                      message={message.text}
                      type={message.type}
                      className="break-words max-w-3/4 py-2 px-2 text-sm lg:text-xs"
                    />
                  );
                } else {
                  return (
                    <Right
                      key={index}
                      date={date}
                      message={message.text}
                      type={message.type}
                      className="break-words max-w-3/4 py-2 px-2 text-sm lg:text-xs"
                    />
                  );
                }
              })}
            </div>
          ))}
        </>
      </ComponentScroll>

      <InputBox className="p-1 relative text-black" />

      {/* <div className="mt-auto py-2 group flex gap-x-2">
        <div ref={functionForm} className="w-2/6 transition-all duration-400 flex px-2">
          <button>
            <AiFillPlusCircle size="20px" fill={fillColor} color={textColor} />
          </button>
          <button>
            <BsFillFileEarmarkImageFill size="20px" fill={fillColor} color={textColor} />
          </button>
        </div>
        <div ref={inputForm} className="w-3/6 bg-gray-200 rounded-lg transition-all duration-400">
          <input
            value={message}
            onChange={handleOnChangeMessage}
            onKeyDown={handleKeyDown}
            type="text"
            className="bg-transparent w-full outline-none px-2"
            placeholder="Tin nhan"
            autoFocus
          />
        </div>
        <button className="w-1/6 flex justify-center">
          {sendText ? <BiPaperPlane size="24px" color={'blue'} /> : <Love width={24} height={24} />}
        </button>
      </div> */}
    </div>
  );
}
