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
}

export default function RenderInfoConversation({
  imgUrl,
  latest,
  _id,
  name,
  username,
  unReadLength,
  lang,
}: Props) {
  return (
    <>
      <img
        className="w-10 h-10 rounded-full"
        src={imgUrl || 'https://picsum.photos/40'}
        alt="Avatar"
      />
      <div className="w-full">
        <div className="flex justify-between gap-8 w-full items-center">
          <div className="flex gap-2 w-52">
            <p id={_id} className="text-base font-semibold truncate">
              {name}
            </p>
            {name ? (
              name!.length <= 12 ? (
                <p className="truncate text-sm">{username ? `@${username}` : ''}</p>
              ) : null
            ) : null}
          </div>
          <div>
            <p className="text-xs">{formatDate(new Date(latest?.createAt as Date).getTime())}</p>
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
