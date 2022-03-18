import * as React from 'react';
import { RemoveIcon } from '../../../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../../../hook';
import { handleRemoveImageFile } from '../../../../../reducers/globalSlice';

export interface IPreviewImageProps {
}

const Image = (props: {imgUrl: string | ArrayBuffer, pictureIndex: number,onRemovePicture: (item: ArrayBuffer | string)=>void})=>{
    const url = typeof props.imgUrl === "string" ? props.imgUrl : Buffer.from(props.imgUrl).toString();
    return(
        <div className="relative group" style={{ flex: "0 0 200px"}}>
            <button className="rotate-45 absolute top-2 right-2 group-hover:rotate-0 transition-all duration-100 z-50 group-hover:opacity-100 invisible group-hover:visible" onClick={()=>{props.onRemovePicture(url)}}>
                <RemoveIcon width="24px" height="24px" className=""/>
            </button>
            <img className="group-hover:opacity-50 z-0" src={url} width="200px" height="200px" alt="" />
        </div>
    )
}
export function PreviewImage (props: IPreviewImageProps) {
    const message = useAppSelector(state => state.global.message);
    const dispatch = useAppDispatch();
    const handleRemovePicture = (item: ArrayBuffer | string) => {
        dispatch(handleRemoveImageFile(item));
    }
    const handleWheelScroll = (event:  React.WheelEvent)=>{
        const previewPicture = document.getElementById("previewPicture");
        if(previewPicture){
            previewPicture.scrollLeft += event.deltaY;
        }
    }
  return (
    <div id="previewPicture" onWheel={handleWheelScroll} className="mb-2 flex gap-4 overflow-auto scroll-smooth">
        {message.file!.map((value,index)=>{
            return <Image imgUrl={value} key={index} pictureIndex={index} onRemovePicture={handleRemovePicture} />
        })}
    </div>
  );
}
