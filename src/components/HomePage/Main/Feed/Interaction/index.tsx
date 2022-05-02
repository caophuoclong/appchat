import React from 'react';
import { comment, reaction, share } from '../../../../../interface/IPost';
import Comment from './Comment';
import Reaction from './Reaction';
import Share from './Share';

type Props = {
  reaction?: reaction;
  comment?: comment;
  share?: share;
};

export default function Interaction({ reaction, comment, share }: Props) {
  return (
    <div className="flex items-center border-b mx-4 px-4">
      <div className="my-1">{reaction && <Reaction reaction={reaction} />}</div>
      <div className="ml-auto flex gap-x-4">
        {comment && comment.length > 0 && <Comment comment={comment} />}
        {share && share.length > 0 && <Share share={share} />}
      </div>
    </div>
  );
}
