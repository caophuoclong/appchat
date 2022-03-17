import axios from "axios";
const upload = (file: File) => {
    const url = "https://api.cloudinary.com/v1_1/dishy0j0y/image/upload"
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tutorial");
    formData.append("cloud_name", "dishy0j0y");
    return axios.post(url, formData);
}

export default upload;