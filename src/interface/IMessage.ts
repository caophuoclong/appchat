interface message {
    text: string;
    date: number;
    senderUsername: string;
    receiverUsername: string;
    senderId: string;
    receiverId: string;
    type: "text" | "image",
}
export default message;