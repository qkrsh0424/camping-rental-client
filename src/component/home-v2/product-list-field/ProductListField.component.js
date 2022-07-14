import _ from 'lodash';
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { numberFormatHandler } from '../../../utils/numberFormatHandler';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const ItemListWrapper = styled.div`

    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

const CardWrapper = styled(Link)`
    user-select: none;
    width:20%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    color: #000;
    text-decoration: none;

    cursor: pointer;

    &:hover{
        transition: 0.3s;
        transform: scale(1.02);
    }

    @media all and (max-width: 992px){
        width:100%;
        flex-direction: row;
        padding: 10px 0;
    }

    .image-box{
        overflow: hidden;
        width:100%;
        overflow: hidden;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width:100px;
            height: 100px;
        }
    }

    .image-figure{
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    .image-el{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
    }

    .content-box{
        margin-top: 10px;
        @media all and (max-width: 992px){
            flex:1;
            margin-top: 0;
            margin-left: 10px;
        }
    }

    .content-box .content-title{
        font-size: 16px;
        font-weight: 500;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .content-box .content-price{
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .content-box .content-list{
        padding:0 20px;
        font-size: 13px;
        font-weight: 600;
        margin-top: 5px;
        color: #505050;
        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .content-box .content-regions{
        font-size: 12px;
        line-height: 1.5;
        margin-top: 10px;
        color:#505050;

        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 11px;
        }
    }

    .content-box .content-category{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        font-size: 12px;
        color: #404040;
    }

    .control-button-box{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .control-button-el:nth-last-child(1){
            margin-right: 0;
        }
    }

    .control-button-box .control-button-el{
        user-select: none;
        margin:0;
        padding:0;
        font-size: 13px;
        width:60px;
        height: 30px;
        border:none;
    }
`;

export default function ProductListFieldComponent(props) {

    return (
        <>
            <Container>
                <ItemListWrapper>
                    {props.products.map(product => {
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                allCategories={props.allCategories}
                            />
                        );
                    })}
                </ItemListWrapper>
            </Container>
        </>
    );
}

function ProductCard({
    product,
    allCategories,
}) {
    return (
        <CardWrapper
            to={`/product?productId=${product.id}`}
        >
            <div className='image-box'>
                <div className='image-figure'>
                    <img
                        className='image-el'
                        src={product.thumbnailUri}
                        alt={'product thumbnail'}
                        loading={'lazy'}
                    ></img>
                </div>
            </div>
            <div className='content-box'>
                <div className='content-title'>{product.name}</div>
                <div className='content-price'>{numberFormatHandler().numberWithCommas(product.price || 0)} 원 (1시간)</div>
                <ul className='content-list'>
                    <li>
                        최소 대여 가능 시간 {product.minimumRentalHour}H
                    </li>
                    {product.discountYn === 'y' &&
                        <li>
                            {product.discountMinimumHour}H 이상 대여시 <span style={{ color: '#b39283' }}>{product.discountRate}% 할인</span>
                        </li>
                    }
                </ul>
                <div className='content-regions'>
                    <div>픽업 | 반납 장소</div>
                    {product.regions.slice(0, 3).map(r => {
                        return (
                            <div key={r.id}>{r.fullAddress}</div>
                        );
                    })}
                </div>
                <div
                    className='content-category'
                >
                    {allCategories.map(r => {
                        if (r.id === product.productCategoryId) {
                            return (
                                <div
                                    key={r.id}
                                >
                                    {r.name}
                                </div>
                            );
                        } else {
                            return (
                                <React.Fragment key={r.id}></React.Fragment>
                            );
                        }
                    })}
                </div>
            </div>
        </CardWrapper>
    );
}