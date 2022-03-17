import * as React from 'react';
import { SearchIcon } from '../../../assets/icons';

export interface ISearchBoxProps {
  className: string;
  onSearch: (event: React.ChangeEvent) => void;
}

export function SearchBox (props: ISearchBoxProps) {
  return (
    <form  className={props.className}>
      <SearchIcon/>
      <input id="searchFriend" onChange={props.onSearch}  className="w-full ml-4 outline-none text-base" type="text" placeholder='Search people' />
    </form>
  );
}
