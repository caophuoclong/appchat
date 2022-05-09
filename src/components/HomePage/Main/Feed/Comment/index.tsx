import React from 'react';
import { comment } from '../../../../../interface/IPost';
import CommentList from './CommentList';
import InputComment from './InputComment';
import LoadingSkeleton from '../../../../../Common/LoadingSkeleton';

type Props = {
  comment?: comment;
};
export function CommentLoading() {
  const comment = Array(Math.round(Math.random() * 3)).fill(0);
  return (
    <div>
      {comment &&
        comment.map((value, index) => (
          <div key={index} className="flex mx-4 my-2 gap-x-4 ">
            <LoadingSkeleton className="w-10 h-10 rounded-full" />
            <div className=" p-2 px-3 rounded-xl bg-gray-200 w-fit text-black">
              <LoadingSkeleton className="h-[16px] w-[100px] bg-gray-400" />
              <LoadingSkeleton className="h-[16px] w-[200px] bg-gray-400" />
              <LoadingSkeleton className="h-[16px] w-[90px] bg-gray-400" />
            </div>
          </div>
        ))}
      <InputComment />
    </div>
  );
}

export default function Comment({ comment }: Props) {
  return (
    <div>
      {comment && <CommentList comment={comment} />}
      <InputComment />
    </div>
  );
}
