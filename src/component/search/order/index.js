import { useReducer } from 'react';
import styled from 'styled-components';
import { orderDataConnect } from '../../../data_connect/orderDataConnect';
import AccessInfoComponent from './AccessInfoComponent';
import OrderListComponent from './OrderListComponent';

const Container = styled.div`

`;

const initialOrderListState = null;

const orderListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const MainComponent = (props) => {
    const [orderListState, dispatchOrderListState] = useReducer(orderListStateReducer, initialOrderListState);

    const __handleDataConnect = () => {
        return {
            searchOrderList: async function (params) {
                await orderDataConnect().searchList(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchOrderListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status === 500) {
                            alert('undefined error.')
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            _onSearchOrderList: function (password) {
                let params = {
                    password: password
                }
                __handleDataConnect().searchOrderList(params);
            }
        }
    }
    return (
        <>
            <Container>
                <AccessInfoComponent
                    _onSearchOrders={(password) => __handleEventControl()._onSearchOrderList(password)}
                ></AccessInfoComponent>
                {orderListState &&
                    <OrderListComponent
                        orderListState={orderListState}
                    ></OrderListComponent>
                }

            </Container>
        </>
    );
}
export default MainComponent;