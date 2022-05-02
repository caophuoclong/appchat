import React from 'react';

type Props = {
  className?: string;
};

export default function Calendar({ className }: Props) {
  return <div className={`${className}`}>Calendar</div>;
}
