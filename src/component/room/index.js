import { useEffect, useReducer, useState } from "react";
import { itemDataConnect } from "../../data_connect/itemDataConnect";
import HeadFieldComponent from "./head-field/HeadField.component";
import IntroduceFieldComponent from "./introduce-field/IntroduceField.component";
import ProductFieldComponent from "./product-field/ProductField.component";
import SideNavFieldComponent from "./side-nav-field/SideNavField.component";

export default function MainComponent(props) {
    const [items, dispatchItems] = useReducer(itemsReducer, initialItems);

    useEffect(() => {
        __items.req.fetchItems();
    }, []);

    const __items = {
        req: {
            fetchItems: async () => {
                await itemDataConnect().searchDisplayList(null)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchItems({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            }
        }
    }

    console.log(items);
    return (
        <>
            <HeadFieldComponent />
            <IntroduceFieldComponent />
            <SideNavFieldComponent />
            <ProductFieldComponent
                items={items}
            />
        </>
    );
}

const initialItems = null;

const itemsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialItems;
    }
}