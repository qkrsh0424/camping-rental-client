import { useReducer, useState } from "react";
import { rentalOrderInfoDataConnect } from "../../../data_connect/rentalOrderInfoDataConnect";
import HeadFieldComponent from "./head-field/HeadField.component";
import InputFormFieldComponent from "./input-form-field/InputFormField.component";


export default function MainComponent(props) {
    const [rentalOrderInfo, dispatchRentalOrderInfo] = useReducer(rentalOrderInfoReducer, initialRentalOrderInfo);

    const __rentalOrderInfo = {
        req: {
            fetch: async ({ params }) => {
                await rentalOrderInfoDataConnect().searchOneByOrderNumber({ params })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchRentalOrderInfo({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            }
        },
        submit: {
            search: async ({ params }) => {
                await __rentalOrderInfo.req.fetch({ params });
            }
        }
    }

    return (
        <>
            <HeadFieldComponent />
            <InputFormFieldComponent
                rentalOrderInfo={rentalOrderInfo}
                onSubmitSearch={__rentalOrderInfo.submit.search}
            />
        </>
    );
}

const initialRentalOrderInfo = null;

const rentalOrderInfoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRentalOrderInfo;
        default: return initialRentalOrderInfo;
    }
}