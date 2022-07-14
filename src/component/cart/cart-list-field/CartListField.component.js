import { GlobalCommonBodyContainer } from "../../../globalStyledComponent";
import styled from 'styled-components';
import SingleBlockButton from "../../module/button/SingleBlockButton";
import CommonModalComponent from "../../module/modal/CommonModalComponent";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { dateFormatUtils } from '../../../utils/dateFormatUtils';
import { numberFormatHandler } from "../../../utils/numberFormatHandler";
import LineBreakerBottom from "../../module/fragment/LineBreakerBottom";
import { checkPhoneNumberFormat } from "../../../utils/regexUtils";
import moment from "moment";

const Wrapper = styled.div`
    border:1px solid #e0e0e0;
    border-radius: 5px;
`;

const HeadFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 20px;
    border-bottom: 1px solid #f0f0f0;

    @media all and (max-width: 992px){
        padding:10px 10px;
    }

    .room-info-box{
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.05em;

        @media all and (max-width: 992px){
            font-size: 16px;
        }
    }

    .order-button-el{
        margin:0;
        padding:0;
        width:200px;
        height: 34px;
        background:#b39283;
        border:none;
        color:white;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.05em;

        @media all and (max-width: 992px){
            font-size: 14px;
            width:80px;
            height: 34px;
        }
    }
`;

const CartProductCard = styled.div`
    padding:10px 0;
    border-bottom: 1px solid #f0f0f0;

    &:nth-last-child(1){
        border-bottom: none;
    }
    
    .card-wrapper {
        display: flex;
    }

    .delete-button-box{
        display: flex;
        align-items: center;
        padding: 0 20px;

        @media all and (max-width: 992px){
            padding: 0 10px;
        }
    }.delete-button-box>.button-el{
        /* position:relative; */
        padding:0;
        margin:0;
        border-radius: 50%;
        width:50px;
        height:50px;
        border: none;

        &:hover{
            background:#f0f0f060;
        }

        @media all and (max-width: 992px){
            width:35px;
            height:35px;
        }
    }.delete-button-box>.button-el>.icon{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:70%;
        height: 70%;
    }

    .image-box{
        width:120px;

        @media all and (max-width: 992px){
            width:90px;
        }
    }.image-box>.image-figure{
        position:relative;
        padding-bottom:100%;
    }.image-box>.image-figure>.image-el{
        position: absolute;
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .content-box{
        flex:1;
        padding: 0 20px;

        @media all and (max-width: 992px){
            padding: 0 10px;
        }
    }

    .content-box>.product-name{
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.06em;
        line-height: 1.3;
        color:#404040;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }
`;

const OrderFormModalWrapper = styled.div`
    
    .title{
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
    }

    .input-box{
        padding:10px;
    }

    .input-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .input-item{
        width:100%;

        &:focus{
            border-color:red;
        }
    }

    .select-box{
        padding:10px;
    }

    .select-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .select-item{
        width: 100%;
    }

    .dateSelector-box{
        padding: 10px;
    }

    .date-picker{
        width: 100%;
    }

    .diffHour-box{
        padding: 0 10px;
        font-weight: 600;
        font-size: 16px;

        @media all and (max-width: 992px){
            font-size: 14px;
        }
    }

    .button-box{
        margin-top: 20px;
        display: flex;
    }

    .button-el{
        margin:0;
        border:none;
    }
`;

const OrderFormConfirmationContentBox = styled.div`
    padding:10px;

    .item-box{
        padding: 10px;
        border-bottom: 1px solid #e1e1e1;
        margin-bottom: 5px;
        letter-spacing: 0.07em;
    }

    .item-box>.item-name{
        font-size: 14px;
        font-weight: 600;
        color:#555;
    }

    .item-box>.item-discounted{
        font-size: 13px;
        color: red;
    }

    .item-box>.item-price{
        font-size: 14px;
        font-weight: 600;
        color: black;
    }

    .info-item-box{
        padding:5px 0;
        display: flex;
        justify-content: space-between;
        letter-spacing: 0.1em;
        line-height: 1.3;
    }

    .info-item-box>.info-item-label{
        font-size: 14px;
        font-weight: 600;
        color:#555;
        margin-bottom: 3px;
        width: 120px;
    }

    .info-item-box>.info-item-content{
        flex:1;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        font-weight: 600;
        color:#555;
        margin-bottom: 3px;
    }

    .info-price-box{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        letter-spacing: 0.1em;
        line-height: 1.3;
    }

    .info-price-box>.info-price-label{
        font-size: 16px;
        font-weight: 600;
        color:#f36565;
        margin-bottom: 3px;
    }

    .info-price-box>.info-price-content{
        font-size: 16px;
        font-weight: 600;
        color:#f36565;
        margin-bottom: 3px;
        width:200px;
        display: flex;
        justify-content: flex-end;
    }

    .info-notice-box{
        margin: 0;
        padding: 0 10px;
    }

    .info-notice-box>.info-notice-content{
        margin-top: 10px;
        font-size: 13px;
        font-weight: 700;
        color:#f36565;
        word-break: keep-all;
        letter-spacing: 0.1em;
    }
`;

export default function CartListFieldComponent(props) {
    const [orderFormModalOpen, setOrderFormModalOpen] = useState(false);

    const __handle = {
        action: {
            openOrderFormModal: () => {
                setOrderFormModalOpen(true);
            },
            closeOrderFormModal: () => {
                setOrderFormModalOpen(false);
            }
        },
        submit: {
            deleteCartItem: (cartProduct) => {
                props.onSubmitDeleteCartItem(cartProduct);
            },
            orderReception: (rentalOrderInfo) => {
                props.onSubmitOrderReception({
                    body: rentalOrderInfo,
                    callback: __handle.action.closeOrderFormModal
                });
            }
        }
    }

    return (
        <>
            <GlobalCommonBodyContainer>
                <Wrapper>
                    <HeadFieldWrapper>
                        <div className='room-info-box'>
                            {props.aggregatedProduct.roomName} 님의 제품
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='order-button-el'
                            onClick={__handle.action.openOrderFormModal}
                        >
                            주문하기
                        </SingleBlockButton>
                    </HeadFieldWrapper>
                    <div>
                        {props.aggregatedProduct.cartProducts.map(r => {
                            return (
                                <CartProductCard key={r.cartId}>
                                    <div className='card-wrapper'>
                                        <div
                                            className='delete-button-box'
                                        >
                                            <SingleBlockButton
                                                type='button'
                                                className='button-el'
                                                onClick={() => __handle.submit.deleteCartItem(r)}
                                            >
                                                <img
                                                    className='icon'
                                                    src='/assets/icon/remove_default_red.svg'
                                                    alt='remove icon'
                                                ></img>
                                            </SingleBlockButton>
                                        </div>
                                        <div className='image-box'>
                                            <div className='image-figure'>
                                                <img
                                                    className='image-el'
                                                    src={r.thumbnailUri}
                                                    alt='thumbnail'
                                                ></img>
                                            </div>
                                        </div>
                                        <div className='content-box'>
                                            <div className='product-name'>
                                                <div>{r.productName}</div>
                                                <div>가격(1시간): {r.price} 원</div>
                                                {r.discountYn === 'y' &&
                                                    <div>{r.discountMinimumHour}H 이상 대여시 할인: {r.discountRate} %</div>
                                                }
                                                <div>최소 대여 가능 시간: {r.minimumRentalHour}H</div>
                                                <div>수량: {r.unit} 개</div>
                                            </div>
                                        </div>
                                    </div>
                                </CartProductCard>
                            );
                        })}
                    </div>
                </Wrapper>
            </GlobalCommonBodyContainer>

            {orderFormModalOpen &&
                <CommonModalComponent
                    open={orderFormModalOpen}
                    onClose={__handle.action.closeOrderFormModal}
                >
                    <OrderFormModal
                        aggregatedProduct={props.aggregatedProduct}
                        onActionCloseModal={__handle.action.closeOrderFormModal}
                        onSubmitOrderReception={__handle.submit.orderReception}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function OrderFormModal({
    aggregatedProduct,
    onActionCloseModal,
    onSubmitOrderReception
}) {
    const [orderBasicInfo, setOrderBasicInfo] = useState({
        orderer: '',
        ordererPhoneNumber: '',
        pickupDate: dateFormatUtils().getStartDate(new Date()),
        pickupTime: '',
        pickupPlace: '',
        returnDate: dateFormatUtils().getEndDate(new Date()),
        returnTime: '',
        returnPlace: '',
        serviceAgreementYn: 'n'
    });

    const [orderConfirmationFlag, setOrderConfirmationFlag] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [minRentalHour, setMinRentalHour] = useState(0);

    useEffect(() => {
        let minimumRentalHourList = aggregatedProduct.cartProducts.map(r => r.minimumRentalHour);
        let minRentalHour = Math.max.apply(null, minimumRentalHourList);

        setMinRentalHour(minRentalHour);
    }, [])

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000)

        return () => clearTimeout(timeout);
    }, [disabledBtn]);
    const __handle = {
        return: {
            totalPrice: ({ diffHours }) => {
                let totalPrice = 0;
                aggregatedProduct.cartProducts?.forEach(r => {
                    totalPrice += __handle.return.productOrderPrice({ price: r.price, unit: r.unit, discountYn: r.discountYn, discountRate: r.discountRate, diffHours: diffHours, discountMinimumHour: r.discountMinimumHour });
                });
                return totalPrice;
            },
            productOrderPrice: ({ price, unit, diffHours, discountYn, discountRate, discountMinimumHour }) => {
                if (discountYn === 'y' && (diffHours >= discountMinimumHour)) {
                    return (price * unit * diffHours * (1 - (discountRate / 100)));
                } else {
                    return price * unit * diffHours;
                }

            }
        }
    }

    const __orderBasicInfo = {
        action: {
            changeViewToOrderConfirmation: (e) => {
                e.preventDefault();
                if (!orderBasicInfo.orderer) {
                    alert('주문자 이름을 입력해 주세요.');
                    return;
                }

                if (!orderBasicInfo.ordererPhoneNumber) {
                    alert('주문자 연락처를 입력해 주세요.');
                    return;
                }

                if (!checkPhoneNumberFormat(orderBasicInfo.ordererPhoneNumber)) {
                    alert('주문자 연락처를 형식에 맞게 정확히 입력해 주세요.');
                    return;
                }

                if (!orderBasicInfo.pickupPlace) {
                    alert('픽업 장소를 선택해 주세요.');
                    return;
                }

                if (!orderBasicInfo.returnPlace) {
                    alert('반납 장소를 선택해 주세요.');
                    return;
                }

                if (!dateFormatUtils().isValidDate(orderBasicInfo.pickupDate) || !dateFormatUtils().isValidDate(orderBasicInfo.returnDate)) {
                    alert('픽업 날짜 및 반납 날짜를 정확히 지정해 주세요.');
                    return;
                }

                if (orderBasicInfo.pickupDate > orderBasicInfo.returnDate) {
                    alert('반납 날짜는 픽업 날짜 이후로만 선택 가능합니다.');
                    return;
                }

                if (!orderBasicInfo.pickupTime) {
                    alert('픽업 시간을 선택해 주세요.');
                    return;
                }

                if (!orderBasicInfo.returnTime) {
                    alert('반납 시간을 선택해 주세요.');
                    return;
                }

                let pDate = dateFormatUtils().dateFromDateAndHH_mm(orderBasicInfo.pickupDate, orderBasicInfo.pickupTime);
                let rDate = dateFormatUtils().dateFromDateAndHH_mm(orderBasicInfo.returnDate, orderBasicInfo.returnTime);
                let diffHours = dateFormatUtils().getDiffHoursFromDatesAllowNegative(pDate, rDate);
                if (diffHours < minRentalHour) {
                    alert('해당 제품들의 주문을 위한 최소 대여 가능 시간은 10시간 입니다.')
                    return;
                }

                setOrderConfirmationFlag(true);
            },
            changeViewToOrder: () => {
                setOrderBasicInfo({
                    ...orderBasicInfo,
                    serviceAgreementYn: 'n'
                })
                setOrderConfirmationFlag(false);
            }
        },
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                setOrderBasicInfo({
                    ...orderBasicInfo,
                    [name]: value
                })
            },
            pickupDate: (value) => {
                setOrderBasicInfo({
                    ...orderBasicInfo,
                    pickupDate: dateFormatUtils().getStartDate(value || new Date())
                })
            },
            returnDate: (value) => {
                let rDate = dateFormatUtils().getEndDate(value || new Date());

                setOrderBasicInfo({
                    ...orderBasicInfo,
                    returnDate: rDate
                })
            },
            pickupAndReturnPlace: (e) => {
                let value = e.target.value;

                setOrderBasicInfo({
                    ...orderBasicInfo,
                    pickupPlace: value,
                    returnPlace: value
                })
            },
            serviceAgreementYn: (e) => {
                let checked = e.target.checked;
                setOrderBasicInfo({
                    ...orderBasicInfo,
                    serviceAgreementYn: checked ? 'y' : 'n'
                })
            }
        },
        submit: {
            orderReception: () => {
                if (orderBasicInfo.serviceAgreementYn !== 'y') {
                    alert('개인정보수집 및 이용에 동의해 주세요.');
                    return;
                }

                setDisabledBtn(true);

                let rentalOrderProducts = aggregatedProduct.cartProducts.map(r => {
                    return {
                        productName: r.productName,
                        thumbnailUri: r.thumbnailUri,
                        price: r.price,
                        discountYn: r.discountYn,
                        discountMinimumHour: r.discountMinimumHour,
                        discountRate: r.discountRate,
                        unit: r.unit,
                        productId: r.productId
                    }
                })

                let rentalOrderInfo = {
                    orderer: orderBasicInfo.orderer,
                    ordererPhoneNumber: orderBasicInfo.ordererPhoneNumber,
                    pickupDate: orderBasicInfo.pickupDate,
                    pickupTime: orderBasicInfo.pickupTime,
                    pickupPlace: orderBasicInfo.pickupPlace,
                    returnDate: orderBasicInfo.returnDate,
                    returnTime: orderBasicInfo.returnTime,
                    returnPlace: orderBasicInfo.returnPlace,
                    serviceAgreementYn: orderBasicInfo.serviceAgreementYn,
                    rentalOrderProducts: [...rentalOrderProducts]
                }

                onSubmitOrderReception(rentalOrderInfo);
            }
        }
    }

    if (orderConfirmationFlag) {
        let pDate = dateFormatUtils().dateFromDateAndHH_mm(orderBasicInfo.pickupDate, orderBasicInfo.pickupTime);
        let rDate = dateFormatUtils().dateFromDateAndHH_mm(orderBasicInfo.returnDate, orderBasicInfo.returnTime);
        let diffHours = dateFormatUtils().getDiffHoursFromDates(pDate, rDate);


        return (
            <OrderFormModalWrapper>
                <div className='title'>
                    주문서 확인
                </div>

                <OrderFormConfirmationContentBox>
                    <div className='info-item-box'>
                        <div className='info-item-label'>성함</div>
                        <div className='info-item-content'>{orderBasicInfo.orderer}</div>
                    </div>
                    <div className='info-item-box'>
                        <div className='info-item-label'>연락처</div>
                        <div className='info-item-content'>{orderBasicInfo.ordererPhoneNumber}</div>
                    </div>
                    <div className='info-item-box'>
                        <div className='info-item-label'>픽업 장소</div>
                        <div className='info-item-content'>{orderBasicInfo.pickupPlace}</div>
                    </div>
                    <div className='info-item-box'>
                        <div className='info-item-label'>반납 장소</div>
                        <div className='info-item-content'>{orderBasicInfo.returnPlace}</div>
                    </div>
                    <div className='info-item-box'>
                        <div className='info-item-label'>픽업 날짜 및 시간</div>
                        <div className='info-item-content'>{dateFormatUtils().dateToYYMMDD(orderBasicInfo.pickupDate)} {orderBasicInfo.pickupTime}</div>
                    </div>
                    <div className='info-item-box'>
                        <div className='info-item-label'>반납 날짜 및 시간</div>
                        <div className='info-item-content'>{dateFormatUtils().dateToYYMMDD(orderBasicInfo.returnDate)} {orderBasicInfo.returnTime}</div>
                    </div>
                </OrderFormConfirmationContentBox>
                <LineBreakerBottom></LineBreakerBottom>
                <OrderFormConfirmationContentBox>
                    {aggregatedProduct?.cartProducts.map(r => {
                        let price = __handle.return.productOrderPrice({ price: r.price, unit: r.unit, discountYn: r.discountYn, discountRate: r.discountRate, diffHours: diffHours, discountMinimumHour: r.discountMinimumHour });
                        return (
                            <div className='item-box' key={r.cartId}>
                                <div className='item-name'>{r.productName} x {r.unit} 개 x ({diffHours}H)</div>
                                {r.discountYn === 'y' && (diffHours >= r.discountMinimumHour) &&
                                    <>
                                        <div className='item-discounted'>{r.discountRate}% 할인 적용!!</div>
                                    </>
                                }
                                <div className='item-price'>{numberFormatHandler().numberWithCommas(price || 0)} 원</div>
                            </div>
                        );
                    })}
                    <div className='info-price-box'>
                        <div className='info-price-label'>
                            합계 금액
                        </div>
                        <div className='info-price-content'>
                            {numberFormatHandler().numberWithCommas(__handle.return.totalPrice({ diffHours: diffHours }) || 0)} 원
                        </div>
                    </div>
                </OrderFormConfirmationContentBox>
                <LineBreakerBottom></LineBreakerBottom>
                <OrderFormConfirmationContentBox>
                    <ul
                        className='info-notice-box'
                    >
                        <li className='info-notice-content'>
                            물품 대여시 보증금이 발생 할 수 있으며, 정상 반납시 확인 절차 후 전액 돌려드립니다.
                        </li>
                        <li className='info-notice-content'>
                            우천시 예약이 취소될 수 있으며, 입력하신 연락처로 취소 관련 내용을 전달해 드립니다.
                        </li>
                        <li className='info-notice-content'>
                            예약 취소 및 기타 문의 사항은 010-5003-6206 으로 연락주세요.
                        </li>
                    </ul>
                </OrderFormConfirmationContentBox>
                <OrderFormConfirmationContentBox>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={orderBasicInfo?.serviceAgreementYn === 'y'}
                                onChange={(e) => __orderBasicInfo.change.serviceAgreementYn(e)}
                                name="serviceAgreementYn"
                                color="primary"
                            />
                        }
                        label={<b style={{ fontSize: '12px' }}><u>개인정보수집 및 이용</u>에 동의</b>}
                    />
                    <table style={{ width: '100%', fontSize: '10px', textAlign: 'center', border: '1px solid #888' }}>
                        <colgroup>
                            <col width="33%" />
                            <col width="33%" />
                            <col width="33%" />
                        </colgroup>
                        <thead style={{ border: '1px solid #888' }}>
                            <tr>
                                <th style={{ border: '1px solid #888', padding: '8px', fontWeight: '700' }}>목적</th>
                                <th style={{ border: '1px solid #888', fontWeight: '700' }}>항목</th>
                                <th style={{ border: '1px solid #888', fontWeight: '700' }}>보유 및 이용기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #888', padding: '8px', wordBreak: 'keep-all' }}>주문 접수 및 이용자 식별</td>
                                <td style={{ border: '1px solid #888', wordBreak: 'keep-all' }}>이름, 전화번호</td>
                                <td style={{ border: '1px solid #888', wordBreak: 'keep-all' }}>3개월</td>
                            </tr>
                        </tbody>
                    </table>
                </OrderFormConfirmationContentBox>
                <div className="button-box">
                    <SingleBlockButton
                        type='button'
                        className='button-el'
                        onClick={__orderBasicInfo.action.changeViewToOrder}
                    >
                        이전
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='button-el'
                        style={{
                            color: 'white',
                            background: '#b39283',
                            fontWeight: '600'
                        }}
                        onClick={__orderBasicInfo.submit.orderReception}
                        disabled={disabledBtn}
                    >
                        주문 접수
                    </SingleBlockButton>
                </div>
            </OrderFormModalWrapper>
        );
    }

    return (
        <>
            <OrderFormModalWrapper>
                <div className='title'>
                    주문서
                </div>
                <form onSubmit={__orderBasicInfo.action.changeViewToOrderConfirmation}>
                    <div className='input-box'>
                        <TextField
                            type='text'
                            className='input-item'
                            label='주문자 이름'
                            placeholder='ex) 홍길동'
                            name='orderer'
                            value={orderBasicInfo?.orderer || ''}
                            onChange={(e) => __orderBasicInfo.change.valueOfName(e)}
                            required
                        ></TextField>
                    </div>
                    <div className='input-box'>
                        <TextField
                            type='text'
                            className='input-item'
                            label='주문자 연락처'
                            placeholder='ex) 01012341234'
                            name='ordererPhoneNumber'
                            value={orderBasicInfo?.ordererPhoneNumber || ''}
                            onChange={(e) => __orderBasicInfo.change.valueOfName(e)}
                            required
                        ></TextField>
                    </div>
                    <div className='select-box'>
                        <FormControl fullWidth required>
                            <InputLabel>픽업 | 반납 장소 선택</InputLabel>
                            <Select
                                label="픽업 | 반납 장소 선택"
                                value={orderBasicInfo?.pickupPlace || ''}
                                name='pickupPlace'
                                onChange={(e) => __orderBasicInfo.change.pickupAndReturnPlace(e)}
                                required
                            >
                                {aggregatedProduct.regions?.map(r => {
                                    return (<MenuItem value={r.fullAddress} key={r.id}>{r.fullAddress}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <div
                            className='dateSelector-box'
                            style={{
                                flex: 1
                            }}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    label="픽업 날짜 선택"

                                    value={orderBasicInfo?.pickupDate || new Date()}
                                    onChange={(value) => __orderBasicInfo.change.pickupDate(value)}
                                    renderInput={(params) => <TextField {...params} className='date-picker' />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div
                            className='select-box'
                            style={{
                                flex: 1
                            }}
                        >
                            <FormControl fullWidth required>
                                <InputLabel>픽업 시간 선택</InputLabel>
                                <Select
                                    label="픽업 시간 선택"
                                    value={orderBasicInfo?.pickupTime || ''}
                                    name='pickupTime'
                                    onChange={(e) => __orderBasicInfo.change.valueOfName(e)}
                                >
                                    <MenuItem value='08:00'>08:00</MenuItem>
                                    <MenuItem value='09:00'>09:00</MenuItem>
                                    <MenuItem value='10:00'>10:00</MenuItem>
                                    <MenuItem value='11:00'>11:00</MenuItem>
                                    <MenuItem value='12:00'>12:00</MenuItem>
                                    <MenuItem value='13:00'>13:00</MenuItem>
                                    <MenuItem value='14:00'>14:00</MenuItem>
                                    <MenuItem value='15:00'>15:00</MenuItem>
                                    <MenuItem value='16:00'>16:00</MenuItem>
                                    <MenuItem value='17:00'>17:00</MenuItem>
                                    <MenuItem value='18:00'>18:00</MenuItem>
                                    <MenuItem value='19:00'>19:00</MenuItem>
                                    <MenuItem value='20:00'>20:00</MenuItem>
                                    <MenuItem value='21:00'>21:00</MenuItem>
                                    <MenuItem value='22:00'>22:00</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <div
                            className='dateSelector-box'
                            style={{
                                flex: 1
                            }}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    label="반납 날짜 선택"

                                    value={orderBasicInfo?.returnDate || new Date()}
                                    onChange={(value) => __orderBasicInfo.change.returnDate(value)}
                                    renderInput={(params) => <TextField {...params} className='date-picker' />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div
                            className='select-box'
                            style={{
                                flex: 1
                            }}
                        >
                            <FormControl fullWidth required>
                                <InputLabel>반납 시간 선택</InputLabel>
                                <Select
                                    label="반납 시간 선택"
                                    value={orderBasicInfo?.returnTime || ''}
                                    name='returnTime'
                                    onChange={(e) => __orderBasicInfo.change.valueOfName(e)}
                                >
                                    <MenuItem value='08:00'>08:00</MenuItem>
                                    <MenuItem value='09:00'>09:00</MenuItem>
                                    <MenuItem value='10:00'>10:00</MenuItem>
                                    <MenuItem value='11:00'>11:00</MenuItem>
                                    <MenuItem value='12:00'>12:00</MenuItem>
                                    <MenuItem value='13:00'>13:00</MenuItem>
                                    <MenuItem value='14:00'>14:00</MenuItem>
                                    <MenuItem value='15:00'>15:00</MenuItem>
                                    <MenuItem value='16:00'>16:00</MenuItem>
                                    <MenuItem value='17:00'>17:00</MenuItem>
                                    <MenuItem value='18:00'>18:00</MenuItem>
                                    <MenuItem value='19:00'>19:00</MenuItem>
                                    <MenuItem value='20:00'>20:00</MenuItem>
                                    <MenuItem value='21:00'>21:00</MenuItem>
                                    <MenuItem value='22:00'>22:00</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className='diffHour-box'>최소 대여 가능 시간 : <span style={{ color: '#e56767' }}>{minRentalHour}H</span></div>
                    <div className="button-box">
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            onClick={onActionCloseModal}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                color: '#b39283',
                                fontWeight: '600'
                            }}
                        >
                            주문 확인
                        </SingleBlockButton>

                    </div>
                </form>
            </OrderFormModalWrapper>
        </>
    );
}