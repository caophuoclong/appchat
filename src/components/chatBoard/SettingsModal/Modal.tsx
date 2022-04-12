import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { useAppDispatch } from '../../../hook';
import {
  SelectedType,
  setSelectedModal,
  setShowModalOptionFalse,
} from '../../../reducers/globalSlice';
export interface IModalProps {
  children: JSX.Element | JSX.Element[] | null;
  heading?: JSX.Element | null;
  customStyle?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export default function Modal(props: IModalProps) {
  const [show, setShow] = React.useState(true);
  const dispatch = useAppDispatch();
  const customStyle = {
    content: {
      ...props.customStyle?.content,
    },
  };
  ReactModal.setAppElement('#root');
  const handleModalClosed = () => {
    dispatch(setSelectedModal(SelectedType.NULL));
  };
  const handleModalOpen = () => {
    dispatch(setShowModalOptionFalse());
  };
  return (
    <ReactModal
      onAfterClose={handleModalClosed}
      onAfterOpen={handleModalOpen}
      isOpen={show}
      style={customStyle}
    >
      <div className="h-full">
        <div className="flex items-center justify-between border-b-2 border-b-black h-8">
          {props.heading}
          <button
            className="right-4 translate-y-1/5"
            onClick={() => {
              setShow((prev) => !prev);
            }}
          >
            <FaTimes size="24px" />
          </button>
        </div>
        <div
          style={{
            height: 'calc(100% - 2rem)',
          }}
        >
          {props.children}
        </div>
      </div>
    </ReactModal>
  );
}
