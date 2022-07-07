import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const roomDataConnect = () => {
    return {
        searchOne: async ({ roomId }) => {
            return await axiosAuthInterceptor.get(`${MAIN_API_ADDRESS}/api/v1/rooms/${roomId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeIntroduction: async ({ roomId, introduction }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rooms/${roomId}/target:introduction`, {
                introduction: introduction
            }, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    roomDataConnect
}