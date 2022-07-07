import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const productDataConnect = () => {
    return {
        searchOneById: async ({ productId }) => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/products/${productId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchListByRoom: async ({ roomId, params }) => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/products/rooms/${roomId}`, {
                params: { ...params },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchPage: async ({ params }) => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/products/page`, {
                params: { ...params },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        searchListByIds: async ({ params }) => {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/products/ids`, {
                params: { ...params },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        createOne: async ({ roomId, body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.post(`${MAIN_API_ADDRESS}/api/v1/products/one/rooms/${roomId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeDisplayYn: async ({ productId, displayYn }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/products/${productId}/target:display-yn`, {
                displayYn: displayYn
            }, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteOne: async ({ productId }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.delete(`${MAIN_API_ADDRESS}/api/v1/products/${productId}`, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async ({ productId, body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.put(`${MAIN_API_ADDRESS}/api/v1/products/${productId}`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    productDataConnect
}