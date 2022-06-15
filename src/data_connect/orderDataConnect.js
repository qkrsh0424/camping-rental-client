import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const orderDataConnect = () => {
    return {
        searchList: async function (params) {
            return axios.get(`${MAIN_API_ADDRESS}/api/v1/order/list`, {
                params: params,
                withCredentials: true
            })
        },
        createOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/order/create`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    orderDataConnect
}