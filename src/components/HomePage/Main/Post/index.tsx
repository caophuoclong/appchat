import React from 'react';

type Props = {};

export default function Post({}: Props) {
  return (
    <div className="border shadow-lg rounded-xl p-4 flex items-center gap-x-4">
      <img src="https://picsum.photos/44" alt="" className="w-11 h-11 rounded-xl" />
      <div
        className="w-full cursor-pointer font-bold"
        style={{
          color: '#ABB6C3',
        }}
      >
        What's new, Phuoc Long?
      </div>
      <button className="rounded-xl bg-blue-500 p-3 text-sm whitespace-nowrap text-white font-bold">
        Post It!
      </button>
    </div>
  );
}
