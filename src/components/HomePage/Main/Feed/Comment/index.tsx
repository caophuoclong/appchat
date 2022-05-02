import React from 'react';
import { comment } from '../../../../../interface/IPost';
import CommentList from './CommentList';
import InputComment from './InputComment';

type Props = {
  comment?: comment;
};

export default function Comment({ comment }: Props) {
  return (
    <div>
      {comment && <CommentList comment={comment} />}
      <InputComment />
    </div>
  );
}
