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
  let listFriend = useAppSelector(state => state.user.conversations!);
  const user = useAppSelector(state => state.user)
  const [xxx, setXXX] = React.useState([...listFriend]);
  xxx.sort((a, b) => {
    if(!a.latest) return -1;
    if(!b.latest) return -1;
    return new Date(b.latest.createAt!).getTime() - new Date(a.latest.createAt!).getTime();
  })
  
  const {searchListFriend} = props;
  const [lengthUnRead, setLengthUnRead] = React.useState(0);


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
       xxx.length === 0 ? <EmptySearchFriend/> : [...listFriend]
       .sort((a, b) => {
        if(!a.latest) return -1;
        if(!b.latest) return -1;
        return new Date(b.latest.createAt!).getTime() - new Date(a.latest.createAt!).getTime()
       })
       .map((item, i) => 
       <Friend key={i}  friendInfo={item} unReadLength={(()=>item.unreadmessages ? item.unreadmessages.filter(message => message.senderId !== user._id).length: 0)()}/>
       )
      }
      {/* {
       xxx.length === 0 ? <EmptySearchFriend/> : listFriend.map((value,index)=>
        <Friend key={index}  friendInfo={value}/>
      )
      } */}

    </div>
  );
}
