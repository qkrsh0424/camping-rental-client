import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const fileDataConnect = () => {
    return {
        uploadImageToS3: async function (params) {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/file/image/s3`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    fileDataConnect
}