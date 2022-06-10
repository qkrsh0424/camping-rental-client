import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const orderInfoDataConnect = () => {
    return {
        changeStatusOne: async function (body) {
            return await axios.patch(`${MAIN_API_ADDRESS}/api/v1/order-infos/${body.orderInfoId}/target:status`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    orderInfoDataConnect
}