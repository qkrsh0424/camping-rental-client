import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { orderDataConnect } from '../../../data_connect/orderDataConnect';
import { orderInfoDataConnect } from '../../../data_connect/orderInfoDataConnect';
import OrderListTableComponent from './order-list-table/OrderListTable.component';
import SearchOperatorComponent from './search-operator/SearchOperator.component';

const Container = styled.div`

`;

const initialOrderList = null;

const orderListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const MainComponent = (props) => {
    const [password, setPassword] = useState(null);
    const [orderList, dispatchOrderList] = useReducer(orderListReducer, initialOrderList);

    const __password = {
        change: {
            self: (e) => {
                let value = e.target.value;

                setPassword(value);
            }
        }
    }

    const __orderList = {
        req: {
            fetch: async () => {
                let params = {
                    password: password
                }

                await orderDataConnect().searchList(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchOrderList({
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
        },
        submit: {
            search: async () => {
                __orderList.req.fetch();
            }
        }

    }

    const __orderInfo = {
        req: {
            changeStatusOne: async ({
                body,
                callback
            }) => {
                await orderInfoDataConnect().changeStatusOne(body)
                    .then(res => {
                        if (res.status === 200) {
                            __orderList.req.fetch();
                            callback();
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
        },
        submit: {
            changeStatus: async ({
                body,
                callback
            }) => {
                await __orderInfo.req.changeStatusOne({
                    body,
                    callback
                });
            }
        }
    }

    return (
        <>
            <Container>
                <SearchOperatorComponent
                    password={password}
                    onSubmitSearchOrderList={__orderList.submit.search}

                    onChangePassword={__password.change.self}
                ></SearchOperatorComponent>
                {orderList &&
                    <OrderListTableComponent
                        orderList={orderList}

                        onSubmitChangeStatus={__orderInfo.submit.changeStatus}
                    ></OrderListTableComponent>
                }

            </Container>
        </>
    );
}
export default MainComponent;