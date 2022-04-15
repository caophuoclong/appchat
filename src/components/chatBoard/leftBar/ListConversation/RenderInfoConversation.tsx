import moment from 'moment';
import React from 'react';
import { ImFilePicture } from 'react-icons/im';
import IMessage from '../../../../interface/IMessage';
import { formatDate } from '../../mainChat/ChatBox/MessageList/Message';
interface Props {
  _id: string;
  name: string;
  latest?: IMessage;
  username: string;
  imgUrl?: string;
  unReadLength: number;
  lang: 'en' | 'vn';
  conversationCreateAt?: Date | string;
}

export default function RenderInfoConversation({
  imgUrl,
  latest,
  _id,
  name,
  username,
  unReadLength,
  lang,
  conversationCreateAt,
}: Props) {
  let time: Date | string | undefined;
  if (latest) time = latest?.createAt;
  else {
    time = conversationCreateAt;
  }

  return (
    <>
      <img
        className="w-10 h-10 rounded-full"
        src={imgUrl || 'https://picsum.photos/40'}
        alt="Avatar"
      />
      <div className="w-full">
        <div className="flex  gap-8 w-full items-center">
          <p id={_id} className="text-base font-semibold truncate">
            {name}
          </p>
          <div className="ml-auto">
            <p className="text-xs">{moment(new Date(time as Date)).fromNow()}</p>
            {unReadLength === 0 ? null : (
              <div
                className="text-white bg-red-500 rounded-full flex w-4 h-4 mx-auto justify-center items-center"
                style={{
                  fontSize: '10px',
                }}
              >
                {unReadLength}
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="truncate text-xs w-48">
            {latest ? (
              latest?.type === 'text' ? (
                latest?.text
              ) : (
                <div className="flex">
                  <ImFilePicture size="12px" />
                  {lang === 'en' ? 'Picture' : 'Hình Ảnh'}
                </div>
              )
            ) : (
              <p>{lang === 'en' ? 'Empty message' : 'Chua co tin nhan'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
