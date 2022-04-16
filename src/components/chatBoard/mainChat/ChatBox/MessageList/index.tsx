import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { Message } from './Message';
import FullPageLoading from './FullPageLoading';
import { makeUnReadMessagesEmpty } from '../../../../../reducers/userSlice';
import conversationApi from '../../../../../services/conversation.api';
export interface IMessageListProps {}

export default function MessageList(props: IMessageListProps) {
  const messages = useAppSelector((state) => state.messages.messagesList);
  const loading = useAppSelector((state) => state.messages.loading);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (user.temp === user.choosenFriend?.conversationId) {
      dispatch(
        makeUnReadMessagesEmpty({
          conversationId: user.choosenFriend?.conversationId,
        })
      );
    }
  }, [messages]);
  React.useEffect(() => {
    if (user.choosenFriend.conversationId) {
      conversationApi.makeUnReadMessagesEmpty(user.choosenFriend.conversationId);
    }
  }, [user.choosenFriend.conversationId]);
  return (
    <>
      {loading && <FullPageLoading />}
      {messages[user.choosenFriend?.conversationId!] ? (
        messages[user.choosenFriend?.conversationId!].messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      ) : (
        <div>{'123'}</div>
      )}
    </>
  );
}
