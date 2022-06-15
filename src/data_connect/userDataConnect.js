import axios from "axios"
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const userDataConnect = () => {
    return {
        checkDuplicateUsername: async ({ username }) => {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/users/target:username/action:check-duplicate`, {
                username: username
            }, {
                withCredentials: true,
                xsrfCookieName:'x_api_csrf_token',
                xsrfHeaderName:'X-XSRF-TOKEN'
            })
        },
        signup: async (body) => {
            await csrfDataConnect().getApiCsrf();
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/users/signup`, body, {
                withCredentials: true,
                xsrfCookieName:'x_api_csrf_token',
                xsrfHeaderName:'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    userDataConnect
}