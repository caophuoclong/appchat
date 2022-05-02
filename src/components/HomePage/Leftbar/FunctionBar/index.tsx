import React, { MouseEventHandler, useId, useRef } from 'react';
import { VscHome } from 'react-icons/vsc';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
type Props = {};

function Item({ children, id }: { children?: React.ReactNode; id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const homeElement = document.getElementById('home');
    if (homeElement) {
      homeElement.classList.add('active');
      homeElement.previousElementSibling?.classList.remove('border-b');
    }
    if (ref && ref.current) {
      ref.current.addEventListener('mouseover', () => {
        if (ref.current!.previousElementSibling) {
          ref.current!.previousElementSibling.classList.remove('border-b');
        }
      });
      ref.current.addEventListener('mouseout', () => {
        if (!ref.current!.classList.contains('active')) {
          if (ref.current!.previousElementSibling) {
            ref.current!.previousElementSibling.classList.add('border-b');
          }
        }
      });
    }
  }, [ref.current]);
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentElement = event.currentTarget as HTMLDivElement;
    if (document.querySelectorAll('.active')[0])
      document.querySelectorAll('.active')[0].classList.remove('active');
    if (!currentElement) return;
    if (currentElement.classList.contains('active')) {
      currentElement.classList.remove('active');
    } else {
      currentElement.classList.add('active');
      const previousElementSibling = currentElement.previousElementSibling;
      if (previousElementSibling) {
        previousElementSibling.classList.remove('border');
      }
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      onClick={handleOnClick}
      className="h-16 box-border border-b border-gray-400 mx-8 py-3 px-0 flex gap-x-4 items-center text-gray-600 font-semibold last:border-b-0 hover:mx-0 hover:px-8 hover:border-l-2 hover:border-l-blue-500 hover:bg-gray-200 cursor-pointer hover:border-y"
    >
      {children}
    </div>
  );
}

export default function FunctionBar({}: Props) {
  const id1 = useId();
  const items = [
    {
      text: 'Home',
      icon: <VscHome size="24px" color="gray" />,
    },
    // {
    //   text: 'User',
    //   icon: <RiAccountBoxLine size="24px" color="gray" />,
    // },
    {
      text: 'Photos',
      icon: <MdOutlinePhotoSizeSelectActual size="24px" color="gray" />,
    },
    // {
    //   text: 'News Feed',
    //   icon: <MdOutlineCalendarViewWeek size="24px" color="gray" />,
    // },
    {
      text: 'User Profile',
      icon: <AiOutlineUser size="24px" color="gray" />,
    },
    { text: 'Settings', icon: <IoSettingsOutline size="24px" color="gray" /> },
  ];
  return (
    <div id={id1} className="rounded-lg shadow-lg py-2 box-border bg-white">
      {items.map((item, index) => (
        <Item key={index} id={item.text.toLowerCase().replaceAll(' ', '')}>
          {item.icon}
          <p>{item.text}</p>
        </Item>
      ))}
    </div>
  );
}
