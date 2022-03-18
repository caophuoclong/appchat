import Picker from 'emoji-picker-react';
import type { IEmojiData } from 'emoji-picker-react';
import * as React from 'react';
import { Emoij } from '../../../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import {  handleChangeMessageText, handleMakeImageListEmpty } from '../../../../../reducers/globalSlice';
import IMessage from "../../../../../interface/IMessage";
import { addNewMessage } from '../../../../../reducers/message';
import { uploadImage } from '../../../../../services';
import { CLOUD_NAME } from '../../../../../configs';
import {textRegex, emojiRegex, escapeSpecialChars} from "../../../../../constants/textIsEmoji"
export interface IInputFieldProps {}

export function InputField() {
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  const handleShowEmojiPicker = (event: React.MouseEvent) => {
    setIsPickerShow(!isPickerShow);
  };
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.global.message.text);
  const files = useAppSelector((state) => state.global.message.file);
  const lang = useAppSelector((state) => state.global.language);
  const userState = useAppSelector((state) => state.user);
  const handleTypingText = (event: React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    // const value = element.value;
    let textss = element.value;
      for (let i in emojiRegex){
        const regex = new RegExp(escapeSpecialChars(i), "gim");
        textss = textss = textss.replace(regex, emojiRegex[i])
      }
    dispatch(handleChangeMessageText(textss));
  };
  const handleEmojiClick = (event: any, emojiObject: IEmojiData) => {
    dispatch(handleChangeMessageText(text + emojiObject.emoji));
  };
  // const handleSpacePress = (key: string)=>{
  //   // if(key === " "){
  //   //   let textss = text;
  //   //   for (let i in emojiRegex){
  //   //     const regex = new RegExp(escapeSpecialChars(i), "gim");
  //   //     textss = textss = textss.replace(regex, emojiRegex[i])
  //   //   }
  //   //   dispatch(handleChangeMessageText(textss));
  //   //   // console.log(textss);
  //   // }
  // }
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key === "Enter" && text.length > 0){
      const message: IMessage ={
        text: text,
        date: Date.now(),
        receiverId: userState.choosenFriend!.id,
        receiverUsername: userState.choosenFriend!.username,
        senderId: userState.id,
        senderUsername: userState.username,
        type:"text"
      }
      dispatch(addNewMessage(message));
      dispatch(handleChangeMessageText(""));
    }
    if(event.key === "Enter" && files.length > 0){
      document.getElementById("previewPicture")?.classList.add("invisible");
      files.forEach((file)=>{
        uploadImage(file).then(result=>{
          const {status, data} = result;
          if(status === 200){
            const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${data.version}/${data.public_id}.png`
            const message: IMessage ={
              text: url,
              date: Date.now(),
              receiverId: userState.choosenFriend!.id,
              receiverUsername: userState.choosenFriend!.username,
              senderId: userState.id,
              senderUsername: userState.username,
              type:"image"
            }
            dispatch(addNewMessage(message));
            
          }
        }).catch(error=>{
          console.log(error);
          // alert("Something went wrong!\n" + error);
        });
      })
      dispatch(handleMakeImageListEmpty());
      document.getElementById("previewPicture")?.classList.remove("invisible");
      
    }

  }
  return (
    <div className="mx-8 px-6 border-collapse border border-glareGray200 rounded-full w-full relative flex items-center">
      <input
        type="text"
        className="text-glareGray500 px-1 py-1 outline-none bg-transparent w-full"
        placeholder={lang === "en"? "Type a new message": "Nhập tin nhắn"}
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
