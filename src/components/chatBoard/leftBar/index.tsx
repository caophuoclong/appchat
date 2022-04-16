import * as React from 'react';
import { useAppSelector } from '../../../hook';
import { IFriend } from '../../../interface/IFriend';
import { ListFriend } from './ListConversation';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { User } from './User';
import Notification from './notification';
import ShowFriends from './ShowFriends';
export interface ILeftBarProps {}

export function LeftBar(props: ILeftBarProps) {
  const leftBarRef = React.useRef<HTMLDivElement>(null);
  const lang = useAppSelector((state) => state.global.language);
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const [resultSearch, setResultSearch] = React.useState<IFriend[] | null>(null);
  const handleSearch = (event: React.ChangeEvent) => {
    const text = (event.target as HTMLInputElement).value;
    if (!text) setResultSearch([]);
    // const {listFriend} = userState;
    // const re = new RegExp(text , "gi");
    // setResultSearch(listFriend.filter((e,i,a)=>{
    //   return e.name.search(re) !== -1 || e.username.search(re) !== -1;
    // }))
  };
  const leftBarReponsive = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      if (choosenFriend.conversationId !== '') {
        leftBarRef.current?.classList.add('hidden');
        leftBarRef.current?.classList.remove('w-full');
      } else {
        leftBarRef.current?.classList.add('w-full');
        leftBarRef.current?.classList.remove('hidden');
      }
    } else {
      leftBarRef.current?.classList.remove('hidden');
    }
  };
  React.useEffect(() => {
    leftBarReponsive();
  }, [choosenFriend]);
  window.addEventListener('resize', leftBarReponsive);
  return (
    <div
      ref={leftBarRef}
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
      }}
      className="lg:w-1/5 lg:min-w-400 bg-leftBarBackground h-full flex  flex-col"
    >
      <div
        style={{
          height: '90%',
        }}
      >
        <div className="flex flex-col gap-2">
          <Logo className="flex items-center m-6 mr-3 mb-2 mt-4" />
          <p className="text-2xl font-semibold m-6 mr-3  my-0">
            {lang === 'en' ? 'Message' : 'Tin nhắn'}
          </p>
          <SearchBox onSearch={handleSearch} className="mx-4" />
          <div className="flex justify-end my-0">
            <ShowFriends />
            <Notification />
          </div>
        </div>
        <ListFriend searchListFriend={resultSearch} className="mt-4 overflow-auto h-4/5" />
      </div>
      <div className="flex items-center bg-white  shadow-md mt-auto py-2">
        <User className="py-auto flex items-center w-full pl-2" />
      </div>
    </div>
  );
}
