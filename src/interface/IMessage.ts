interface message {
    _id?: string,
    text: string,
    senderId: string,
    type: "image" | "text",
    createAt?: Date | string,
}
export default message;