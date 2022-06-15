import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import { orderInfoDataConnect } from '../../../data_connect/orderInfoDataConnect';
import PagenationComponent from '../../module/pagenation/PagenationComponent';
import OrderListTableComponent from './order-list-table/OrderListTable.component';
import SearchOperatorComponent from './search-operator/SearchOperator.component';
import { useBackdropHook, BackdropHookComponent } from '../../../hooks/backdrop/useBackdropHook';

const Container = styled.div`

`;

const initialOrderInfoPage = null;

const orderInfoPageReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return initialOrderInfoPage;
    }
}

const MainComponent = (props) => {
    const location = useLocation();
    const queryString = qs.parse(location.search);

    const [password, setPassword] = useState('Csyna134!');
    const {
        open: backdropOpen,
        onActionOpen: onActionBackdropOpen,
        onActionClose: onActionBackdropClose
    } = useBackdropHook();

    const [orderInfoPage, dispatchOrderInfoPage] = useReducer(orderInfoPageReducer, initialOrderInfoPage);

    useEffect(() => {
        async function fetchInit() {
            if (!password) {
                return;
            }
            onActionBackdropOpen();
            await __orderInfo.req.fetch();
            onActionBackdropClose();
        }
        fetchInit();

    }, [location.search]);

    const __password = {
        change: {
            self: (e) => {
                let value = e.target.value;

                setPassword(value);
            }
        }
    }

    const __orderInfo = {
        req: {
            fetch: async () => {
                let page = queryString.page ?? 1;
                let size = queryString.size ?? 10;

                let params = {
                    password: password,
                    page: page,
                    size: size
                }

                await orderInfoDataConnect().searchPage(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchOrderInfoPage({
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
            },
            changeStatusOne: async ({
                body,
                callback
            }) => {
                await orderInfoDataConnect().changeStatusOne(body)
                    .then(res => {
                        if (res.status === 200) {
                            __orderInfo.req.fetch();
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
            search: async () => {
                __orderInfo.req.fetch();
            },
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
                    onSubmitSearchOrderList={__orderInfo.submit.search}

                    onChangePassword={__password.change.self}
                ></SearchOperatorComponent>
                {orderInfoPage &&
                    <>
                        <div
                            style={{
                                padding: 10
                            }}
                        >
                            <PagenationComponent
                                isFirst={orderInfoPage.first}
                                isLast={orderInfoPage.last}
                                pageIndex={orderInfoPage.number}
                                sizeElements={[20, 50, 100]}
                                totalPages={orderInfoPage.totalPages}
                                totalElements={orderInfoPage.totalElements}
                                align={'right'}
                            />
                        </div>
                        <OrderListTableComponent
                            orderList={orderInfoPage.content}

                            onSubmitChangeStatus={__orderInfo.submit.changeStatus}
                        ></OrderListTableComponent>
                    </>
                }

            </Container>

            {backdropOpen &&
                <BackdropHookComponent
                    open={backdropOpen}
                />
            }
        </>
    );
}
export default MainComponent;