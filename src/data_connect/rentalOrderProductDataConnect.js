import axios from "axios"
import { axiosAuthInterceptor } from "./axiosInterceptors";
import { csrfDataConnect } from "./csrfDataConnect";

const MAIN_API_ADDRESS = process.env.REACT_APP_MAIN_API_ADDRESS;

const rentalOrderProductDataConnect = () => {
    return {
        searchPageByPrivate: async ({ params }) => {
            return await axiosAuthInterceptor.get(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/private`, {
                params: { ...params },
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToConfirmOrderForList: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-confirmOrder`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToConfirmReservationForList: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-confirmReservation`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToPickedUpForList: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-pickedUp`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToReturnedForList: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-returned`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToCompletedForList: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-completed`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        changeStatusToCancelled: async ({ body }) => {
            await csrfDataConnect().getApiCsrf();
            return await axiosAuthInterceptor.patch(`${MAIN_API_ADDRESS}/api/v1/rental-order-products/target:status/action:set-cancelled`, body, {
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}

export {
    rentalOrderProductDataConnect
}