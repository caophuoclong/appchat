import axios from "axios"
import queryString from "query-string"
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("access_token")!)
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`
    }
    return config
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
}, error => {
    throw error
})

export default axiosClient;