import axios from "axios"

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const handlingAreaDataConnect = () =>{
    return {
        searchAll: async function(){
            return await axios.get(`${MAIN_API_ADDRESS}/api/v1/handling-area/all`,{
                withCredentials:true
            })
        }
    }
}

export {
    handlingAreaDataConnect
}