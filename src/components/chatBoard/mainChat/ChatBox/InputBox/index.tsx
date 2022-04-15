import * as React from 'react';
import { GifIcon, PictureIcon, SendIcon } from '../../../../../assets/icons';
import { SocketContext } from '../../../../../context/socket';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { handleChangeImageFile } from '../../../../../reducers/globalSlice';
import { InputField } from './InputField';
import { PreviewImage } from './PreviewImage';

export interface IInputBoxProps {
  className: string;
}

export function InputBox(props: IInputBoxProps) {
  const user = useAppSelector((state) => state.user);
  const socket = React.useContext(SocketContext);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isFriendTyping, setIsFriendTyping] = React.useState<{
    isTyping: boolean;
    conversationId: string;
  }>(
    {} as {
      isTyping: false;
      conversationId: string;
    }
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    socket.on('reply_typing', (data: { isTyping: boolean; conversationId: string }) => {
      setIsFriendTyping({
        isTyping: data.isTyping,
        conversationId: data.conversationId,
      });
      if (data.conversationId === user.choosenFriend!.conversationId) {
        setIsTyping(data.isTyping);
      } else {
        setIsTyping(false);
      }
    });
  }, [socket, user.choosenFriend]);
  React.useEffect(() => {
    if (
      user.choosenFriend.conversationId === isFriendTyping.conversationId &&
      isFriendTyping.isTyping
    )
      setIsTyping(true);
    else {
      setIsTyping(false);
    }
  }, [user.choosenFriend.conversationId]);
  const readFile = (file: File) => {
    return new Promise<ArrayBuffer | string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result!);
      };
      fr.onerror = () => {
        reject(fr);
      };
      fr.readAsDataURL(file);
    });
  };
  const handleFileUpload = (event: React.ChangeEvent) => {
    const fileArray = (event.target as HTMLInputElement).files;
    if (fileArray) {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        readFile(file).then((result) => {
          dispatch(handleChangeImageFile(result));
        });
      }
    }
  };
  return (
    <div
      className={props.className}
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
    >
      {isTyping && (
        <div className="absolute bg-white border boder-gray-300 px-2 rounded-lg flex gap-2 w-80 items-center lg:text-md text-sm top-0 -translate-y-full">
          {/* {
            <span className="w-1/3 truncate">
              {user.choosenFriend?.participation.name}
            </span>
          }
          {lang === 'en' ? ` is typing` : ` đang soạn tin nhắn`} */}
          <div className="loading"></div>
        </div>
      )}

      <PreviewImage />
      <div className="flex gap-3 items-center">
        <input
          type="file"
          id="choosePictureFile"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileUpload}
        />
        <label className="cursor-pointer" htmlFor="choosePictureFile">
          <PictureIcon />
        </label>
        <input type="file" id="chooseGifFile" hidden accept="image/gif" />
        <label className="cursor-pointer" htmlFor="chooseGifFile">
          <GifIcon />
        </label>
        <InputField />
      </div>
    </div>
  );
}
