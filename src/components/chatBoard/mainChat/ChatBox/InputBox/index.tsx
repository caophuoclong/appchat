import * as React from 'react';
import { GifIcon, PictureIcon, SendIcon } from '../../../../../assets/icons';
import { useAppDispatch } from '../../../../../hook';
import { handleChangeImageFile } from '../../../../../reducers/globalSlice';
import { uploadImage } from '../../../../../services';
import { InputField } from './InputField';
import { PreviewImage } from './PreviewImage';

export interface IInputBoxProps {
  className: string;
}

export function InputBox(props: IInputBoxProps) {
  const dispatch = useAppDispatch();
  const handleFileUpload = (event: React.ChangeEvent)=>{
    const fileArray = (event.target as HTMLInputElement).files;
    const formData = new FormData();
    if(fileArray){
      // uploadImage(fileArray[0])
      // .then(res=>{
      //   console.log(res)
      // })
      // .catch(error=>{
      //   console.log("Error: ");
      //   console.log(error);
      // });
      for(let i = 0; i < fileArray.length; i++){
        const file = fileArray[i];
        const url = URL.createObjectURL(file);
        console.log(url);
        dispatch(handleChangeImageFile(url))
      }
    }
    console.log(formData.values());
  }
  return (
    <div
      className={props.className}
      style={{
        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      }}
    >
      <PreviewImage/>
      <div className="flex gap-3 items-center">
        <input
          type="file"
          id="choosePictureFile"
          accept="image/png image/jpg image/jpeg"
          multiple
          hidden
          onChange={handleFileUpload}
        />
        <label htmlFor="choosePictureFile">
          <input type="file" id="chooseGifFile" hidden accept="image/gif" />
          <PictureIcon />
        </label>
        <label htmlFor="chooseGifFile">
          <GifIcon />
        </label>
        <InputField/>
        <SendIcon />
      </div>
    </div>
  );
}
