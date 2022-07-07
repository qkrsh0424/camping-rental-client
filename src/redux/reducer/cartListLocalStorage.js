const cartListLocalStorage = (
    state = [],
    action
) => {
    switch (action.type) {
        case 'CART_LIST_LOCALSTORAGE_REDUX_SET_DATA':
            return action.payload;
        default:
            return [...state];
    }
}

export default cartListLocalStorage;
