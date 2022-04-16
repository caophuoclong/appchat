import * as React from 'react';
import { ChatHeader } from '../Header';
import { InputBox } from './InputBox';
import MessageList from './MessageList';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { getMessages, setLoadingMessage, turnOfLoadingMessage } from '../../../../reducers/message';
import { unwrapResult } from '@reduxjs/toolkit';
export interface IChatProps {
  className: string;
}

export function Chat(props: IChatProps) {
  const messages = React.useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const conversationId = useAppSelector((state) => state.user.choosenFriend.conversationId);
  const getMessage = useAppSelector((state) => state.messages);
  const scrollToBottom = () => {
    const div = messages.current;
    const scrollHeight = div?.scrollHeight;
    const height = div?.clientHeight;
    const maxScrollTop = scrollHeight! - height!;
    div!.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    messages.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  React.useEffect(() => {
    if (!isScroll) scrollToBottom();
  }, [getMessage.messagesList[conversationId]]);
  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.target as HTMLDivElement;
    if (e.scrollHeight - e.scrollTop >= e.clientHeight + 400) setIsScroll(true);
    else setIsScroll(false);
    if (e.scrollTop === 0) {
      if (getMessage.messagesList[conversationId].isMore) {
        dispatch(setLoadingMessage());
        const result = await dispatch(
          getMessages({
            id: conversationId,
            page: Number(getMessage.messagesList[conversationId].page) + 1,
          })
        );
        const unwrap = unwrapResult(result);
        dispatch(turnOfLoadingMessage());
        e.scrollTop = 512;
      }
    }
  };
  return (
    <div className={props.className}>
      <ChatHeader className="lg:px-9 px-4 py-3" />
      <div
        onScroll={handleScroll}
        ref={messages}
        id="messagesList"
        className="h-85 overflow-auto relative"
      >
        <MessageList />
      </div>
      <InputBox className="lg:px-9 px-2 py-5 mt-auto mr-0 relative" />
    </div>
  );
}
