import * as React from 'react';
import { ChatHeader } from './Header';
import { InputBox } from './InputBox';
import  MessageList  from './MessageList';
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom"
import { group } from 'console';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { getConversation } from '../../../../reducers/message';
export interface IChatProps {
    className: string;
}

export function Chat (props: IChatProps) {
  const messages = React.useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll]   = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const conversationId = useAppSelector(state => state.user.choosenFriend.conversationId);
  const getMessage = useAppSelector(state => state.messages);
  const scrollToBottom = ()=>{
    const div = messages.current;
    const scrollHeight = div?.scrollHeight;
    const height = div?.clientHeight;
    const maxScrollTop = scrollHeight! - height!;
    div!.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    messages.current?.scrollIntoView({
      behavior: "smooth"
    })
  }
  React.useEffect(()=>{
    if(!isScroll)
      scrollToBottom();
  })
  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) =>{
    const e = event.target as HTMLDivElement;
    if(e.scrollHeight - e.scrollTop === e.clientHeight)
      setIsScroll(false);
    else
      setIsScroll(true);
    if( e.scrollTop === 0){
      if(getMessage.messagesList[conversationId].isMore){
        await dispatch(getConversation({
          id: conversationId,
          page: Number(getMessage.messagesList[conversationId].page) + 1,
        }))
       e.scrollTop = 24;
        
      }

    }
  }
  return (
    <div className={props.className}>
      <ChatHeader className="px-9 py-3" />
      <div onScroll={handleScroll} ref={messages}  id="messagesList" className="h-85 overflow-auto relative">
        <MessageList />
      </div>
      <InputBox className="px-9 py-5 mt-auto mr-0"/>
    </div>
  );
}
