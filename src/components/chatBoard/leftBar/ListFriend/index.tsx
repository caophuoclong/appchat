import * as React from 'react';
import { useAppSelector } from '../../../../hook';
import { IFriend } from '../../../../interface/IFriend';
import { Friend} from './Friend';

export interface IListFriendProps {
  className: string;
  listFriend?: Array<IFriend>;
  searchListFriend?: Array<IFriend> | null;
}



const EmptySearchFriend = () =>{
  const lang = useAppSelector(state => state.global.language);
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{lang === "en" ? "You don't have friends please make new friends": "Bạn chưa có người bạn nào. Vui lòng kết bạn để có thể trò chuyện"}</p>
    </div>
  )
}

export function ListFriend(props: IListFriendProps) {
  const listFriend = useAppSelector(state => state.user.conversations!);
  const {searchListFriend} = props;

  return (
    <div className={props.className} style={{
        
    }}>
      {/* {
        searchListFriend  ? searchListFriend.length === 0 ? <EmptySearchFriend/> : searchListFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>) :
        listFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>
      )
      } */}
      {
       listFriend.length === 0 ? <EmptySearchFriend/> : listFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>
      )
      }

    </div>
  );
}
