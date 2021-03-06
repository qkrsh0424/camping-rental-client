import { useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { numberFormatHandler } from '../../../utils/numberFormatHandler';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import LineBreakerBottom from '../../module/fragment/LineBreakerBottom';
import CommonModalComponent from '../../module/modal/CommonModalComponent';
import CustomSelect from '../../module/select/CustomSelect';
import { v4 as uuidv4 } from 'uuid';
import { useCartListLocalStorage } from '../../../hooks/useCartListLocalStorage';

const Container = styled.div`
    flex:1;
    width:100%;
    padding:0 40px;

    @media all and (max-width:992px){
        padding:0;
    }

    .first-wrapper{
        margin-top: 0;

        @media all and (max-width:992px){
            margin-top: 20px;
        }
    }
`;

const ContentWrapper = styled.div`
    margin-top: 20px;
    
    .room-box{
        display: flex;
        align-items: center;
        background:#00000008;
        border-radius: 5px;
        padding:10px
    }

    .room-box>.badge-figure{
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        overflow: hidden;
        background:#f0f0f080;

        @media all and (max-width:992px){
            width: 30px;
            height: 30px;
        }
    }

    .room-box>.badge-figure>.badge{
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .room-box>.nickname{
        margin-left: 10px;
        font-size: 18px;
        font-weight: 500;

        @media all and (max-width:992px){
            font-size: 13px;
        }
    }

    .product-title{
        font-size: 30px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }

    .rentalHour-box{
        display: flex;
        justify-content: flex-end;
        font-size: 18px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 16px;
        }
    }

    .price-box{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
    
    .price-box>div{
        font-size: 24px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 18px;
        }
    }

    .price-box>div:nth-last-child(1){
        display: flex;
        justify-content: flex-end;
        width: 200px;
    }

    .price-box_24h{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
    
    .price-box_24h>div{
        font-size: 16px;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 14px;
        }
    }

    .price-box_24h>div:nth-last-child(1){
        display: flex;
        justify-content: flex-end;
        width: 200px;
    }

    .region-list-box{

    }

    .region-list-box>.title{
        font-size: 18px;
        font-weight: 500;
        color: #505050;

        @media all and (max-width:992px){
            font-size: 15px;
        }
    }

    .region-list-box>.item-list{
        /* list-style: none; */
        margin-top: 5px;
        padding: 0 0 0 20px;
    
        /* max-width: 250px; */
        /* width: 100%; */
    }

    .region-list-box>.item-list>.item{
        /* margin-top: 5px; */
        line-height: 1.5;
        font-size: 16px;
        font-weight: 500;
        color: #505050;

        @media all and (max-width:992px){
            font-size: 13px;
        }
    }

    .service-number-box{

    }

    .service-number-box>.title{
        font-size: 18px;
        font-weight: 500;
        color: #505050;

        @media all and (max-width:992px){
            font-size: 15px;
        }
    }

    .service-number-box>.number{
        margin-top: 5px;
        line-height: 1.5;
        font-size: 16px;
        font-weight: 500;
        color: #505050;

        @media all and (max-width:992px){
            font-size: 13px;
        }
    }

    .add-cart-button-box{
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;

        @media all and (max-width:992px){
            
        }
    }

    .description-box{
        white-space: pre-line;
        word-break: keep-all;
        font-size: 16px;
        line-height: 1.5;

        @media all and (max-width:992px){
            font-size: 14px;
        }
    }

    .add-cart-button-box>.add-button{
        width: 300px;
        height: 48px;
        margin: 0;
        padding: 0;
        border: 1px solid #b39283;
        background: #b39283;
        color: white;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;

        @media all and (max-width:992px){
            width: 100%;
            height: 38px;
            font-size: 15px;
        }
    }
`;

const AddCartModalWrapper = styled.div`
    .product-title{
        padding: 10px;
        font-weight: 600;
    }

    .count-select-box{
        padding: 30px 10px;
    }

    .count-select-box>.label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .count-select-box>.item{
        width: 100%;
        margin:0;
        box-sizing: border-box;
    }

    .button-box{
        display: flex;
    }

    .button-box>.button-el{
        margin:0;
        border:none;
    }
`;

export default function InfoFieldComponent(props) {
    const [addCartModalOpen, setAddCartModalOpen] = useState(false);

    const __handle = {
        action: {
            openAddCartModal: () => {
                setAddCartModalOpen(true);
            },
            closeAddCartModal: () => {
                setAddCartModalOpen(false);
            }
        }
    }
    return (
        <>
            <Container>
                <ContentWrapper
                    className='first-wrapper'
                >
                    <div
                        className='room-box'
                    >
                        <div
                            className='badge-figure'
                        >
                            <img
                                className='badge'
                                src='/assets/icon/face_default_black.svg'
                                alt='badge'
                            ></img>
                        </div>
                        <div
                            className='nickname'
                        >
                            {props.product.room.name} ?????? ??????
                        </div>
                    </div>
                </ContentWrapper>
                <ContentWrapper
                    style={{

                    }}
                >
                    <div className='product-title'>
                        {props.product.name}
                    </div>
                </ContentWrapper>
                <ContentWrapper>
                    <div
                        className='description-box'
                    >
                        {props.product.description}
                    </div>
                </ContentWrapper>
                <LineBreakerBottom
                    gapTop={20}
                />
                <ContentWrapper>
                    <div
                        className='region-list-box'
                    >
                        <div className='title'>?????? | ?????? ?????? ??????</div>
                        <ul className='item-list'>
                            {props.product.regions.map(r => {
                                return (
                                    <li
                                        key={r.id}
                                        className='item'
                                    >
                                        {r.fullAddress}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </ContentWrapper>
                <ContentWrapper>
                </ContentWrapper>
                <ContentWrapper>
                    <div
                        className='rentalHour-box'
                    >
                        ?????? ?????? ?????? ?????? {props.product.minimumRentalHour}H
                    </div>
                    <div
                        className='price-box'
                    >
                        <div>
                            ??????(1??????)
                        </div>
                        <div>
                            {numberFormatHandler().numberWithCommas(props.product.price || 0)} ???
                        </div>
                    </div>
                    {props.product.discountYn === 'y' &&
                        <div
                            className='price-box_24h'
                        >
                            <div>
                                {props.product.discountMinimumHour}H ?????? ?????????
                            </div>
                            <div>
                                {props.product.discountRate} % ??????
                            </div>
                        </div>
                    }
                    <div
                        className='price-box_24h'
                    >
                        <div>
                            24H ?????? ??????
                        </div>
                        <div>
                            {numberFormatHandler().numberWithCommas((props.product.price * 24) || 0)} ???
                        </div>
                    </div>
                </ContentWrapper>
                <ContentWrapper>
                    <div className='add-cart-button-box'>
                        <SingleBlockButton
                            type='button'
                            className='add-button'
                            onClick={__handle.action.openAddCartModal}
                        >
                            ??????????????? ??????
                        </SingleBlockButton>
                    </div>
                </ContentWrapper>
            </Container>

            <CommonModalComponent
                open={addCartModalOpen}
                onClose={__handle.action.closeAddCartModal}
            >
                <AddCartModal
                    product={props.product}
                    onActionCloseModal={__handle.action.closeAddCartModal}
                />
            </CommonModalComponent>
        </>
    );
}

function AddCartModal({
    product,
    onActionCloseModal
}) {
    const [cartList, setCartList] = useCartListLocalStorage();
    const [unit, setUnit] = useState(1);

    const __handle = {
        change: {
            unit: (e) => {
                let value = e.target.value;
                setUnit(value);
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();

                if (cartList.length >= 20) {
                    alert('??????????????? ?????? 20??? ?????? ?????? ??? ????????????.');
                    return;
                }

                let dataList = [
                    ...cartList
                ];
                dataList.push(
                    {
                        id: uuidv4(),
                        productId: product.id,
                        roomId: product.roomId,
                        roomName: product.room.name,
                        unit: unit
                    }
                )
                setCartList(dataList);
                // alert('??????????????? ????????? ???????????????.');
                onActionCloseModal();
            }
        }
    }
    return (
        <>
            <AddCartModalWrapper>
                <div className='product-title'>{product?.name}</div>
                <div className='count-select-box'>
                    <div className='label'>?????? ?????? ??????</div>
                    <CustomSelect
                        className='item'
                        value={unit || '1'}
                        onChange={__handle.change.unit}
                        required
                    >
                        <option value='1'>1???</option>
                        <option value='2'>2???</option>
                        <option value='3'>3???</option>
                        <option value='4'>4???</option>
                        <option value='5'>5???</option>
                        <option value='6'>6???</option>
                        <option value='7'>7???</option>
                        <option value='8'>8???</option>
                        <option value='9'>9???</option>
                        <option value='10'>10???</option>
                    </CustomSelect>
                </div>
                <div className='button-box'>
                    <SingleBlockButton
                        type='button'
                        className='button-el'
                        onClick={onActionCloseModal}
                    >
                        ??????
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='button-el'
                        onClick={__handle.submit.confirm}
                        style={{
                            color: '#b39283',
                            fontWeight: '600'
                        }}
                    >
                        ???????????? ??????
                    </SingleBlockButton>
                </div>
            </AddCartModalWrapper>
        </>
    );
}