import React from 'react';
import { BiLike } from 'react-icons/bi';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { ReactComponent as Sad } from '../../../../../assets/icons/sad.svg';
import { ReactComponent as Haha } from '../../../../../assets/icons/haha.svg';
import { ReactComponent as Like } from '../../../../../assets/icons/like.svg';
import { ReactComponent as Love } from '../../../../../assets/icons/love.svg';
type Props = {};

export default function DropInteract({}: Props) {
  return (
    <div className="mx-4 px-4 border-b  box-border">
      <div className="grid grid-cols-3 my-2">
        <div className="group flex justify-center items-cemter font-bold gap-x-2 hover:bg-gray-400 p-2 rounded-xl relative">
          <BiLike size="24px" />
          Like
          <div className="absolute invisible group-hover:visible -top-1/2 rounded-xl border-2 -translate-y-1/2 left-0 flex gap-x-4 bg-white p-1px">
            <button title="Like">
              <Like width={32} height={32} />
            </button>
            <button title="Love">
              <Love width={32} height={32} color="red" />
            </button>
            <button title="Haha">
              <Haha width={32} height={32} />
            </button>
            <button title="Sad">
              <Sad width={32} height={32} />
            </button>
          </div>
        </div>
        <button className="flex justify-center items-cemter font-bold gap-x-2 hover:bg-gray-400 p-2 rounded-xl">
          <GoComment size="24px" />
          Comment
        </button>
        <button className="flex justify-center items-cemter font-bold gap-x-2 hover:bg-gray-400 p-2 rounded-xl">
          <RiShareForwardLine size="24px" />
          Share
        </button>
      </div>
    </div>
  );
}
