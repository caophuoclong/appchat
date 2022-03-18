import * as React from 'react';
import { useAppSelector } from '../../../hook';
import { IFriend } from '../../../interface/IFriend';
import { ListFriend } from './ListFriend';
import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { User } from './User';

export interface ILeftBarProps {}

export function LeftBar(props: ILeftBarProps) {
  const userState = useAppSelector(state => state.user);
  const lang = useAppSelector(state => state.global.language);
  const [resultSearch, setResultSearch] = React.useState<IFriend[] | null>(null);
  const handleSearch = (event: React.ChangeEvent)=>{
    const text = (event.target as HTMLInputElement).value;
    if(!text) setResultSearch([]);
    const {listFriend} = userState;
    const re = new RegExp(text , "gi");
    setResultSearch(listFriend.filter((e,i,a)=>{
      return e.name.search(re) !== -1 || e.username.search(re) !== -1;
    }))
  }
  return (
    <div
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
      className="w-1/5 min-w-400 bg-leftBarBackground flex flex-col"
    >
      <div className="h-5/6">
      <Logo className="flex items-center m-6 mr-3" />
      <p className="mt-12 text-2xl font-semibold m-6 mr-3">{lang === "en"? "Message": "Tin nhắn"}</p>
      <SearchBox onSearch={handleSearch} className="border-2 border-gray-300 flex px-4 py-2 justify-between rounded-full m-6 mr-3" />
      <ListFriend searchListFriend={resultSearch} className="max-h-70 my-8 overflow-auto" />
      </div>
      <User className="mt-auto mb-4 py-auto flex items-center gap-4 bg-leftBarBackground pl-2"/>
    </div>
  );
}
