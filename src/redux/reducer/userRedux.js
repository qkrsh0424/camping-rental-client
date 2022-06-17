const userRedux = (
    state = {
        userInfo: null,
        isLoading: true
    },
    action
) => {
    switch (action.type) {
        case 'USER_REDUX_SET_DATA':
            return action.payload;
        case 'USER_REDUX_CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'USER_REDUX_SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'USER_REDUX_SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return {
                userInfo:null,
                isLoading:true
            }
    }
}

export default userRedux;
