import * as React from 'react';
import { useAppSelector } from '../../../../hook';

export interface IGreetingProps {
  className: string;
}

export function Greeting (props: IGreetingProps) {
  const lang = useAppSelector(state => state.global.language);
  return (
    <div className={props.className}>
      <p className="text-4xl font-semibold w-3/4">{lang === "en" ? "You don’t have a message selected.":"Bạn chưa có tin nhắn."}</p>
      <p className="font-semibold text-base text-glareGray">{lang === "en"? "Choose one from your existing messages, or start a new one.": "Chọn tin nhắn đã có, hoặc soạn tin nhắn mới."}</p>
      <button className="text-white font-semibold text-base text-center rounded-full bg-glareGreen py-5 px-24 my-9">
        {lang === "en"? "New message": "Tin nhắn mới"}
      </button>
    </div>
  );
}
