import React from 'react';

interface Props {
  className?: string;
  onChange: () => void;
  option1: string;
  option2: string;
  value: boolean;
}
export default function Switch({
  className,
  option1,
  option2,
  value,
  onChange,
}: Props) {
  return (
    <div
      className={`${className} flex  p-2 gap-4 rounded-full lg:w-3/4 w-full  justify-between bg-glareYellow mx-auto`}
    >
      <div
        onClick={onChange}
        className={`${!value && ' bg-glareBrown text-white'} ${
          value ? 'text-glareBrown100' : 'text-white'
        } p-1 w-1/2 text-center rounded-full cursor-pointer transition-all`}
      >
        {option1}
      </div>
      <div
        onClick={onChange}
        className={`${value && 'bg-glareBrown text-white'} ${
          !value ? 'text-glareBrown100' : 'text-white'
        } p-1 w-1/2 text-center rounded-full cursor-pointer transition-all`}
      >
        {option2}
      </div>
    </div>
  );
}
