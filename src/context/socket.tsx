import React from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_HOST } from '../configs/';
import { useAppDispatch, useAppSelector } from '../hook';
import { handleSetSocketId } from '../reducers/globalSlice';
import IMessage from '../interface/IMessage';
import {
  addConversation,
  handleSetOnline,
  handleUpdateTemp,
  refreshConversations,
  refreshFriendsAll,
  refreshNoti,
  updateLatestMessage,
  updateUnReadGroupMessage,
  updateUnReadMessasges,
} from '../reducers/userSlice';
import { addNewMessage } from '../reducers/message';
import { IConversation } from '../interface/IUser';
export const SocketContext = React.createContext<Socket>({} as Socket);
const Provider = (props: { children: JSX.Element | JSX.Element[] }) => {
  console.log('!23');
  const [socket, setSocket] = React.useState<Socket>({} as Socket);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const socket = io(SOCKET_HOST!, {
      transports: ['websocket'],
    });
    setSocket(socket);
    socket.on('new_connection', (data) => {
      dispatch(handleSetSocketId(data));
    });
    socket.on('re_check_online', (data: { id: string; check: boolean }) => {
      dispatch(handleSetOnline(data));
    });
    socket.on('rep_live_noti', () => {
      dispatch(refreshNoti());
      dispatch(refreshFriendsAll());
    });
    socket.on('rep_accept_friend', () => {
      dispatch(refreshNoti());
      dispatch(refreshConversations());
      dispatch(refreshFriendsAll());
    });
    socket.on('check_online', () => {});
    socket.on('receive_message', (data: string) => {
      console.log(data);
      const { conversationId, message, type } = JSON.parse(data) as {
        conversationId: string;
        message: IMessage;
        type: string;
      };
      dispatch(
        updateLatestMessage({
          message,
          conversationId,
        })
      );
      console.log(type);
      if (type === 'direct') dispatch(updateUnReadMessasges({ conversationId, message }));
      else if (type === 'group') {
        dispatch(
          updateUnReadGroupMessage({
            conversationId,
            message,
          })
        );
      }
      dispatch(addNewMessage({ message, conversationId }));
      dispatch(handleUpdateTemp(conversationId));
    });
    socket.on('add_conversation', (data: string) => {
      const data1: IConversation = JSON.parse(data);
      console.log(data1);
      dispatch(addConversation(data1));
    });
  }, []);

  return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
export default Provider;
