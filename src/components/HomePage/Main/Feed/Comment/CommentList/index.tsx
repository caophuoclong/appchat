import React from 'react';
import { comment } from '../../../../../../interface/IPost';
import CommentItem from './CommentItem';

type Props = {
  comment: comment;
};

export default function CommentList({ comment }: Props) {
  return (
    <div>
      {comment.map((comment, index) => (
        <CommentItem key={index} content={comment} />
      ))}
    </div>
  );
}
