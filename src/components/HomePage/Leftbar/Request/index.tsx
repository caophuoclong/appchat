import React from 'react';
import { useAppSelector } from '../../../../hook';

type Props = {};

function Item({
  image,
  name,
  id,
  onAccept,
  onDecline,
}: {
  image?: string;
  name: string;
  id: string;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-4">
      <div className="flex gap-4 w-full">
        <img
          src={image || 'https://picsum.photos/40'}
          alt="avatar"
          className="w-10 h-10 rounded-xl"
        />
        <p>
          <span className="font-semibold">{name}</span> wants to <br />
          add you to friends
        </p>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          onClick={() => {
            onAccept(id);
          }}
          className="py-2 px-4 border rounded-xl text-white bg-blue-600  hover:bg-blue-800 transition-colors duration-400"
        >
          Aceept
        </button>
        <button
          onClick={() => {
            onDecline(id);
          }}
          className="py-2 px-4 border rounded-xl hover:bg-gray-200"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default function Request({}: Props) {
  const handleAccepFriend = (id: string) => {};
  const handleDeclineFriend = (id: string) => {};
  const friendRequest = useAppSelector((state) => state.user.friendsRequested);
  const test = [
    {
      image: 'https://picsum.photos/40',
      name: 'Phuoclong',
      id: '1',
    },
    {
      image: 'https://picsum.photos/40',
      name: 'ManMan',
      id: '2',
    },
  ];
  return (
    <div className="">
      {friendRequest.map((item, key) => (
        <Item
          key={key}
          name={item.name}
          image={item.imgUrl}
          id={item._id}
          onAccept={handleAccepFriend}
          onDecline={handleDeclineFriend}
        />
      ))}
    </div>
  );
}
