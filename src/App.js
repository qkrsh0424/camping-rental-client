// import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './page/home';
import WritePage from './page/write';
import UpdatePage from './page/update';
import SearchOrderPage from './page/search/order';
import SearchItemPage from './page/search/item';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/write' element={<WritePage />}></Route>
                <Route path='/update' element={<UpdatePage />}></Route>
                <Route path='/search/order' element={<SearchOrderPage />}></Route>
                <Route path='/search/item' element={<SearchItemPage />}></Route>
            </Routes>
        </>
    );
}

export default App;
