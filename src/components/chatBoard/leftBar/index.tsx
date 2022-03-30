import * as React from 'react';
import { useAppSelector } from '../../../hook';
import { IFriend } from '../../../interface/IFriend';
import { ListFriend } from './ListFriend';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { User } from './User';
import Notification from './notification';
import ShowFriends from './ShowFriends';
export interface ILeftBarProps {}

export function LeftBar(props: ILeftBarProps) {
  const lang = useAppSelector((state) => state.global.language);
  const [resultSearch, setResultSearch] = React.useState<
    IFriend[] | null
  >(null);
  const handleSearch = (event: React.ChangeEvent) => {
    const text = (event.target as HTMLInputElement).value;
    if (!text) setResultSearch([]);
    // const {listFriend} = userState;
    // const re = new RegExp(text , "gi");
    // setResultSearch(listFriend.filter((e,i,a)=>{
    //   return e.name.search(re) !== -1 || e.username.search(re) !== -1;
    // }))
  };
  return (
    <div
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
      className="w-1/5 min-w-400 bg-leftBarBackground h-full"
    >
      <div
        style={{
          height: '90%',
        }}
      >
        <div className="flex flex-col gap-4">
          <Logo className="flex items-center m-6 mr-3 mb-2 mt-4" />
          <p className="text-2xl font-semibold m-6 mr-3  my-0">
            {lang === 'en' ? 'Message' : 'Tin nhắn'}
          </p>
          <SearchBox
            onSearch={handleSearch}
            className="border-2 border-gray-300 flex px-4 py-2 justify-between rounded-full m-6 mr-3  my-0"
          />
          <div className="flex justify-end gap-4  my-0">
            <ShowFriends />
            <Notification />
          </div>
        </div>
        <ListFriend
          searchListFriend={resultSearch}
          className="my-8 overflow-auto"
        />
      </div>
      <div
        className="flex items-center bg-white z-50"
        style={{
          height: '10%',
        }}
      >
        <User className="py-auto flex items-center w-full pl-2" />
      </div>
    </div>
  );
}
