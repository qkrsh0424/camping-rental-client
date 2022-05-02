import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import ItemCardComponent from '../../common/ItemCardComponent';
import { numberFormatHandler } from '../../../utils/numberFormatHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 0;
    }
`;

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media all and (max-width:992px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ItemBox = styled.div`
    margin: 5px;
    padding: 5px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;

    .display-btn-off{
        width: 100px;
        background: red;
        border: 1px solid #00000000;
        border-radius: 5px;

        font-weight: 700;
        color: white;

        cursor: pointer;
    }

    .display-btn-on{
        width: 100px;
        background: green;
        border: 1px solid #00000000;
        border-radius: 5px;

        font-weight: 700;
        color: white;

        cursor: pointer;
    }

    .title{
        font-size: 16px;
        font-weight: 500;
        /* 글자가 라인 두줄 범위 넘어가면 ...처리 */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* 글자가 라인 두줄 범위 넘어가면 ...처리 */

    }

    .description{
        margin-top: 10px;
        font-size: 13px;
        font-weight: 500;
        color: #444;
    }

    .price-info-box{
        margin-top: 10px;
        font-size: 12px;
        color:#888;
    }

    .rental-region-box{
        margin-top: 10px;
        font-size: 12px;
        color: #07af8c;
        font-weight: 600;
    }

    .return-region-box{
        margin-top: 10px;
        font-size: 12px;
        color: #07af8c;
        font-weight: 600;
    }

    .bold-600{
        font-weight: 600;
    }

    .control-box{
        margin-top: 10px;
    }

    .control-btn{
        padding: 10px;
        margin-right: 5px;
        border: 1px solid #e1e1e1;
        background: white;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const ImageBox = styled.div`
    overflow: hidden;
    width:100%;
    height:auto;
    margin-bottom: 10px;
    border-radius: 5px;

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
`;

const BodyComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

    const _routeToUpdate = (itemId) => {
        query.itemId = itemId;

        let url = qs.stringifyUrl({
            url: '/update/',
            query: { ...query }
        })
        navigate(url, {
            replace: false
        })
    }
    return (
        <>
            <Container>
                <ItemWrapper>
                    {props.itemListState?.map(r => {
                        return (
                            <ItemBox key={r.id}>
                                <div style={{ marginBottom: '5px', textAlign: 'center' }}>
                                    <button
                                        className={`${r.displayYn === 'y' ? 'display-btn-on' : 'display-btn-off'}`}
                                        type='button'
                                        onClick={() => props._onDisplayChangeModalOpen(r)}
                                    >{r.displayYn === 'y' ? 'ON' : 'OFF'}</button>
                                </div>
                                <ImageBox>
                                    <div className='image-figure'>
                                        <img className='image-el' src={r.thumbnailFullUri}></img>
                                    </div>
                                </ImageBox>
                                <div className='title'>{r.name}</div>
                                <div className='description'>{r.description}</div>
                                <div className='price-info-box'>
                                    <div>

                                        <span className='bold-600'>1박당 가격 : </span>
                                        <span className='bold-600'>{numberFormatHandler().numberWithCommas(r.price || 0)} 원</span>
                                    </div>
                                    <div>
                                        <span className='bold-600'>연박시 할인율 : </span>
                                        <span className='bold-600'>{r.discountRate} %</span>
                                    </div>
                                    <div>
                                        <span className='bold-600'>할인 적용 2박 가격 : </span>
                                        <span className='bold-600'>{numberFormatHandler().numberWithCommas(((r.price * 2) * ((100 - r.discountRate) / 100)) || 0)} 원</span>
                                    </div>
                                </div>
                                <div className='rental-region-box'>
                                    <div>[픽업 장소]</div>
                                    <div>{r.rentalRegions}</div>
                                </div>
                                <div className='rental-region-box'>
                                    <div>[반납 장소]</div>
                                    <div>{r.returnRegions}</div>
                                </div>
                                <div className='control-box'>
                                    <button className='control-btn' type='button' style={{ color: 'blue' }} onClick={() => _routeToUpdate(r.id)}>수정</button>
                                    <button className='control-btn' type='button' style={{ color: 'red' }} onClick={() => props._onDeleteItemModalOpen(r)}>삭제</button>
                                </div>
                            </ItemBox>
                        );
                    })}
                </ItemWrapper>
            </Container>
        </>
    );
}
export default BodyComponent;