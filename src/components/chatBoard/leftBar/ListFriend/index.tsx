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
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">Empty Search Friend</p>
    </div>
  )
}

export function ListFriend(props: IListFriendProps) {
  const listFriend = useAppSelector(state => state.user.listFriend);
  const {searchListFriend} = props;
  console.log(searchListFriend);

  return (
    <div className={props.className} style={{
        
    }}>
      {
        searchListFriend  ? searchListFriend.length === 0 ? <EmptySearchFriend/> : searchListFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>) :
        listFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>
      )
      }

    </div>
  );
}
