import React from 'react';

interface Props {
  options: Array<{
    label: string;
    value: string | number;
  }>;
  onChange: (value: any) => void;
  value: string | number;
  children?: JSX.Element;
  className1?: string;
  selectRef?: any;
}

export default function SelectLanguage<T, U>({
  options,
  onChange,
  value,
  children,
  className1 = '',
  selectRef,
}: Props) {
  const handleOnChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLSelectElement).value;
    // console.log('asdfsdf');
    onChange(value);
  };
  return (
    <select
      ref={selectRef}
      value={value}
      onChange={handleOnChange}
      className={`flex gap-2 top-2 transition-all py-1 my-2 outline-none bg-transparent ${className1}`}
    >
      {children}
      {options.map((value, index) => {
        return (
          <option value={value.value} key={index}>
            {value.label}
          </option>
        );
      })}
    </select>
  );
}
