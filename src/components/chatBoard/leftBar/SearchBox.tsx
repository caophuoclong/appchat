import * as React from 'react';
import { SearchIcon } from '../../../assets/icons';
import { useAppSelector } from '../../../hook';

export interface ISearchBoxProps {
  className?: string;
  onSearch: (event: React.ChangeEvent) => void;
}

export function SearchBox(props: ISearchBoxProps) {
  const lang = useAppSelector((state) => state.global.language);
  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={handleSearch}
      className={`${props.className} border-2 border-gray-300 flex px-4 py-2 justify-between rounded-full`}
    >
      <SearchIcon />
      <input
        id="searchFriend"
        onChange={props.onSearch}
        className="w-full ml-4 outline-none text-base"
        type="text"
        placeholder={lang === 'en' ? 'Search' : 'Tìm kiếm'}
      />
    </form>
  );
}
