import { useEffect, useReducer } from "react";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { rentalOrderInfoDataConnect } from "../../data_connect/rentalOrderInfoDataConnect";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";
import { useCartListLocalStorage } from "../../hooks/useCartListLocalStorage";
import CartListFieldComponent from "./cart-list-field/CartListField.component";
import HeadFieldComponent from "./head-field/HeadField.component";
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 150px;
`;

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();
    const [cartList, setCartList] = useCartListLocalStorage();
    const [products, dispatchProducts] = useReducer(productsReducer, initialProducts);
    const [aggregatedProducts, dispatchAggregatedProducts] = useReducer(aggregatedProductsReducer, initialAggregatedProducts);

    useEffect(() => {
        if (!customRouter.isReady) {
            return;
        }
        __products.req.fetch();
    }, [customRouter.location, customRouter.isReady]);

    useEffect(() => {
        // products 가 패치 된 상태가 아니라면 리턴
        if (!products) {
            return;
        }

        let aggregatedProductsInit = []

        // 장바구니 내부에 주문 순서를 지정하기 위해서 cartList 내부에 roomName 을 기준으로 정렬 해준다.
        let sortedCartList = [...cartList].sort((a, b) => a.roomName > b.roomName ? 1 : -1);

        sortedCartList.forEach(cartItem => {
            let product = products.filter(r => r.id === cartItem.productId)[0];
            let aggregatedProduct = aggregatedProductsInit.filter(r => r.roomId === cartItem.roomId)[0];

            // 이미 생성된 aggregatedProduct 가 있다면 해당 데이터에 cartProducts 만 추가해준다.
            if (aggregatedProduct) {
                aggregatedProduct.cartProducts.push({
                    cartId: cartItem.id,
                    productId: product.id,
                    productName: product.name,
                    thumbnailUri: product.thumbnailUri,
                    price: product.price,
                    discountRate: product.discountRate,
                    unit: cartItem.unit
                })
            } else {
                // roomId에 해당하는 aggregatedProduct 데이터 셋이 만들어져 있지 않다면 새롭게 생성해준다.
                let cartProducts = [];

                cartProducts.push(
                    {
                        cartId: cartItem.id,
                        productId: product.id,
                        productName: product.name,
                        thumbnailUri: product.thumbnailUri,
                        price: product.price,
                        discountRate: product.discountRate,
                        unit: cartItem.unit
                    }
                )

                aggregatedProductsInit.push({
                    roomId: product.roomId,
                    roomName: product.room.name,
                    regions: product.regions,
                    cartProducts: cartProducts
                })
            }
        })

        dispatchAggregatedProducts({
            type: 'SET_DATA',
            payload: aggregatedProductsInit
        })

    }, [products])

    const __handle = {
        req: {
            rentalOrderInfoCreateOne: async ({ body, callback }) => {
                await rentalOrderInfoDataConnect().createOne({ body })
                    .then(async res => {
                        if (res.status === 200) {
                            callback();
                            let productIds = body.rentalOrderProducts.map(r => r.productId);
                            let currCartList = [...cartList];

                            currCartList = currCartList.filter(r => !productIds.includes(r.productId));

                            setCartList([...currCartList]);
                            await __products.req.fetch();
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결 상태가 좋지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            deleteCartItem: async (cartProduct) => {
                let newCartList = [...cartList];
                newCartList = newCartList.filter(r => r.id !== cartProduct.cartId);

                setCartList(newCartList);
                await __products.req.fetch();
            },
            orderReception: async ({ body, callback }) => {
                await __handle.req.rentalOrderInfoCreateOne({ body, callback });
            }
        }
    }
    const __products = {
        req: {
            fetch: async () => {
                let productIdsSet = new Set();
                cartList.forEach(r => {
                    if (r.productId) {
                        productIdsSet.add(r.productId)
                    }
                });

                let productIds = [...productIdsSet];

                let params = {
                    productIds: productIds.join(',')
                }

                await productDataConnect().searchListByIds({ params: params })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchProducts({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
    return (
        <>
            <Container>
                <HeadFieldComponent />
                {cartList.length <= 0 &&
                    (
                        <div
                            style={{
                                textAlign:'center',
                                fontWeight:'600',
                                marginTop:'100px'
                            }}
                        >장바구니가 비었습니다.</div>
                    )
                }
                {aggregatedProducts?.map(aggregatedProduct => {
                    return (
                        <CartListFieldComponent
                            key={aggregatedProduct.roomId}
                            aggregatedProduct={aggregatedProduct}
                            onSubmitDeleteCartItem={__handle.submit.deleteCartItem}
                            onSubmitOrderReception={__handle.submit.orderReception}
                        />
                    )
                })}
            </Container>
        </>
    );
}

const initialProducts = null;
const initialAggregatedProducts = null;

const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProducts;
        default: return initialProducts;
    }
}

const aggregatedProductsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialAggregatedProducts;
        default: return initialAggregatedProducts;
    }
}