import React from 'react';
import { AiOutlinePlusSquare, AiOutlineSearch } from 'react-icons/ai';
type Props = {};

export default function Header({}: Props) {
  return (
    <div className="flex justify-between py-2 px-8 border sticky top-0 z-50 bg-white header">
      <div className="flex gap-x-2 items-center">
        <img src="https://picsum.photos/56" alt="" className="w-12 h-12 rounded-md" />
        <span className="font-bold text-3xl italic">Spectrum</span>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="rounded-md  flex items-center p-2 h-10" style={{ background: '#F4F5F8' }}>
          <AiOutlineSearch size="24px" color="gray" />
          <input
            type="text"
            className="text-lg bg-transparent p-2 outline-none"
            placeholder="Search"
          />
        </div>
        <button className="p-2 rounded-md flex bg-blue-500 h-10 text-white">
          <AiOutlinePlusSquare size="24px" />
          Create
        </button>
      </div>
    </div>
  );
}
