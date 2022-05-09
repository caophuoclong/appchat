import moment from 'moment';
import React, { useState } from 'react';
import PostType from '../../../../interface/IPost';
import { IoIosMore } from 'react-icons/io';
import ImageGrid from './ImagesGrid';
import MediaType from '../../../../interface/IMedia';
import Interaction from './Interaction';
import DropInteract from './DropInteract';
import Comment, { CommentLoading } from './Comment';
import ReadMore from '../../../../Common/Readmore';
import LoadingSkeleton from '../../../../Common/LoadingSkeleton';

export function FeedLoading() {
  return (
    <div
      className="py-6 flex flex-col gap-y-2 rounded-xl bg-white shadow-lg"
      style={{
        color: '#65676b',
      }}
    >
      <div className="flex items-center gap-x-4 w-full px-6">
        <LoadingSkeleton className="w-11 h-11 rounded-xl" />
        <div>
          <p className="font-bold text-black">
            <LoadingSkeleton className="w-[100px] h-[16px]" />
          </p>
          <p style={{ color: '#D0D6DE' }}>
            <LoadingSkeleton className="w-[45px] h-[12px]" />
          </p>
        </div>
        <button className="p-1 px-2  rounded-lg border-2 ml-auto" style={{ padding: '1px 8px' }}>
          <IoIosMore size="24px" />
        </button>
      </div>
      <div className="px-6 text-black">
        <LoadingSkeleton className="w-[150px] h-[20px]" />
        <LoadingSkeleton className="w-[300px] h-[20px]" />
        <LoadingSkeleton className="w-[270px] h-[20px]" />
        <LoadingSkeleton className="w-[180px] h-[20px]" />
        <LoadingSkeleton className="w-[90px] h-[20px]" />
      </div>
      <LoadingSkeleton className="w-full h-80" />

      {/* <Interaction comment={comment} reaction={reaction} share={share} /> */}
      <DropInteract />
      <CommentLoading />
    </div>
  );
}

export default function Post({
  imgUrl,
  name,
  time,
  content,
  media,
  comment,
  reaction,
  share,
}: PostType) {
  const images: Array<string> = [];
  media.map((m) => {
    if (m.type === MediaType.IMAGE) images.push(m.url);
  });
  return (
    <div
      className="py-6 flex flex-col gap-y-2 rounded-xl bg-white shadow-lg"
      style={{
        color: '#65676b',
      }}
    >
      <div className="flex items-center gap-x-4 w-full px-6">
        <img src={imgUrl} alt="" className="w-11 h-11 rounded-xl" />
        <div>
          <p className="font-bold text-black">{name}</p>
          <p style={{ color: '#D0D6DE' }}>{moment(time).fromNow()}</p>
        </div>
        <button className="p-1 px-2  rounded-lg border-2 ml-auto" style={{ padding: '1px 8px' }}>
          <IoIosMore size="24px" />
        </button>
      </div>
      <div className="px-6 text-black">
        <ReadMore>{content}</ReadMore>
      </div>
      <ImageGrid images={images} />
      <Interaction comment={comment} reaction={reaction} share={share} />
      <DropInteract />
      <Comment comment={comment} />
    </div>
  );
}
