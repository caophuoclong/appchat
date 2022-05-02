import React from 'react';
import { comment } from '../../../../../../interface/IPost';

type Props = {
  comment: comment;
};

export default function Comment({ comment }: Props) {
  return (
    <div>
      {comment.length} {comment.length > 1 ? 'comments' : 'comment'}
    </div>
  );
}
