import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const validationDataConnect = () => {
    return {
        sendPhoneValidationCode: async ({ phoneNumber }) => {
            return await axios.post(`${MAIN_API_ADDRESS}/api/v1/validations/phone/validation-code/action:send`, {
                phoneNumber: phoneNumber
            }, {
                withCredentials: true
            })
        }
    }
}

export {
    validationDataConnect
}