import axios from "axios";
import IResult from "../interface/IResultCloudinary";
import { CLOUD_NAME } from "../configs/index"
function dataURItoBlob(data: string | ArrayBuffer) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    const dataURI = typeof data === "string" ? data : Buffer.from(data).toString();
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
const upload = (imgBase64: string | ArrayBuffer) => {
    return new Promise<IResult>((resolve, reject) => {
        if (!CLOUD_NAME) reject("CLoud name is not define. You could define in .env");
        const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const file = dataURItoBlob(imgBase64);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "tutorial");
        formData.append("cloud_name", CLOUD_NAME!);
        axios.post(url, formData).then(result => {
            const { data, status } = result;
            const newResult: IResult = {
                status: status,
                data: {
                    asset_id: data.asset_id,
                    public_id: data.public_id,
                    version: data.version
                }
            }
            resolve(newResult);
        })
        return;
    })

}

export default upload;