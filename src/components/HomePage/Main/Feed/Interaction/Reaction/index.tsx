import React from 'react';
import { ReactComponent as Sad } from '../../../../../../assets/icons/sad.svg';
import { ReactComponent as Haha } from '../../../../../../assets/icons/haha.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/like.svg';
import { ReactComponent as Love } from '../../../../../../assets/icons/love.svg';

import { reaction } from '../../../../../../interface/IPost';

type Props = {
  reaction: reaction;
};

export default function Reaction({ reaction }: Props) {
  const [typeHover, setTypeHover] = React.useState('');
  const [itemsHover, setItemsHover] = React.useState('');
  const sortingReactions = Object.entries(reaction)
    .sort(([, a], [, b]) => b.length - a.length)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  const count = Object.entries(reaction).reduce((x, current) => x + current[1].length, 0);
  const showModal = (reacts: Array<string>) => {
    return <div className="absolute w-20 h-20"></div>;
  };
  return (
    <div className="flex items-center">
      {[0, 1, 2].map((num) => (
        <div key={num}>
          {(() => {
            if (Object.entries(sortingReactions)[num])
              switch (Object.entries(sortingReactions)[num][0]) {
                case 'sad':
                  return (
                    <div
                      onMouseOver={() => {
                        showModal(Object.entries(sortingReactions)[num][1] as Array<string>);
                      }}
                      className="rounded-full bg-white relative"
                    >
                      {' '}
                      <Sad width={24} height={24} />
                    </div>
                  );
                case 'haha':
                  return (
                    <div className="rounded-full bg-white">
                      {' '}
                      <Haha width={24} height={24} />
                    </div>
                  );
                case 'like':
                  return (
                    <div className="rounded-full bg-white">
                      {' '}
                      <Like width={24} height={24} />
                    </div>
                  );
                case 'love':
                  return (
                    <div className="rounded-full bg-white">
                      {' '}
                      <Love width={24} height={24} />
                    </div>
                  );
                default:
                  return <></>;
              }
          })()}
        </div>
      ))}
      <div className="mx-2">{count ? count : ''}</div>
    </div>
  );
}
