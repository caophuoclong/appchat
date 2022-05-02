import React from 'react';
import ReadMore from '../../../../../../../Common/Readmore';

type Props = {
  content: string;
};

export default function CommentItem({ content }: Props) {
  return (
    <div className="flex mx-4 my-2 gap-x-4 ">
      <img src="https://picsum.photos/40" alt="" className="w-10 h-10 rounded-full" />
      <div className=" p-2 px-3 rounded-xl bg-gray-200 w-fit text-black">
        <a className="font-bold cursor-pointer  text-xs">Phuoc long</a>
        <br />
        <ReadMore>{content}</ReadMore>
      </div>
    </div>
  );
}
