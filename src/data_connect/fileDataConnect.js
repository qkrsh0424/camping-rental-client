import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const fileDataConnect = () => {
    return {
        uploadImageToS3: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/file/image/s3`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

const fileDataConnectV2 = () => {
    return {
        uploadImageToS3: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${MAIN_API_ADDRESS}/api/v2/file/image/s3`, params, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    fileDataConnect,
    fileDataConnectV2
}