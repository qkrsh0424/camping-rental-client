import axios from "axios"

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
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/item/create`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            return await axios.put(`${MAIN_API_ADDRESS}/api/v1/item/update`, params, {
                withCredentials: true
            })
        },
        deleteItemOne: async function (params) {
            return await axios.delete(`${MAIN_API_ADDRESS}/api/v1/item/delete`, {
                params: params,
                withCredentials: true
            })
        }
    }
}

export {
    itemDataConnect
}