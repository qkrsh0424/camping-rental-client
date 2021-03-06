import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { numberFormatHandler } from '../../utils/numberFormatHandler';
import { useEffect, useReducer, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { dateFormatUtils } from '../../utils/dateFormatUtils';

const Container = styled.div`

`;

const ItemBox = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;

    .remove-button-box{
        margin-right: 10px;
        button{
            position: relative;
            width: 30px;
            height: 30px;
            background: white;
            border: 1px solid #00000000;
            border-radius: 50%;

            cursor: pointer;

            &:hover{
                background: #f1f1f160;
            }
        }

        img{
            position: absolute;
            width: 20px;
            height: 20px;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
        }
    }

    .item-content-box{
        margin-left: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #555;
    }

    .image-box{
        width: 20%;
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
        border:1px solid #f1f1f1;
        border-radius: 3px;
    }

    @media all and (max-width: 992px){
        .image-box{
            width: 25%;
        }
        .item-content-box{
            margin-left: 10px;
            font-size: 10px;
            font-weight: 600;
            color: #555;
        }
    }
`;

const TitleBox = styled.div`
    padding: 10px;
    font-weight: 600;
`;

const InputBox = styled.div`
    padding: 10px;

    .input-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .input-item{
        width: 100%;
    }
`;

const SelectBox = styled.div`
    padding: 10px;

    .select-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .select-item{
        width: 100%;
    }
`;

const DateSelectorBox = styled.div`
    padding: 10px;

    .date-picker{
        width: 100%;
    }
`;

const ButtonBox = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    .cancel-btn{
        border: 1px solid #00000000;
        background: white;
        padding: 10px 5px;
        font-weight: 500;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const LineBreaker = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px dotted #e1e1e1;
`;

const OrderConfirmContentBox = styled.div`
    padding:10px;

    .item-box{
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    .item-name{
        font-size: 14px;
        font-weight: 600;
        color:#555;
    }

    .item-discounted{
        font-size: 13px;
        color: red;
    }

    .item-price{
        font-size: 14px;
        font-weight: 600;
        color: black;
    }

    .info-item{
        font-size: 14px;
        font-weight: 600;
        color:#555;
        margin-bottom: 3px;
    }

    .info-price{
        font-size: 16px;
        font-weight: 600;
        color:#f36565;
        margin-bottom: 3px;
    }

    .info-notice{
        margin-top: 10px;
        font-size: 13px;
        font-weight: 700;
        color:#f36565;
        word-break: keep-all;
    }
`;

const calculateTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList?.forEach(r => {
        let price = r.beforeDiscountPrice;
        if (r.adoptedDiscountYn === 'y') {
            price = r.afterDiscountPrice;
        }
        totalPrice += price;
    });
    return totalPrice;
}

const initialOrderInfoState = {
    status:'newOrder',
    orderer: '',
    ordererPhoneNumber: '',
    pickupDate: dateFormatUtils().getStartDate(new Date()),
    returnDate: dateFormatUtils().getEndDate(new Date()),
    pickupRegion: '',
    returnRegion: '',
    pickupTime: '12:00',
    returnTime: '12:00',
    serviceAgreementYn: 'n'
};

const initialOrderItemListState = null;

const orderInfoStateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return { ...state };
    }
}

const orderItemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return [...state];
    }
}

const CartModalComponent = (props) => {
    const [orderInfoState, dispatchOrderInfoState] = useReducer(orderInfoStateReducer, initialOrderInfoState);
    const [orderItemListState, dispatchOrderItemListState] = useReducer(orderItemListStateReducer, initialOrderItemListState);

    const [orderChecked, setOrderChecked] = useState(false);

    const _onChangeOrderInfoState = (e) => {
        dispatchOrderInfoState({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const _onChangePickupDate = (value) => {
        dispatchOrderInfoState({
            type: 'CHANGE_DATA',
            payload: {
                name: 'pickupDate',
                value: dateFormatUtils().getStartDate(value || new Date())
            }
        })
    }

    const _onChangeReturnDate = (value) => {
        dispatchOrderInfoState({
            type: 'CHANGE_DATA',
            payload: {
                name: 'returnDate',
                value: dateFormatUtils().getEndDate(value || new Date())
            }
        })
    }

    const _onChangeServiceAgreement = (e) => {
        dispatchOrderInfoState({
            type: 'CHANGE_DATA',
            payload: {
                name: 'serviceAgreementYn',
                value: e.target.checked ? 'y' : 'n'
            }
        })
    }

    const _onMoveToConfirmOrder = () => {
        if (!orderInfoState.orderer) {
            alert('????????? ????????? ?????????.');
            return;
        }

        if (!orderInfoState.ordererPhoneNumber) {
            alert('???????????? ????????? ?????????.');
            return;
        }

        if (!orderInfoState.pickupRegion) {
            alert('?????? ????????? ????????? ?????????.');
            return;
        }

        if (!orderInfoState.returnRegion) {
            alert('?????? ????????? ????????? ?????????.');
            return;
        }

        if (orderInfoState.pickupDate > orderInfoState.returnDate) {
            alert('?????? ????????? ?????? ?????? ???????????? ?????? ???????????????.');
            return;
        }

        if (!orderInfoState.pickupTime) {
            alert('?????? ????????? ????????? ?????????.');
            return;
        }

        if (!orderInfoState.returnTime) {
            alert('?????? ????????? ????????? ?????????.');
            return;
        }

        let nights = dateFormatUtils().getDiffDate(orderInfoState.pickupDate, orderInfoState.returnDate);
        let data = props.cartList?.map(r => {
            let beforeDiscountPrice = r.price * r.unit * nights;
            let afterDiscountPrice = r.price * r.unit * nights * (1 - (r.discountRate / 100));
            let adoptedDiscountYn = nights > 1 ? 'y' : 'n';

            let params = {
                ...r,
                nights: nights,
                beforeDiscountPrice: beforeDiscountPrice,
                afterDiscountPrice: afterDiscountPrice,
                adoptedDiscountYn: adoptedDiscountYn
            }
            return params;
        });

        dispatchOrderItemListState({
            type: 'INIT_DATA',
            payload: data
        });

        setOrderChecked(true);
    }

    const _onMoveToWriteOrder = () => {
        setOrderChecked(false);
    }

    const _onSubmit = () => {
        if (!orderInfoState.serviceAgreementYn || orderInfoState.serviceAgreementYn !== 'y') {
            alert('?????????????????? ??? ????????? ????????? ?????????.');
            return;
        }

        let params = {
            orderInfoDto: orderInfoState,
            orderItemDtos: orderItemListState
        }
        props._onOrderSubmit(params);
    }

    return (
        <>
            {((props.cartList && props.cartList?.length > 0) && !orderChecked) &&
                <Container>
                    <TitleBox>????????????</TitleBox>
                    <ButtonBox>
                        <div></div>
                        <button className='cancel-btn' style={{ color: '#f36565' }} onClick={() => props._onDeleteCartItemAll()}>?????? ?????????</button>
                    </ButtonBox>
                    {props.cartList?.map(r => {
                        return (
                            <ItemBox key={r.id}>
                                <div className='remove-button-box'>
                                    <button type='button' onClick={() => props._onDeleteCartItemOne(r.id)}>
                                        <img src='/assets/icon/trash_icon.png' ></img>
                                    </button>
                                </div>
                                <div className='image-box'>
                                    <div className='image-figure'>
                                        <img src={r.thumbnailFullUri} className='image-el'></img>
                                    </div>
                                </div>
                                <div className='item-content-box'>
                                    <div>{r.itemName}</div>
                                    <div>1??? ?????? : {numberFormatHandler().numberWithCommas(r.price || 0)} ???</div>
                                    <div>????????? : {r.discountRate} %</div>
                                    <div>?????? ?????? : {r.unit} ???</div>
                                </div>
                            </ItemBox>
                        );
                    })}
                    <LineBreaker></LineBreaker>
                    <TitleBox>?????????</TitleBox>
                    <InputBox>
                        <TextField
                            type='text'
                            className='input-item'
                            label='??????'
                            placeholder='ex) ?????????'
                            name='orderer'
                            value={orderInfoState?.orderer || ''}
                            onChange={(e) => _onChangeOrderInfoState(e)}
                        ></TextField>
                    </InputBox>
                    <InputBox>
                        <TextField
                            type='text'
                            className='input-item'
                            label='?????????'
                            placeholder='ex) 01012341234'
                            name='ordererPhoneNumber'
                            value={orderInfoState?.ordererPhoneNumber || ''}
                            onChange={(e) => _onChangeOrderInfoState(e)}
                        ></TextField>
                    </InputBox>
                    <SelectBox>
                        <FormControl fullWidth>
                            <InputLabel>??????????????????</InputLabel>
                            <Select
                                label="??????????????????"
                                value={orderInfoState?.pickupRegion || ''}
                                name='pickupRegion'
                                onChange={(e) => _onChangeOrderInfoState(e)}
                            >
                                {props.handlingAreaListState?.map(r => {
                                    return (<MenuItem value={r.name} key={r.id}>{r.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </SelectBox>
                    <SelectBox>
                        <FormControl fullWidth>
                            <InputLabel>??????????????????</InputLabel>
                            <Select
                                label="??????????????????"
                                value={orderInfoState?.returnRegion || ''}
                                name='returnRegion'
                                onChange={(e) => _onChangeOrderInfoState(e)}
                            >
                                {props.handlingAreaListState?.map(r => {
                                    return (<MenuItem value={r.name} key={r.id}>{r.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </SelectBox>
                    <DateSelectorBox>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                        >
                            <DatePicker
                                label="?????? ?????? ??????"

                                value={orderInfoState?.pickupDate || new Date()}
                                onChange={(value) => _onChangePickupDate(value)}
                                renderInput={(params) => <TextField {...params} className='date-picker' />}
                            />
                        </LocalizationProvider>
                    </DateSelectorBox>
                    <SelectBox>
                        <FormControl fullWidth>
                            <InputLabel>?????? ?????? ??????</InputLabel>
                            <Select
                                label="?????? ?????? ??????"
                                value={orderInfoState?.pickupTime || ''}
                                name='pickupTime'
                                onChange={(e) => _onChangeOrderInfoState(e)}
                            >
                                <MenuItem value='10:00'>10:00</MenuItem>
                                <MenuItem value='11:00'>11:00</MenuItem>
                                <MenuItem value='12:00'>12:00</MenuItem>
                                <MenuItem value='13:00'>13:00</MenuItem>
                                <MenuItem value='14:00'>14:00</MenuItem>
                                <MenuItem value='15:00'>15:00</MenuItem>
                                <MenuItem value='16:00'>16:00</MenuItem>
                                <MenuItem value='17:00'>17:00</MenuItem>
                                <MenuItem value='18:00'>18:00</MenuItem>
                            </Select>
                        </FormControl>
                    </SelectBox>
                    <DateSelectorBox>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                        >
                            <DatePicker
                                label="?????? ?????? ??????"
                                value={orderInfoState?.returnDate || new Date()}
                                onChange={(value) => _onChangeReturnDate(value)}
                                renderInput={(params) => <TextField {...params} className='date-picker' />}
                            />
                        </LocalizationProvider>
                    </DateSelectorBox>
                    <SelectBox>
                        <FormControl fullWidth>
                            <InputLabel>?????? ?????? ??????</InputLabel>
                            <Select
                                label="?????? ?????? ??????"
                                value={orderInfoState?.returnTime || ''}
                                name='returnTime'
                                onChange={(e) => _onChangeOrderInfoState(e)}
                            >
                                <MenuItem value='10:00'>10:00</MenuItem>
                                <MenuItem value='11:00'>11:00</MenuItem>
                                <MenuItem value='12:00'>12:00</MenuItem>
                                <MenuItem value='13:00'>13:00</MenuItem>
                                <MenuItem value='14:00'>14:00</MenuItem>
                                <MenuItem value='15:00'>15:00</MenuItem>
                                <MenuItem value='16:00'>16:00</MenuItem>
                                <MenuItem value='17:00'>17:00</MenuItem>
                                <MenuItem value='18:00'>18:00</MenuItem>
                            </Select>
                        </FormControl>
                    </SelectBox>
                    <LineBreaker></LineBreaker>
                    <ButtonBox>
                        <button type='button' className='cancel-btn' style={{ color: '#f36565' }} onClick={() => props.onClose()}>??????</button>
                        <button type='button' className='cancel-btn' onClick={() => _onMoveToConfirmOrder()} style={{ color: '#379f37' }}>?????? ?????? ??????</button>
                    </ButtonBox>
                </Container>
            }

            {((props.cartList && props.cartList?.length > 0) && orderChecked) &&
                <Container>
                    <TitleBox>?????? ?????? ??????</TitleBox>
                    <OrderConfirmContentBox>
                        {orderItemListState?.map(r => {
                            return (
                                <div className='item-box' key={r.id}>
                                    <div className='item-name'>{r.itemName} x {r.unit} ??? x {r.nights} ???</div>
                                    {r.adoptedDiscountYn === 'y' &&
                                        <>
                                            <div className='item-discounted'>{r.discountRate}% ?????? ?????? ??????!!</div>
                                            <div className='item-price'>{numberFormatHandler().numberWithCommas(r.afterDiscountPrice || 0)} ???</div>
                                        </>
                                    }
                                    {r.adoptedDiscountYn === 'n' &&
                                        <>
                                            <div className='item-price'>{numberFormatHandler().numberWithCommas(r.beforeDiscountPrice || 0)} ???</div>
                                        </>
                                    }
                                </div>
                            );
                        })}
                    </OrderConfirmContentBox>
                    <LineBreaker></LineBreaker>
                    <OrderConfirmContentBox>
                        <div className='info-item'>?????? : {orderInfoState.orderer}</div>
                        <div className='info-item'>????????? : {orderInfoState.ordererPhoneNumber}</div>
                        <div className='info-item'>?????? ?????? : {orderInfoState.pickupRegion}</div>
                        <div className='info-item'>?????? ?????? : {orderInfoState.returnRegion}</div>
                        <div className='info-item'>?????? ??????,?????? : {dateFormatUtils().dateToYYMMDD(orderInfoState.pickupDate)} {orderInfoState.pickupTime}</div>
                        <div className='info-item'>?????? ??????,?????? : {dateFormatUtils().dateToYYMMDD(orderInfoState.returnDate)} {orderInfoState.returnTime}</div>
                        <div className='info-price'>
                            ?????? ?????? : {numberFormatHandler().numberWithCommas(calculateTotalPrice(orderItemListState || 0) || 0)} ???
                        </div>
                        <div className='info-notice'>
                            * ?????? ????????? ???????????? ?????? ??? ??? ?????????, ?????? ????????? ?????? ?????? ??? ?????? ??????????????????.
                        </div>
                        <div className='info-notice'>
                            * ?????? ?????? ??? ?????? ?????? ????????? 010-5003-6206 ?????? ???????????????.
                        </div>
                    </OrderConfirmContentBox>
                    <OrderConfirmContentBox>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={orderInfoState?.serviceAgreementYn === 'y'}
                                    onChange={(e) => _onChangeServiceAgreement(e)}
                                    name="serviceAgreementYn"
                                    color="primary"
                                />
                            }
                            label={<b style={{ fontSize: '12px' }}><u>?????????????????? ??? ??????</u>??? ??????</b>}
                        />
                        <table style={{ width: '100%', fontSize: '10px', textAlign: 'center', border: '1px solid #888' }}>
                            <colgroup>
                                <col width="33%" />
                                <col width="33%" />
                                <col width="33%" />
                            </colgroup>
                            <thead style={{ border: '1px solid #888' }}>
                                <tr>
                                    <th style={{ border: '1px solid #888', padding: '8px', fontWeight: '700' }}>??????</th>
                                    <th style={{ border: '1px solid #888', fontWeight: '700' }}>??????</th>
                                    <th style={{ border: '1px solid #888', fontWeight: '700' }}>?????? ??? ????????????</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid #888', padding: '8px', wordBreak: 'keep-all' }}>?????? ?????? ??? ????????? ??????</td>
                                    <td style={{ border: '1px solid #888', wordBreak: 'keep-all' }}>??????, ????????????</td>
                                    <td style={{ border: '1px solid #888', wordBreak: 'keep-all' }}>3??????</td>
                                </tr>
                            </tbody>
                        </table>
                    </OrderConfirmContentBox>
                    <ButtonBox>
                        <button type='button' className='cancel-btn' style={{ color: '#f36565' }} onClick={() => _onMoveToWriteOrder()}>?????? ??????</button>
                        <button type='button' className='cancel-btn' onClick={() => _onSubmit()} style={{ color: '#379f37' }}>?????? ??????</button>
                    </ButtonBox>
                </Container>
            }

            {(!props.cartList || props.cartList?.length <= 0) &&
                <Container>
                    <div style={{ padding: '50px 0', textAlign: 'center' }}>
                        ??????????????? ???????????????!
                    </div>
                </Container>
            }
        </>
    );
}
export default CartModalComponent;