import React from 'react';
import { share } from '../../../../../../interface/IPost';

type Props = {
  share: share;
};

export default function Share({ share }: Props) {
  return (
    <div>
      {share.length} {share.length > 1 ? 'shares' : 'share'}
    </div>
  );
}
