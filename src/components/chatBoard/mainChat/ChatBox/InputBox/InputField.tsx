import Picker from 'emoji-picker-react';
import type { IEmojiData } from 'emoji-picker-react';
import * as React from 'react';
import { Emoij } from '../../../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { handleChangeMessageText } from '../../../../../reducers/globalSlice';
import IMessage from "../../../../../interface/IMessage";
import { addNewMessage } from '../../../../../reducers/message';
export interface IInputFieldProps {}

export function InputField() {
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  const handleShowEmojiPicker = (event: React.MouseEvent) => {
    setIsPickerShow(!isPickerShow);
  };
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.global.message.text);
  const userState = useAppSelector((state) => state.user);
  const handleTypingText = (event: React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    dispatch(handleChangeMessageText(value));
  };
  const handleEmojiClick = (event: any, emojiObject: IEmojiData) => {
    dispatch(handleChangeMessageText(text + emojiObject.emoji));
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key === "Enter" && text.length > 0){
      
      const message: IMessage ={
        text: text,
        date: Date.now(),
        receiverId: userState.choosenFriend!.id,
        receiverUsername: userState.choosenFriend!.username,
        senderId: userState.id,
        senderUsername: userState.username
      }
      console.log(message);
      dispatch(addNewMessage(message));
      dispatch(handleChangeMessageText(""));
    }

  }
  return (
    <div className="mx-8 px-6 border-collapse border border-glareGray200 rounded-full w-full relative flex items-center">
      <input
        type="text"
        className="text-glareGray500 px-1 py-1 outline-none bg-transparent w-full"
        placeholder="Start a new message"
        onChange={handleTypingText}
        onKeyDown={handleEnterPress}
        value={text}
      />
      <button
        className="flex justify-center items-center"
        onClick={handleShowEmojiPicker}
      >
        <Emoij />
      </button>
      {isPickerShow && (
        <Picker
          onEmojiClick={handleEmojiClick}
          pickerStyle={{
            position: 'absolute',
            top: '-1rem',
            right: '0',
            transform: 'translate(0,-100%)',
          }}
        />
      )}
    </div>
  );
}
