import React from 'react';
import { useAppSelector } from '../../../hook';
import { RiKey2Line } from 'react-icons/ri';
type Props = {
  name: string;
  imgUrl: string;
  isCreator?: boolean;
};

export default function Member({ name, imgUrl, isCreator = false }: Props) {
  const lang = useAppSelector((state) => state.global.language);
  return (
    <div className="mb-4 flex gap-x-2">
      <div className="relative">
        <img
          src={imgUrl || 'https://picsum.photos/56'}
          alt=""
          className="rounded-full lg:h-11 lg:w-11 w-8 h-8"
        />
        {isCreator && (
          <div
            className="absolute bg-gray-400 rounded-full top-1/2 left-1/2 translate-x-1/4 translate-y-1/3"
            style={{
              padding: '2px',
            }}
          >
            <RiKey2Line size="16px" color="yellow" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <p className="truncate">{name}</p>
        {isCreator && <p className="text-xs ">{lang === 'en' ? 'Owner' : 'Trưởng nhóm'}</p>}
      </div>
    </div>
  );
}
