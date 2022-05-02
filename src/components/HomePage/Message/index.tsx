import moment from 'moment';
import React, { ChangeEvent, ReactEventHandler } from 'react';
import { VscChromeMinimize, VscChromeClose, VscChevronDown } from 'react-icons/vsc';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { BiPaperPlane } from 'react-icons/bi';
import { ReactComponent as Love } from '../../../assets/icons/love.svg';
import { useAppDispatch } from '../../../hook';
import { hideMessageModal } from '../../../reducers/globalSlice';
type Props = {
  className?: string;
};

export default function Message({ className }: Props) {
  const fillColor = 'blue';
  const textColor = 'white';
  const dispatch = useAppDispatch();
  const [sendText, setSendText] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const inputForm = React.useRef<HTMLDivElement>(null);
  const functionForm = React.useRef<HTMLDivElement>(null);
  const handleOnChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        dispatch(hideMessageModal());
        return;

      default:
        return;
    }
  };
  React.useEffect(() => {
    const x1 = functionForm.current;
    const x2 = inputForm.current;
    if (x1 && x2) {
      if (message.length > 0) {
        x1.classList.remove('w-2/6');
        x1.classList.add('w-1/6');
        x2.classList.remove('w-3/6');
        x2.classList.add('w-4/6');
        setSendText(true);
      } else {
        x1.classList.add('w-2/6');
        x1.classList.remove('w-1/6');
        x2.classList.add('w-3/6');
        x2.classList.remove('w-4/6');
        setSendText(false);
      }
    }
  }, [message]);
  const handleCloseMessageModal = () => {
    dispatch(hideMessageModal());
  };
  return (
    <div className={`${className} flex flex-col`} style={{ height: '45%' }}>
      <div className="flex items-center py-1  border-b shadow-lg">
        <div
          className="flex gap-x-1 items-center hover:bg-gray-200 px-2 rounded-lg cursor-pointer"
          style={{
            maxWidth: '70%',
            minWidth: '50%',
          }}
        >
          <img src="https://picsum.photos/44" alt="" className="w-10 h-10 rounded-full" />
          <div className="w-3/5">
            <p className="truncate  font-bold text-sm">Tran Cao Phuoc Long</p>
            <p className="text-xs font-bold text-gray-400">
              {moment(new Date(2022, 3, 24, 10, 25)).fromNow()}
            </p>
          </div>
          <div className="ml-auto">
            <VscChevronDown size="24px" color="black" />
          </div>
        </div>
        <div className="flex  gap-x-2 w-3/5 justify-end">
          <button className="text-blue-500 hover:bg-blue-500 hover:text-white rounded-full p-2px">
            <VscChromeMinimize size="18px" />
          </button>
          <button
            onClick={handleCloseMessageModal}
            className="text-blue-500 hover:bg-blue-500 hover:text-white rounded-full p-2px"
          >
            <VscChromeClose size="18px" />
          </button>
        </div>
      </div>
      <div className="bg-white h-full overflow-y-auto">h2</div>
      <div className="mt-auto py-2 group flex gap-x-2">
        <div ref={functionForm} className="w-2/6 transition-all duration-400 flex px-2">
          <button>
            <AiFillPlusCircle size="20px" fill={fillColor} color={textColor} />
          </button>
          <button>
            <BsFillFileEarmarkImageFill size="20px" fill={fillColor} color={textColor} />
          </button>
        </div>
        <div ref={inputForm} className="w-3/6 bg-gray-200 rounded-lg transition-all duration-400">
          <input
            value={message}
            onChange={handleOnChangeMessage}
            onKeyDown={handleKeyDown}
            type="text"
            className="bg-transparent w-full outline-none px-2"
            placeholder="Tin nhan"
            autoFocus
          />
        </div>
        <button className="w-1/6 flex justify-center">
          {sendText ? <BiPaperPlane size="24px" color={'blue'} /> : <Love width={24} height={24} />}
        </button>
      </div>
    </div>
  );
}
