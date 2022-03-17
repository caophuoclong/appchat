import Picker from 'emoji-picker-react';
import type { IEmojiData } from 'emoji-picker-react';
import * as React from 'react';
import { Emoij } from '../../../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { handleChangeMessageText } from '../../../../../reducers/globalSlice';

export interface IInputFieldProps {}

export function InputField() {
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  const handleShowEmojiPicker = (event: React.MouseEvent) => {
    setIsPickerShow(!isPickerShow);
  };
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.global.message.text);
  const handleTypingText = (event: React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    dispatch(handleChangeMessageText(value));
  };
  const handleEmojiClick = (event: any, emojiObject: IEmojiData) => {
    dispatch(handleChangeMessageText(text + emojiObject.emoji));
  };
  return (
    <div className="mx-8 px-6 border-collapse border border-glareGray200 rounded-full w-full relative flex items-center">
      <input
        type="text"
        className="text-glareGray500 px-1 py-1 outline-none bg-transparent w-full"
        placeholder="Start a new message"
        onChange={handleTypingText}
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
