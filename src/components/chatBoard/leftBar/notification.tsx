import moment from 'moment';
import React from 'react';
import { BsBellFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { markSeenNoti } from '../../../reducers/userSlice';
type Props = {};

function Content({
  lang,
  type,
  children,
}: {
  lang: string;
  type: string;
  children: string;
}) {
  if (type === 'makeFriend')
    return (
      <>
        <span className="font-semibold text-md">{children}</span>
        <p className="text-sm pr-6">
          {lang === 'en'
            ? ' sent you friend request'
            : ' đã gửi lời mời kết bạn cho bạn.'}
        </p>
      </>
    );
  else if (type === 'acceptFriend')
    return (
      <>
        <span className="font-bold">{children}</span>
        <p className="text-sm pr-6">
          {lang === 'en'
            ? ' have accepted your friend request'
            : ' đã đồng ý lời mời kết bạn của bạn.'}
        </p>
      </>
    );
  else return <p>Test noti</p>;
}

export default function Notification({}: Props) {
  const notifications = useAppSelector(
    (state) => state.user.notifications
  );
  const lang = useAppSelector((state) => state.global.language);
  const [numberOfNonSeenNoti, setNumberOfNonSeenNoti] =
    React.useState(0);
  const dispatch = useAppDispatch();
  const modal = React.useRef<HTMLDivElement>(null);
  const handleOnShowNotifiModal = () => {
    const modal1 = modal!.current as HTMLDivElement;
    if (modal1.classList.contains('visible')) {
      modal1.classList.remove('visible');
      modal1.classList.add('invisible');
    } else {
      modal1.classList.add('visible');
      modal1.classList.remove('invisible');
    }
  };
  React.useEffect(() => {
    setNumberOfNonSeenNoti(
      notifications.filter(
        (notification) => notification.seen === false
      ).length
    );
  }, [notifications]);
  const handleMarkReadNoti = (_id: string) => {
    dispatch(markSeenNoti(_id));
  };
  return (
    <div className="px-4 relative">
      <button className="relative" onClick={handleOnShowNotifiModal}>
        <BsBellFill size="24px" />
        {numberOfNonSeenNoti !== 0 && (
          <div className="absolute text-xs bg-red-500 text-gray-300 p-1 rounded-full w-5 h-5 top-0 right-0 translate-x-2 -translate-y-2 ">
            {numberOfNonSeenNoti}
          </div>
        )}
      </button>
      <div
        ref={modal}
        className="absolute top-0 -right-2 translate-x-full w-96 h-52 bg-white shadow-2xl transition-all rounded-3xl border border-gray-300 invisible p-2 overflow-auto z-50"
      >
        <div className="flex justify-end pr-4">
          <button onClick={handleOnShowNotifiModal}>
            <FaTimes size="24px" />
          </button>
        </div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            onClick={() => {
              handleMarkReadNoti(notification._id);
            }}
            className="mb-4 mt-2 flex gap-2 items-center cursor-pointer relative"
          >
            <img
              src={
                notification.user.imgUrl || 'https://picsum.photos/40'
              }
              alt="avatar"
              className="w-10 h-10r rounded-full"
            />
            <div className="ml-10">
              <Content type={notification.type} lang={lang}>
                {notification.user.name}
              </Content>
              <p className="text-xs text-blue-500">
                {moment(notification.date).fromNow()}
              </p>
            </div>
            {!notification.seen && (
              <div className="absolute w-5 h-5 bg-blue-500 rounded-full right-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
