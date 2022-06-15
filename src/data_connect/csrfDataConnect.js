import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const csrfDataConnect = () => {
    return {
        getApiCsrf: async function () {
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/csrf/api`, {
                withCredentials: true
            })
        },
        postTest:async function () {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/csrf/test1`, null ,{
                withCredentials:true,
                xsrfCookieName:'x_api_csrf_token',
                xsrfHeaderName:'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    csrfDataConnect
}