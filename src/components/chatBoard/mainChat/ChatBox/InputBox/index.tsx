import * as React from 'react';
import {
  GifIcon,
  PictureIcon,
  SendIcon,
} from '../../../../../assets/icons';
import { useAppDispatch } from '../../../../../hook';
import { handleChangeImageFile } from '../../../../../reducers/globalSlice';
import { InputField } from './InputField';
import { PreviewImage } from './PreviewImage';

export interface IInputBoxProps {
  className: string;
}

export function InputBox(props: IInputBoxProps) {
  const dispatch = useAppDispatch();
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
        <input
          type="file"
          id="chooseGifFile"
          hidden
          accept="image/gif"
        />
        <label className="cursor-pointer" htmlFor="chooseGifFile">
          <GifIcon />
        </label>
        <InputField />
      </div>
    </div>
  );
}
