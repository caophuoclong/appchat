import * as React from 'react';
import { useAppDispatch } from '../../hook';
import { toggleShowModalOption } from '../../reducers/globalSlice';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';

export interface IChatProps {
}

export function Chat (props: IChatProps) {
  const dispatch = useAppDispatch();
  const handleMouseUp = (event: React.MouseEvent)=>{
    const element = event.target as HTMLElement;
    const optionModal = document.getElementById("optionModal");
    if(optionModal){
      if(!element.isEqualNode(optionModal)){
        dispatch(toggleShowModalOption(false));
      }
    }


  }
  return (
    <div onMouseUp={handleMouseUp} className="flex h-screen min-w-full">
      <LeftBar/>
      <MainChat/>
    </div>
  );
}
