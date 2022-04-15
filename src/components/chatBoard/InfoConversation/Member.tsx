import React from 'react';
import { useAppSelector } from '../../../hook';

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
        <img src={imgUrl || 'https://picsum.photos/56'} alt="" className="rounded-full h-11 w-11" />
      </div>
      <div className="flex flex-col justify-center">
        <p>{name}</p>
        {isCreator && <p className="text-xs ">{lang === 'en' ? 'Owner' : 'Trưởng nhóm'}</p>}
      </div>
    </div>
  );
}
