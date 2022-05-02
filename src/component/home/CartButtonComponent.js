import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const CartButton = styled.button`
    position: fixed;
    z-index: 10;
    bottom: 30px;
    right:30px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #00b8ba;
    background: white;
    cursor: pointer;

    img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
    }

    .badge-box{
        box-sizing: border-box;
        position: absolute;
        z-index: 11;
        top: 0;
        left: 0;
        border: 1px solid red;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: red;
    }

    .badge-item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
        font-weight: 600;
    }

    &:hover{
        background: #e1e1e160;
    }
`;
const CartButtonComponent = (props) => {
    return (
        <>
            <CartButton type='button' onClick={() => props._onCartModalOpen()}>
                {(props.cartList && props.cartList?.length > 0) &&
                    <div className='badge-box'>
                        <span className='badge-item'>{props.cartList.length}</span>
                    </div>
                }
                <img src='/assets/icon/cart_icon.png'></img>
            </CartButton>
        </>
    );
}
export default CartButtonComponent;