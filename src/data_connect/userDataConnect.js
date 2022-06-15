import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const userDataConnect = () => {
    return {
        checkDuplicateUsername: async ({ username }) => {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/users/target:username/action:check-duplicate`, {
                username: username
            }, {
                withCredentials: true
            })
        },
        signup: async (body) => {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/users/signup`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    userDataConnect
}