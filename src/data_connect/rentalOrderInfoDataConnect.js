import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const rentalOrderInfoDataConnect = () => {
    return {
        createOne: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${MAIN_API_ADDRESS}/api/v1/rental-order-infos`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    rentalOrderInfoDataConnect
}