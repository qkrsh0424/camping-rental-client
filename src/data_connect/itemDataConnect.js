import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const itemDataConnect = () => {
    return {
        searchOne: async function (params) {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/item/one`, {
                params: params,
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/item/list`, {
                params: params,
                withCredentials: true
            })
        },
        searchDisplayList: async function (params) {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/item/list/display`, {
                params: params,
                withCredentials: true
            })
        },
        createOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/item/create`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        updateOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.put(`${MAIN_API_ADDRESS}/api/v1/item/update`, params, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        deleteItemOne: async function (params) {
            await csrfDataConnect().getApiCsrf();
            return await axios.delete(`${MAIN_API_ADDRESS}/api/v1/item/delete`, {
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    itemDataConnect
}