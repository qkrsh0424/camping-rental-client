import { useEffect, useReducer, useState } from 'react';
import qs from 'query-string';
import styled from 'styled-components';
import { categoryDataConnect } from '../../data_connect/categoryDataConnect';
import { itemDataConnect } from '../../data_connect/itemDataConnect';
import BodyComponent from './BodyComponent';
import CategoryListComponent from './CategoryListComponent';
import { useLocation } from 'react-router-dom';
import CartButtonComponent from './CartButtonComponent';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CartModalComponent from './CartModalComponent';
import CommonModalComponent from '../common/CommonModalComponent';
import { handlingAreaDataConnect } from '../../data_connect/handlingAreaDataConnect';
import { orderDataConnect } from '../../data_connect/orderDataConnect';
import BannerComponent from './BannerComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialCategoryListState = null;
const initialItemListState = null;
const initialHandlingAreaListState = null;

const categoryListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const itemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const handlingAreaListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const HomeMainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const categoryId = query.categoryId;

    const [cartList, setCartList] = useLocalStorage('cart-list', []);

    const [categoryListState, dispatchCategoryListState] = useReducer(categoryListStateReducer, initialCategoryListState);
    const [itemListState, dispatchItemListState] = useReducer(itemListStateReducer, initialItemListState);
    const [handlingAreaListState, dispatchHandlingAreaListState] = useReducer(handlingAreaListStateReducer, initialHandlingAreaListState);

    const [cartModalOpen, setCartModalOpen] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            let params = {
                categoryId: categoryId
            }
            __handleDataConnect().searchCategoryList();
            __handleDataConnect().searchItemList(params);
            __handleDataConnect().searchHandlingArea();
        }

        fetchInit();
    }, [categoryId]);

    const __handleDataConnect = () => {
        return {
            searchCategoryList: async function () {
                await categoryDataConnect().searchAll()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchCategoryListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            },
            searchItemList: async function (params) {
                await itemDataConnect().searchDisplayList(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchItemListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            },
            searchHandlingArea: async function () {
                await handlingAreaDataConnect().searchAll()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchHandlingAreaListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            },
            createOrder: async function (params) {
                await orderDataConnect().createOne(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            setCartList([]);
                            alert('정상적으로 접수 완료 되었습니다.');
                            return;
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res && res.status === 500) {
                            alert('undefined error.')
                            return;
                        }

                        alert(res.data?.memo);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            _onAddCart: function (params) {
                let dataList = [...cartList];
                dataList.push(params);
                setCartList(dataList);
                alert('장바구니에 등록 되었습니다.');
            },
            _onCartModalOpen: function () {
                setCartModalOpen(true);
            },
            _onCartModalClose: function () {
                setCartModalOpen(false);
            },
            _onDeleteCartItemOne: function (id) {
                let dataList = [...cartList];
                let newDataList = dataList.filter(r => r.id !== id)
                setCartList(newDataList);
            },
            _onDeleteCartItemAll: function () {
                setCartList([]);
            },
            _onOrderSubmit: async function (params) {
                __handleDataConnect().createOrder(params);
            }
        }
    }

    return (
        <>
            <Container>
                <BannerComponent></BannerComponent>
                <CategoryListComponent
                    categoryListState={categoryListState}
                ></CategoryListComponent>
                <BodyComponent
                    itemListState={itemListState}

                    _onAddCart={(params) => __handleEventControl()._onAddCart(params)}
                ></BodyComponent>
            </Container>
            <CartButtonComponent
                cartList={cartList}

                _onCartModalOpen={() => __handleEventControl()._onCartModalOpen()}
            ></CartButtonComponent>

            {/* Modal */}
            <CommonModalComponent
                open={cartModalOpen}

                onClose={() => __handleEventControl()._onCartModalClose()}
            >
                <CartModalComponent
                    cartList={cartList}
                    handlingAreaListState={handlingAreaListState}

                    onClose={() => __handleEventControl()._onCartModalClose()}
                    _onOrderSubmit={(params) => __handleEventControl()._onOrderSubmit(params)}
                    _onDeleteCartItemOne={(id) => __handleEventControl()._onDeleteCartItemOne(id)}
                    _onDeleteCartItemAll={() => __handleEventControl()._onDeleteCartItemAll()}
                ></CartModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default HomeMainComponent;