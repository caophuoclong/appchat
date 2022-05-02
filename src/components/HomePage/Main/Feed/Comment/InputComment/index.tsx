import React from 'react';

type Props = {};

export default function InputComment({}: Props) {
  return (
    <div className="mx-4 flex items-center gap-x-4">
      <img
        src="https://picsum.photos/40"
        alt=""
        className="w-10 h-10 rounded-full flex items-center"
      />
      <div className="rounded-2xl w-full border bg-gray-200">
        <input
          type="text"
          className="w-full outline-none p-1 bg-transparent text-lg px-2 text-black placeholder:text-gray-500 placeholder:italic"
          placeholder="Comment"
        />
      </div>
    </div>
  );
}
