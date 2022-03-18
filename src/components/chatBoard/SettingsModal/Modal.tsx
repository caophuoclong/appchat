import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal from "react-modal"
import { useAppDispatch } from '../../../hook';
import { setSelectedModal, toggleShowModalOption } from '../../../reducers/globalSlice';
export interface IModalProps {
    children: JSX.Element | JSX.Element[] | null,
    customStyle?: {
        [key: string] :{
            [key : string] : string
        }
    }
}

export default function Modal (props: IModalProps) {
    const [show, setShow] = React.useState(true);
    const dispatch  = useAppDispatch();
    const customStyle = {
        content:{
            
            ...props.customStyle?.content,
        },
    }
    ReactModal.setAppElement('#root');
    const handleModalClosed = ()=>{
        dispatch(setSelectedModal(null));
    }
    const handleModalOpen = ()=>{
        dispatch(toggleShowModalOption());
    }
  return (
    <ReactModal onAfterClose={handleModalClosed} onAfterOpen={handleModalOpen} isOpen={show}  style={customStyle}>
      <button className="right-4 absolute translate-y-1/4" onClick={()=>{setShow(prev => !prev)}}>
          <FaTimes size="24px"/>
      </button>
        <div className="">
          {props.children}
        </div>
          </ReactModal>
  );
}
