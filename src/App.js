// import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
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

function App() {
    const userRdx = useSelector(state => state.userRedux);
    const reduxDispatch = useDispatch();
    const customRouter = useCustomRouterHook();

    useEffect(() => {
        reduxDispatch({
            type: 'USER_REDUX_SET_DATA',
            payload: {
                userInfo: null,
                isLoading: true
            }
        })
    }, [customRouter.location]);

    useEffect(() => {
        async function fetchUserRdx() {
            if (userRdx.isLoading) {
                await __userRdx.req.fetchUserInfo();
            }
        }
        fetchUserRdx();

    }, [userRdx.isLoading]);

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
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/write' element={<WritePage />}></Route>
                <Route path='/update' element={<UpdatePage />}></Route>
                <Route path='/search/order' element={<SearchOrderPage />}></Route>
                <Route path='/search/item' element={<SearchItemPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/signup' element={<SignupPage />}></Route>
                <Route path='/*' element={<NotFoundPage />}></Route>
            </Routes>
        </>
    );
}

export default App;
