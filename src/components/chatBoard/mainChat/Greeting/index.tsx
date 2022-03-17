import * as React from 'react';

export interface IGreetingProps {
  className: string;
}

export function Greeting (props: IGreetingProps) {
  return (
    <div className={props.className}>
      <p className="text-4xl font-semibold w-3/4">You don’t have a message selected.</p>
      <p className="font-semibold text-base text-glareGray">Choose one from your existing messages, or start a new one.</p>
      <button className="text-white font-semibold text-base text-center rounded-full bg-glareGreen py-5 px-24 my-9">
        New message
      </button>
    </div>
  );
}
