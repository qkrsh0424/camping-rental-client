// import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './page/home';
import WritePage from './page/write';
import UpdatePage from './page/update';
import SearchOrderPage from './page/search/order';
import SearchItemPage from './page/search/item';
import LoginPage from './page/login';
import SignupPage from './page/signup';
import NotFoundPage from './page/404';

function App() {
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
