import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function getStorageValue(key, defaultValue) {
    // getting stored value
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial;
    }
}

const key = 'cart-list-v3';

export const useCartListLocalStorage = () => {
    const value = useSelector(state => state.cartListLocalStorage);
    const dispatch = useDispatch();

    useEffect(() => {
        let storageData = getStorageValue(key, [])
        dispatch({
            type: 'CART_LIST_LOCALSTORAGE_REDUX_SET_DATA',
            payload: storageData
        })
    }, []);

    function setValue(data) {
        localStorage.setItem(key, JSON.stringify(data));
        let storageData = getStorageValue(key, [])
        dispatch({
            type: 'CART_LIST_LOCALSTORAGE_REDUX_SET_DATA',
            payload: storageData
        })
    }

    return [value, setValue];
};