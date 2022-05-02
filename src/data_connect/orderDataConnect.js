import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const orderDataConnect = () => {
    return {
        createOne: async function (params) {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/order/create`, params, {
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return axios.get(`${MAIN_API_ADDRESS}/api/v1/order/list`, {
                params: params,
                withCredentials: true
            })
        }
    }
}

export {
    orderDataConnect
}