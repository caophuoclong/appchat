import { IConversation } from './../interface/IUser';
export function sortConversationByLatest(conversations: Array<IConversation>): Array<IConversation> {
    return [...conversations].sort((a, b) => {
        if (!a.latest) return -1;
        if (!b.latest) return -1;
        return (
            new Date(b.latest.createAt!).getTime() - new Date(a.latest.createAt!).getTime()
        );
    })
}