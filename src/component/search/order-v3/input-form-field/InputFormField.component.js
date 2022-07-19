import { GlobalCommonBodyContainer } from "../../../../globalStyledComponent";
import styled from 'styled-components';
import SingleBlockButton from "../../../module/button/SingleBlockButton";
import { useEffect, useReducer, useState } from "react";
import { dateFormatUtils } from "../../../../utils/dateFormatUtils";
import LineBreakerBottom from "../../../module/fragment/LineBreakerBottom";
import { numberFormatHandler } from "../../../../utils/numberFormatHandler";

const Layout = styled.div`
    margin-bottom: 150px;
    display: flex;
    flex-direction: row;

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

const FormWrapper = styled.form`
    position:relative;
    flex:1;
    border:1px solid #e0e0e0;
    border-radius: 10px;
    padding:20px;

    &>.form-box:nth-child(1){
        margin-top: 0;
    }

    .form-box{
        width:100%;
        margin-top: 30px;
    }
    
    .form-box>.input-el{
        width:100%;
        padding:10px;
        box-sizing: border-box;
        border:none;
        letter-spacing: 0.1em;
        border-bottom: 1px solid #e0e0e0;
        outline: none;
        font-size: 16px;

        &:focus{
            border-bottom: 1px solid #b39283;
        }

        @media all and (max-width:992px){
            font-size: 14px;
        }
    }

    .form-box>.label{
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.1em;
        margin-bottom: 5px;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .search-button-el{
        margin:0;
        padding:0;
        width:200px;
        height: 43px;
        letter-spacing: 0.1em;
        background:#000;
        font-size: 16px;
        color:white;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 14px;
            width:100%;
        }
    }
`;

const ContentWrapper = styled.div`
    position:relative;
    flex:1;
    border:1px solid #e0e0e0;
    border-radius: 10px;
    padding:20px;
    min-height: 100px;

    .info-wrapper{
        &>.info-group:nth-child(1){
            margin-top: 0;
        }
    }

    .info-group{
        display: flex;
        margin-top: 20px;
    }

    .info-box{
        flex:1
    }

    .info-box>.label{
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.1em;
        margin-bottom: 5px;
        color:#404040;

        @media all and (max-width:992px){
            font-size: 11px;
        }
    }

    .info-box>.info-el{
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.1em;
        margin-bottom: 5px;
        color:#404040;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .total-price-box{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.1em;
        color:#b39283;

        @media all and (max-width:992px){
            font-size: 15px;
        }
    }

    .product-box{
        display: flex;
        padding: 10px 0;
    }

    .thumbnail-box{
        overflow: hidden;
        width: 100px;

        @media all and (max-width:992px){
            width: 80px;
        }
    }

    .thumbnail-figure{
        position:relative;
        padding-bottom: 100%;
    }

    .thumbnail-el{
        position: absolute;
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .product-info-box{
        flex:1;
        margin-left: 10px;
    }

    .product-info-box>.title{
        font-size: 16px;
        font-weight: 600;
        color:#404040;
        letter-spacing: 0.1em;

        @media all and (max-width:992px){
            font-size: 13px;
        }
    }

    .product-info-box>.count{
        font-size: 14px;
        font-weight: 500;
        color:#404040;
        letter-spacing: 0.1em;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .product-info-box>.discount{
        font-size: 14px;
        font-weight: 500;
        color:#e56767;
        letter-spacing: 0.1em;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .product-info-box>.totalPrice{
        font-size: 14px;
        font-weight: 500;
        color:#404040;
        letter-spacing: 0.1em;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }
`;

const __ext_getProductOrderPrice = ({ price, unit, diffHours, discountYn, discountRate, discountMinimumHour }) => {
    if (discountYn === 'y' && (diffHours >= discountMinimumHour)) {
        return (price * unit * diffHours * (1 - (discountRate / 100)));
    } else {
        return price * unit * diffHours;
    }
}

const __ext_getProductsTotalPrice = ({ products, diffHours }) => {
    let totalPrice = 0;
    products.forEach(r => {
        totalPrice += __ext_getProductOrderPrice({ price: r.price, unit: r.unit, discountYn: r.discountYn, discountRate: r.discountRate, diffHours: diffHours, discountMinimumHour: r.discountMinimumHour });
    });
    return totalPrice;
}

export default function InputFormFieldComponent(props) {
    const [formValue, dispatchFormValue] = useReducer(formValueReducer, initialFormValue);
    const [diffHours, setDiffHours] = useState(0);
    const [productsTotalPrice, setProductsTotalPrice] = useState(0);

    useEffect(() => {
        if (props.rentalOrderInfo) {
            let pDate = dateFormatUtils().dateFromDateAndHH_mm(props.rentalOrderInfo.pickupDate, props.rentalOrderInfo.pickupTime);
            let rDate = dateFormatUtils().dateFromDateAndHH_mm(props.rentalOrderInfo.returnDate, props.rentalOrderInfo.returnTime);
            let diffHours = dateFormatUtils().getDiffHoursFromDates(pDate, rDate);

            setDiffHours(diffHours);
            setProductsTotalPrice(
                __ext_getProductsTotalPrice({
                    products: props.rentalOrderInfo.rentalOrderProducts,
                    diffHours: diffHours
                })
            )
        }
    }, [props.rentalOrderInfo]);
    const __formValue = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchFormValue({
                    type: 'SET_DATA',
                    payload: {
                        ...formValue,
                        [name]: value
                    }
                })
            }
        },
        submit: {
            confirmSearch: (e) => {
                e.preventDefault();
                props.onSubmitSearch({
                    params: formValue
                })
            }
        }
    }

    return (
        <>
            <GlobalCommonBodyContainer>
                <Layout>
                    <FormWrapper onSubmit={__formValue.submit.confirmSearch}>
                        <div className='form-box'>
                            <div className='label'>
                                주문번호
                            </div>
                            <input
                                className='input-el'
                                type='text'
                                name={'orderNumber'}
                                value={formValue.orderNumber || ''}
                                onChange={__formValue.change.valueOfName}
                                placeholder="주문번호"
                            ></input>
                        </div>
                        <div className='form-box'>
                            <div className='label'>
                                주문자 이름
                            </div>
                            <input
                                className='input-el'
                                type='text'
                                name={'orderer'}
                                value={formValue.orderer || ''}
                                onChange={__formValue.change.valueOfName}
                                placeholder="주문자 이름"
                            ></input>
                        </div>
                        <div className='form-box'>
                            <div className='label'>
                                주문자 연락처
                            </div>
                            <input
                                className='input-el'
                                type='text'
                                name={'ordererPhoneNumber'}
                                value={formValue.ordererPhoneNumber || ''}
                                onChange={__formValue.change.valueOfName}
                                placeholder="ex) 01012341234"
                            ></input>
                        </div>
                        <div
                            className='form-box'
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <SingleBlockButton
                                className='search-button-el'
                                type='submit'
                            >
                                조회하기
                            </SingleBlockButton>
                        </div>
                    </FormWrapper>
                    <div style={{ padding: 20 }}></div>
                    <ContentWrapper>
                        {props.rentalOrderInfo &&
                            <div className='info-wrapper'>
                                <div
                                    className='info-group'
                                >
                                    <div className='info-box'>
                                        <div className='label'>주문일시</div>
                                        <div className='info-el'>{dateFormatUtils().dateToYYMMDDHHmmss(props.rentalOrderInfo.createdAt)}</div>
                                    </div>
                                    <div className='info-box'>
                                        <div className='label'>주문번호</div>
                                        <div className='info-el'>{props.rentalOrderInfo.orderNumber}</div>
                                    </div>
                                </div>
                                <div
                                    className='info-group'
                                >
                                    <div className='info-box'>
                                        <div className='label'>주문자 이름</div>
                                        <div className='info-el'>{props.rentalOrderInfo.orderer}</div>
                                    </div>
                                    <div className='info-box'>
                                        <div className='label'>주문자 연락처</div>
                                        <div className='info-el'>{props.rentalOrderInfo.ordererPhoneNumber}</div>
                                    </div>
                                </div>
                                <div
                                    className='info-group'
                                >
                                    <div className='info-box'>
                                        <div className='label'>픽업 날짜 및 시간</div>
                                        <div className='info-el'>{dateFormatUtils().dateToYYMMDD(props.rentalOrderInfo.pickupDate)} {props.rentalOrderInfo.pickupTime}</div>
                                    </div>
                                    <div className='info-box'>
                                        <div className='label'>반납 날짜 및 시간</div>
                                        <div className='info-el'>{dateFormatUtils().dateToYYMMDD(props.rentalOrderInfo.returnDate)} {props.rentalOrderInfo.returnTime}</div>
                                    </div>
                                </div>
                                <div
                                    className='info-group'
                                >
                                    <div className='info-box'>
                                        <div className='label'>픽업 | 반납 장소</div>
                                        <div className='info-el'>{props.rentalOrderInfo.pickupPlace}</div>
                                    </div>
                                </div>
                                <LineBreakerBottom
                                    gapTop={20}
                                />
                                <div
                                    className='info-group'
                                >
                                    <div className='info-box'>
                                        <div className='label'>대여처</div>
                                        <div className='info-el'>{props.rentalOrderInfo.room.name}</div>
                                    </div>
                                    <div className='info-box'>
                                        <div className='label'>대여처 연락처</div>
                                        <div className='info-el'>01050036206</div>
                                    </div>
                                </div>
                                <LineBreakerBottom
                                    gapTop={20}
                                />
                                <div className='total-price-box'>
                                    주문 총 가격 : {numberFormatHandler().numberWithCommas(productsTotalPrice || 0)} 원
                                </div>
                                {props.rentalOrderInfo.rentalOrderProducts.map(r => {
                                    let productPrice = __ext_getProductOrderPrice({ price: r.price, unit: r.unit, discountYn: r.discountYn, discountRate: r.discountRate, diffHours: diffHours, discountMinimumHour: r.discountMinimumHour });

                                    return (
                                        <div
                                            key={r.id}
                                            className='product-box'
                                        >
                                            <div className='thumbnail-box'>
                                                <div className='thumbnail-figure'>
                                                    <img
                                                        className="thumbnail-el"
                                                        src={r.thumbnailUri}
                                                        alt='thumbnail'
                                                    ></img>
                                                </div>
                                            </div>
                                            <div className='product-info-box'>
                                                <div className='title'>
                                                    {r.productName}
                                                </div>
                                                <div className='count'>
                                                    {numberFormatHandler().numberWithCommas(r.price || 0)} 원 / {r.unit}개 / {diffHours}H
                                                </div>
                                                {r.discountYn === 'y' && (diffHours >= r.discountMinimumHour) &&
                                                    <div className='discount'>{r.discountRate}% 할인 적용!!</div>
                                                }
                                                <div className='totalPrice'>
                                                    상품 최종 가격: {numberFormatHandler().numberWithCommas(productPrice || 0)} 원
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        }
                        {!props.rentalOrderInfo &&
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '0',
                                    transform: 'translate(0, -50%)',
                                    fontWeight: '500',
                                    letterSpacing: '0.1em',
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            >
                                조회 내역을 찾을 수 없습니다.
                            </div>
                        }
                    </ContentWrapper>
                </Layout>
            </GlobalCommonBodyContainer>
        </>
    );
}

const initialFormValue = {
    orderNumber: '',
    orderer: '',
    ordererPhoneNumber: ''
}

const formValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialFormValue;
        default: return initialFormValue;
    }
}