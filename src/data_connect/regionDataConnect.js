import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const regionDataConnect = () => {
    return {
        searchList: async () => {
            return await axiosAuthInterceptor.get(`${MAIN_API_ADDRESS}/api/v1/regions`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        create: async (body) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${MAIN_API_ADDRESS}/api/v1/regions`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        update: async (id, body) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${MAIN_API_ADDRESS}/api/v1/regions/${id}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        delete: async (id) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${MAIN_API_ADDRESS}/api/v1/regions/${id}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    regionDataConnect
}