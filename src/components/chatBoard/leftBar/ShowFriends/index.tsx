import React from 'react'
import {FaUserFriends} from "react-icons/fa"
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { setSelectedModal } from '../../../../reducers/globalSlice';
import Modal from '../../SettingsModal/Modal';
type Props = {}

export default function ShowFriends({}: Props) {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(state => state.global.language);
    const selectedModal = useAppSelector(state => state.global.selectedModal);
    const [selectView, setSelectView] = React.useState<"friends" | "requested" | "pending" | null>("friends");
    const customStyle = {
        content: {
          width: 'max-content',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          height: "580px",
          minWidth: "600px",
        },
      }
  return (
    <div className="">
        <button onClick={()=>{dispatch(setSelectedModal('showFriends'))}}>
            <FaUserFriends size="24px"/>
        </button>
        { 1 && <Modal customStyle={customStyle} heading={<div>
      {lang === "en" ? "Friends" : "Danh sách bạn bè"}
    </div>}>
        <div  className="flex justify-between p-1 gap-4 bg-green-200 my-2 rounded-2xl">
            <button onClick={()=>setSelectView("friends")}  className={` cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${selectView === "friends" && "bg-glareGreen"}`}>
                {lang === "en" ? "Friends" : "Bạn bè"}
            </button>
            <button onClick={()=>setSelectView("requested")}  className={` cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${selectView === "requested" && "bg-glareGreen"}`}>
                {lang === "en" ? "Friends Requested": "Yêu cầu kết bạn"}
            </button>
            <button onClick={()=>setSelectView("pending")}  className={` cursor-pointer w-1/3 rounded-2xl transition-colors duration-500 text-center py-1 ${selectView === "pending" && "bg-glareGreen"}`}>
                {lang === "en" ? "Friends Pending": "Đang chờ"}
            </button>

        </div>

        </Modal>}
    </div>
  )
}