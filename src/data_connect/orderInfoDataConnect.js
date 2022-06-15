import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const orderInfoDataConnect = () => {
    return {
        searchPage: async function (params) {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/order-infos/page`, {
                params: params,
                withCredentials: true
            })
        },
        changeStatusOne: async function (body) {
            await csrfDataConnect().getApiCsrf();
            return await axios.patch(`${MAIN_API_ADDRESS}/api/v1/order-infos/${body.orderInfoId}/target:status`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    orderInfoDataConnect
}