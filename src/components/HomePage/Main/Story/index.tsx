import React from 'react';
import { BsPlus } from 'react-icons/bs';
type Props = {};
function Item({
  first = false,
  username,
  img,
  backgroundImage,
}: {
  first?: boolean;
  username?: string;
  img?: string;
  backgroundImage: string;
}) {
  return (
    <div
      className={`rounded-xl relative`}
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        width: '140px',
        height: '230px',
      }}
    >
      {!first && (
        <div className="p-1 rounded-lg border-2 border-white inline-block absolute w-10 h-10 box-border translate-x-1/2 translate-y-1/2">
          <img src={img || ''} alt="" className="rounded-lg" />
        </div>
      )}
      {first && (
        <div
          className="absolute rounded-lg w-10 h-10 border-white border-2 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 box-border"
          style={{ padding: '2px' }}
        >
          <div className="bg-white rounded-lg h-full flex items-center justify-center">
            <BsPlus size="24px" color="blue" />
          </div>
        </div>
      )}

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-white font-semibold">
        {username || 'Add Story'}
      </p>
    </div>
  );
}
export default function Story({}: Props) {
  return (
    <div className="flex gap-x-6 overflow-x-auto items-center justify-around">
      <Item first backgroundImage="https://picsum.photos/200" />
      <Item
        backgroundImage="https://picsum.photos/200"
        img="https://picsum.photos/200"
        username="Phuoc Long"
      />
      <Item
        backgroundImage="https://picsum.photos/200"
        img="https://picsum.photos/200"
        username="Phuoc Long"
      />
      <Item
        backgroundImage="https://picsum.photos/200"
        img="https://picsum.photos/200"
        username="Phuoc Long"
      />
      <Item
        backgroundImage="https://picsum.photos/200"
        img="https://picsum.photos/200"
        username="Phuoc Long"
      />
    </div>
  );
}
