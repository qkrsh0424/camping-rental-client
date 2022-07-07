import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const productCategoryDataConnect = () => {
    return {
        searchList: async () => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/product-categories`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchListByRoom: async ({ roomId }) => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/product-categories/rooms/${roomId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productCategoryDataConnect
}