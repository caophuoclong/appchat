import Picker from 'emoji-picker-react';
import type { IEmojiData } from 'emoji-picker-react';
import * as React from 'react';
import { Emoij, SendIcon } from '../../../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import {  handleChangeMessageText, handleMakeImageListEmpty } from '../../../../../reducers/globalSlice';
import IMessage from "../../../../../interface/IMessage";
import { addMessage, addNewMessage } from '../../../../../reducers/message';
import { uploadImage } from '../../../../../services';
import { CLOUD_NAME } from '../../../../../configs';
import { emojiRegex, escapeSpecialChars} from "../../../../../constants/textIsEmoji"
import { unwrapResult } from '@reduxjs/toolkit';
import { updateLatestMessage } from '../../../../../reducers/userSlice';
import { SocketContext } from '../../../../../context/socket';
export interface IInputFieldProps {
}

export function InputField() {
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  const handleShowEmojiPicker = (event: React.MouseEvent) => {
    setIsPickerShow(!isPickerShow);
  };
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.global.message.text);
  const files = useAppSelector((state) => state.global.message.file);
  const conversationId = useAppSelector((state) => state.user.choosenFriend?.conversationId);
  const user = useAppSelector((state) => state.user);
  const lang = useAppSelector((state) => state.global.language);
  const userState = useAppSelector((state) => state.user);
  const buttonSendRef = React.useRef<HTMLButtonElement>(null)
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
  React.useEffect(()=>{
    if(text.length > 0 || files.length > 0){
      buttonSendRef.current?.classList.remove("invisible");
      buttonSendRef.current?.classList.add("visible");
    }else{
      buttonSendRef.current?.classList.add("invisible");
      buttonSendRef.current?.classList.remove("visible");
    }
  },[text, files])
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
  const handleSend = async ()=>{
    if(text.length > 0){
      const message: IMessage ={
        text: text,
        receiverId: userState.choosenFriend!.participation._id,
        senderId: userState._id,
        createAt: new Date().toString(),
        type:"text"
      }
      dispatch(addNewMessage(message));
      const actionResult = await dispatch(addMessage({message, conversationId: conversationId!}));
      const unwrap = unwrapResult(actionResult);
      dispatch(handleChangeMessageText(""));
      dispatch(updateLatestMessage({
        message,
        conversationId: conversationId!,
      }))
      // console.log(socket);
      socket.emit("send_message", JSON.stringify({
        message,
        conversationId: conversationId!,
      }))
      socket.emit("check_online", user.choosenFriend?.participation._id);
      
    }
    if(files.length > 0){
      document.getElementById("previewPicture")?.classList.add("invisible");
      files.forEach((file)=>{
        uploadImage(file).then(async result=>{
          const {status, data} = result;
          if(status === 200){
            const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${data.version}/${data.public_id}.png`
            const message: IMessage ={
              text: url,
              receiverId: userState.choosenFriend!.participation._id,
              senderId: userState._id,
              createAt: new Date().toString(),
              type:"image"
            }
            dispatch(addNewMessage(message));
            const actionResult = await dispatch(addMessage({message, conversationId: conversationId!}));
      const unwrap = unwrapResult(actionResult);
      dispatch(updateLatestMessage({
        message,
        conversationId: conversationId!,
      }))
      socket.emit("send_message", JSON.stringify({
        message,
        conversationId: conversationId!,
      }))
      socket.emit("check_online", user.choosenFriend?.participation._id);
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
  
  const handleEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) =>{
    if(event.key === "Enter") {
      handleSend();
    }
  }
  const handleOnFocus =  ()=>{
    socket.emit("on_typing", user.choosenFriend?.participation._id);
  }
  const handleOnBlur = ()=>{
    socket.emit("not_typing", user.choosenFriend?.participation._id)
  }
  const handleSendMessage = () => {
    handleSend();
  }
  return (
    <div className="mx-8 px-6 border-collapse border border-glareGray200 rounded-full w-full relative flex items-center gap-x-2">
      <input
        type="text"
        className="text-black placeholder:text-glareGray500 px-1 py-1 outline-none bg-transparent w-full"
        placeholder={lang === "en"? "Type a new message": "Nhập tin nhắn"}
        onChange={handleTypingText}
        onKeyDown={handleEnterPress}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
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
      <button ref={buttonSendRef} className="invisible transition-all duaration-300" onClick={handleSendMessage}>
          <SendIcon />
        </button>
    </div>
  );
}
