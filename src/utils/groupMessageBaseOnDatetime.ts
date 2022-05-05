import { group } from "console";
import message from "../interface/IMessage";

export function GroupMessageBaseOnDatetime(messageList: Array<message>) {
    const groups = messageList.reduce((groups: {
        [key: string]: Array<message>
    }, message, i, x): any => {
        const date = (message.createAt as String).split("T")[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {})
    const groupArray = Object.keys(groups).map(date => {
        return {
            date,
            messageList: groups[date]
        }
    })
    return groupArray;
}