import React from 'react';
import Calendar from './Calendar';
import Contacts from './Contacts';

type Props = {
  className: string;
};

export default function RightBar({ className }: Props) {
  return (
    <div className={`${className} grid grid-flow-row grid-rows-6`}>
      <Calendar className="row-span-2" />
      <Contacts className="row-span-4 row-start-3" />
    </div>
  );
}
