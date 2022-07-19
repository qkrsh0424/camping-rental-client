// import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import HomePage from './page/home';
import WritePage from './page/write';
import UpdatePage from './page/update';
import SearchOrderPage from './page/search/order';
import SearchItemPage from './page/search/item';
import LoginPage from './page/login';
import SignupPage from './page/signup';
import NotFoundPage from './page/404';
import { useCustomRouterHook } from './hooks/router/useCustomRouterHook';
import { useDispatch, useSelector } from 'react-redux';
import { userDataConnect } from './data_connect/userDataConnect';
import RoomPage from './page/room';
import MyadminPage from './page/myadmin';
import MyadminProductsPage from './page/myadmin/products';
import ProductPage from './page/product';
import CartPage from './page/cart';
import MyadminRentalManageNewOrderPage from './page/myadmin/rental-manage/new-order';
import MyadminRentalManageConfirmOrderPage from './page/myadmin/rental-manage/confirm-order';
import MyadminRentalManageConfirmReservationPage from './page/myadmin/rental-manage/confirm-reservation';
import MyadminRentalManagePickedUpPage from './page/myadmin/rental-manage/picked-up';
import MyadminRentalManageReturnedPage from './page/myadmin/rental-manage/returned';
import MyadminRentalManageCompletedPage from './page/myadmin/rental-manage/completed';
import MyadminRentalManageCancelledPage from './page/myadmin/rental-manage/cancelled';

/**
 * 
 * color
 * red : #e56767
 * green : #5fcf80
 * blue : #2c73d2
 * brown : #b39283
 */
function App() {
    const customRouter = useCustomRouterHook();
    const reduxDispatch = useDispatch();

    useEffect(() => {
        reduxDispatch({
            type: 'USER_REDUX_SET_DATA',
            payload: {
                userInfo: null,
                isLoading: true
            }
        });

        async function fetchUserRdx() {
            await __userRdx.req.fetchUserInfo();
        }
        fetchUserRdx();

    }, [customRouter.location]);

    const __userRdx = {
        req: {
            fetchUserInfo: async () => {
                await userDataConnect().searchUserInfo()
                    .then(res => {
                        if (res.status === 200) {
                            reduxDispatch({
                                type: 'USER_REDUX_SET_DATA',
                                payload: {
                                    userInfo: res.data.data,
                                    isLoading: false
                                }
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                        reduxDispatch({
                            type: 'USER_REDUX_SET_DATA',
                            payload: {
                                userInfo: null,
                                isLoading: false
                            }
                        });
                    })
            }
        }
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/product' element={<ProductPage />}></Route>
                    <Route path='/cart' element={<CartPage />}></Route>
                    {/* <Route path='/write' element={<WritePage />}></Route> */}
                    {/* <Route path='/update' element={<UpdatePage />}></Route> */}
                    {/* <Route path='/search/item' element={<SearchItemPage />}></Route> */}
                    <Route path='/search/order' element={<SearchOrderPage />}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                    <Route path='/signup' element={<SignupPage />}></Route>
                    <Route path='/room' element={<RoomPage />}></Route>
                    <Route path='/myadmin' element={<MyadminPage />}></Route>
                    <Route path='/myadmin/products' element={<MyadminProductsPage />}></Route>
                    <Route path='/myadmin/rental-manage/new-order' element={<MyadminRentalManageNewOrderPage />}></Route>
                    <Route path='/myadmin/rental-manage/confirm-order' element={<MyadminRentalManageConfirmOrderPage />}></Route>
                    <Route path='/myadmin/rental-manage/confirm-reservation' element={<MyadminRentalManageConfirmReservationPage />}></Route>
                    <Route path='/myadmin/rental-manage/picked-up' element={<MyadminRentalManagePickedUpPage />}></Route>
                    <Route path='/myadmin/rental-manage/returned' element={<MyadminRentalManageReturnedPage />}></Route>
                    <Route path='/myadmin/rental-manage/completed' element={<MyadminRentalManageCompletedPage />}></Route>
                    <Route path='/myadmin/rental-manage/cancelled' element={<MyadminRentalManageCancelledPage />}></Route>
                    <Route path='/*' element={<NotFoundPage />}></Route>

                </Routes>
            </Suspense>
        </>
    );
}

export default App;
