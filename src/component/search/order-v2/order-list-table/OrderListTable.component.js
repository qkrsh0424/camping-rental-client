import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { dateFormatUtils } from '../../../../utils/dateFormatUtils';
import { numberFormatHandler } from '../../../../utils/numberFormatHandler';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import SortButton from '../../../module/button/SortButton';
import CustomCheckbox from '../../../module/checkbox/CustomCheckbox';
import LineBreakerBottom from '../../../module/fragment/LineBreakerBottom';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ResizableTh from '../../../module/table/ResizableTh';

const Container = styled.div`

`;

const TableWrapper = styled.div`
    padding:10px;
`;

const TableBox = styled.div`
    overflow: auto;
    border: 1px solid #e0e0e0;
    min-height: 400px;
    max-height: 500px;

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:5px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead{
        
    }

    table thead th {
        height: 35px;

        background:white;
        color: #333;
        font-weight: 600;
        position: sticky;
        top:0;
        border-bottom: 1px solid #e0e0e0;

        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        
    }

    table tbody{
        &:hover{
            background:#e0e0e040;
        }
    }

    table tbody tr{
        &:hover{
            background:#e0e0e060;
        }
    }

    table tbody td{
        height: 35px;
        border-bottom: 1px solid #e0e0e0;

        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
    }

    .status-button{
        height: 30px;
        width: 150px;
        padding:0;
        margin: auto;
        font-size: 12px;
    }

    @media only screen and (max-width:992px){
        min-height: 200px;
        max-height: 300px;
    }
`;

const TABLE_HEADERS = [
    {
        name: '등록일'
    },
    {
        name: '상태'
    },
    {
        name: '주문자'
    },
    {
        name: '연락처'
    },
    {
        name: '상품'
    },
    {
        name: '단가'
    },
    {
        name: '개수'
    },
    {
        name: '박치기'
    },
    {
        name: '할인'
    },
    {
        name: '총 가격'
    },
    {
        name: '픽업 날짜 및 시간'
    },
    {
        name: '반납 날짜 및 시간'
    },
    {
        name: '픽업 위치'
    },
    {
        name: '반납 위치'
    }
]

const ORDER_STATUS_LIST = [
    {
        fieldName: 'newOrder',
        name: '신규 주문',
        color: '#000000'
    },
    {
        fieldName: 'confirmOrder',
        name: '주문 확인',
        color: '#000000'
    },
    {
        fieldName: 'confirmReservation',
        name: '예약 확정',
        color: '#00B8BA'
    },
    {
        fieldName: 'pickedUp',
        name: '픽업 완료',
        color: '#dcbd85'
    },
    {
        fieldName: 'returned',
        name: '반납 완료',
        color: '#046683'
    },
    {
        fieldName: 'completed',
        name: '종료됨',
        color: '#888888'
    },
    {
        fieldName: 'cancelled',
        name: '취소됨',
        color: '#ff0000'
    }
]

const __ext_calcTotalPrice = ({
    adoptedDiscountYn,
    price,
    unit,
    nights,
    discountRate
}) => {
    if (adoptedDiscountYn === 'y') {
        /**
         * 할인율이 적용이 되었을때
         * 가격 * 수량 * 박 * 할인율(%)
         */
        return price * unit * nights * (1 - (discountRate / 100));
    } else {
        /**
         * 할인율이 적용되지 않았을때
         * 가격 * 수량 * 박
         */
        return price * unit * nights;
    }
}

function TableHead() {
    return (
        <thead>
            <tr>
                {TABLE_HEADERS?.map((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={150}
                            style={{
                                zIndex: '10'
                            }}
                        >
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                            >
                                <div>
                                    {r.name}
                                </div>
                                {/* <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translate(0, -50%)' }}>
                                    <SortButton
                                        buttonSize={25}
                                        iconSize={16}
                                        markPoint={r.matchedColumnName}
                                    ></SortButton>
                                </div> */}
                            </div>
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}

const OrderListTableComponent = (props) => {
    const [orderStatus, dispatchOrderStatus] = useReducer(orderStatusReducer, initialOrderStatus);
    const [orderStatusModalOpen, setOrderStatusModalOpen] = useState(false);

    const __orderStatus = {
        action: {
            openModal: (orderInfo) => {
                dispatchOrderStatus({
                    type: 'SET_DATA',
                    payload: {
                        orderInfoId: orderInfo.id,
                        status: orderInfo.status,
                        selectedStatus: null,
                        smsMessage: '',
                        smsFlag: false
                    }
                })
                setOrderStatusModalOpen(true);
            },
            closeModal: () => {
                dispatchOrderStatus({
                    type: 'CLEAR'
                });
                setOrderStatusModalOpen(false);
            }
        },
        change: {
            selectedStatus: (status) => {
                let name = 'selectedStatus';
                let value = status;

                dispatchOrderStatus({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            },
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchOrderStatus({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            },
            checkbox: (e) => {
                let name = e.target.name;
                let bool = e.target.checked;

                dispatchOrderStatus({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: bool
                    }
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();

                props.onSubmitChangeStatus({
                    body: orderStatus,
                    callback: __orderStatus.action.closeModal
                });
            }
        }
    }

    return (
        <>
            <Container>
                <TableWrapper>
                    <TableBox>
                        <table
                            cellSpacing={0}
                            cellPadding={5}
                        >
                            <TableHead />
                            {props.orderList?.map((r, index) => {
                                let nights = dateFormatUtils().getDiffDate(r.orderInfo.pickupDate, r.orderInfo.returnDate);
                                let orderItemsCount = r.orderItems.length;
                                let currOrderStatus = ORDER_STATUS_LIST.filter(orderStatus => orderStatus.fieldName === r.orderInfo.status)[0];

                                return (
                                    <tbody key={r.orderInfo.id}>
                                        <tr>
                                            <td rowSpan={orderItemsCount + 1}>{dateFormatUtils().dateToYYMMDDHHmmss(r.orderInfo.createdAt, 'Invalid Date')}</td>
                                            <td rowSpan={orderItemsCount + 1}>
                                                <SingleBlockButton
                                                    type='button'
                                                    onClick={() => __orderStatus.action.openModal(r.orderInfo)}
                                                    className='status-button'
                                                    style={{
                                                        color: currOrderStatus?.color
                                                    }}
                                                >
                                                    {currOrderStatus?.name}
                                                </SingleBlockButton>
                                            </td>
                                        </tr>
                                        {r.orderItems.map((orderItem, index2) => {
                                            return (
                                                <tr key={orderItem.id}>
                                                    <td>{r.orderInfo.orderer}</td>
                                                    <td>{r.orderInfo.ordererPhoneNumber}</td>
                                                    <td>
                                                        {orderItem.itemName}
                                                    </td>
                                                    <td>
                                                        {numberFormatHandler().numberWithCommas(orderItem.price || 0)}원
                                                    </td>
                                                    <td>
                                                        {orderItem.unit}
                                                    </td>
                                                    <td>
                                                        {nights}박
                                                    </td>
                                                    <td>
                                                        {orderItem.adoptedDiscountYn === 'y' ? orderItem.discountRate : '0'}%
                                                    </td>
                                                    <td>
                                                        {numberFormatHandler().numberWithCommas(
                                                            __ext_calcTotalPrice({
                                                                adoptedDiscountYn: orderItem.adoptedDiscountYn,
                                                                price: orderItem.price,
                                                                unit: orderItem.unit,
                                                                nights: nights,
                                                                discountRate: orderItem.discountRate
                                                            })
                                                            ||
                                                            0
                                                        )}
                                                    </td>
                                                    <td>{dateFormatUtils().dateToYYMMDD(r.orderInfo.pickupDate || new Date())} {r.orderInfo.pickupTime}</td>
                                                    <td>{dateFormatUtils().dateToYYMMDD(r.orderInfo.returnDate || new Date())} {r.orderInfo.returnTime}</td>
                                                    <td>{r.orderInfo.pickupRegion}</td>
                                                    <td>{r.orderInfo.returnRegion}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                );
                            })}
                        </table>
                    </TableBox>
                </TableWrapper>
            </Container>

            {/* Modal */}
            {orderStatusModalOpen && orderStatus &&
                <CommonModalComponent
                    open={orderStatusModalOpen}
                    onClose={__orderStatus.action.closeModal}
                >
                    {!orderStatus.selectedStatus &&
                        <div>
                            <div
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #e0e0e0',
                                    fontSize: '18px',
                                    fontWeight: '500'
                                }}
                            >
                                상태 변경 선택
                            </div>
                            <div
                                style={{
                                    padding: '0 10px'
                                }}
                            >
                                {ORDER_STATUS_LIST.map(r => {
                                    return (
                                        <SingleBlockButton
                                            key={r.fieldName}
                                            type='button'
                                            style={{
                                                background: orderStatus.status === r.fieldName && '#00B8BA',
                                                color: orderStatus.status === r.fieldName && 'white'
                                            }}
                                            onClick={() => __orderStatus.change.selectedStatus(r.fieldName)}
                                        >
                                            {r.name}
                                        </SingleBlockButton>
                                    );
                                })}
                            </div>
                        </div>
                    }

                    {orderStatus.selectedStatus &&
                        <div>
                            <div
                                style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #e0e0e0',
                                    fontSize: '18px',
                                    fontWeight: '500'
                                }}
                            >
                                상태 변경 확인
                            </div>
                            <div
                                style={{
                                    padding: '0 10px'
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: '30px',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                        fontWeight: '500'
                                    }}
                                >
                                    해당 주문 내역을 [{ORDER_STATUS_LIST.filter(r => r.fieldName === orderStatus.selectedStatus)[0].name}] 상태로 변경 합니다.
                                </div>
                                <LineBreakerBottom
                                    gapTop={30}
                                    lineColor={'#e0e0e0'}
                                />
                                <div
                                    style={{
                                        marginTop: '30px'
                                    }}
                                >
                                    <div>
                                        <CustomCheckbox
                                            checked={orderStatus.smsFlag}
                                            label={'메세지 작성'}
                                            name={'smsFlag'}
                                            onChange={__orderStatus.change.checkbox}
                                        />
                                    </div>
                                    {orderStatus.smsFlag &&
                                        <div>
                                            <div>
                                                <textarea
                                                    name='smsMessage'
                                                    onChange={__orderStatus.change.valueOfName}
                                                    value={orderStatus.smsMessage || ''}
                                                    style={{
                                                        width: '100%',
                                                        boxSizing: 'border-box',
                                                        padding: '5px',
                                                        marginTop: '10px',
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: '3px',
                                                        minHeight: '100px',
                                                        resize: 'none'
                                                    }}
                                                    maxLength={400}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#555'
                                                }}
                                            >
                                                {orderStatus.smsMessage.length} / 400
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '30px'
                                }}
                            >
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        border: 'none'
                                    }}
                                    onClick={() => __orderStatus.change.selectedStatus(null)}
                                >
                                    이전
                                </SingleBlockButton>
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        border: 'none'
                                    }}
                                    onClick={__orderStatus.submit.confirm}
                                >
                                    확인
                                </SingleBlockButton>
                            </div>
                        </div>
                    }
                </CommonModalComponent>
            }
        </>
    );
}
export default OrderListTableComponent;

const initialOrderStatus = null;

const orderStatusReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialOrderStatus;
        default: return initialOrderStatus;
    }
}