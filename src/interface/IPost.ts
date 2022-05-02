import MediaType from "./IMedia";

interface PostType {
    imgUrl: string;
    name: string;
    time: Date;
    content: string;
    media: Array<{
        url: string;
        type: MediaType;
    }>;
    reaction: reaction,
    comment?: comment;
    share?: share;

}
type comment = Array<string>;
type share = Array<string>;
type reaction = {
    like?: Array<string>;
    haha?: Array<string>;
    sad?: Array<string>;
    love?: Array<string>;
}
export type { reaction, comment, share }
export default PostType;