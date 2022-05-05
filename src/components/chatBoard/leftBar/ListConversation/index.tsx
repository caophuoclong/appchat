import * as React from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from '../../../../context/socket';
import { useAppSelector } from '../../../../hook';
import { IFriend } from '../../../../interface/IFriend';
import { checkFriendOnline } from '../../../../utils';
import { sortConversationByLatest } from '../../../../utils/sortConversationByLatest';
import { DirectConversation } from './DirectConversation';
import { GroupConversation } from './GroupConversation';

export interface IListFriendProps {
  className: string;
  listFriend?: Array<IFriend>;
  searchListFriend?: Array<IFriend> | null;
}

const EmptySearchFriend = () => {
  const lang = useAppSelector((state) => state.global.language);
  return (
    <div className="text-center">
      <p className="text-xl font-bold">
        {lang === 'en'
          ? "You don't have friends please make new friends"
          : 'Bạn chưa có người bạn nào. Vui lòng kết bạn để có thể trò chuyện'}
      </p>
    </div>
  );
};

export function ListFriend(props: IListFriendProps) {
  let listConversation = useAppSelector((state) => state.user.conversations!);
  const user = useAppSelector((state) => state.user);
  const socket = React.useContext(SocketContext);
  React.useEffect(() => {
    if (socket) {
      user.friends.forEach((friend) => {
        checkFriendOnline(socket, friend._id);
      });
    }
  }, [socket, user.friends]);
  return (
    <div
      style={{
        minHeight: '65%',
      }}
      className={props.className}
    >
      {/* {
        searchListFriend  ? searchListFriend.length === 0 ? <EmptySearchFriend/> : searchListFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>) :
        listFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>
      )
      } */}
      {listConversation.length === 0 ? (
        <EmptySearchFriend />
      ) : (
        sortConversationByLatest(listConversation).map((item, i) =>
          item.type === 'group' ? (
            <Link to={`/messages/${item._id}`}>
              <GroupConversation key={i} converstationInfor={item} />
            </Link>
          ) : (
            <Link to={`/messages/${item._id}`}>
              <DirectConversation
                key={i}
                converstationInfor={item}
                unReadLength={(() =>
                  item.unreadmessages
                    ? item.unreadmessages.filter((message) => message.senderId !== user._id).length
                    : 0)()}
              />
            </Link>
          )
        )
      )}
    </div>
  );
}
