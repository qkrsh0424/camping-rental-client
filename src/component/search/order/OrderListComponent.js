import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { dateFormatUtils } from '../../../utils/dateFormatUtils';
import { numberFormatHandler } from '../../../utils/numberFormatHandler';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import CommonModalComponent from '../../module/modal/CommonModalComponent';

const Container = styled.div`

`;

const TableWrapper = styled.div`
    padding:10px;
`;

const TableBox = styled.div`
    overflow: auto;
    border: 1px solid #f1f1f1;
    min-height: 400px;
    max-height: 1000px;
    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
    }

    table thead{
    }

    table thead th {
        padding:5px;
        background:#9352bd;
        color: white;
        font-weight: 600;
        position: sticky;
        top:0;
    }

    table tbody tr:first-child{
        border-bottom: 1px solid #f1f1f1;
    }

    table tbody tr{
    }

    table tbody {
        border-bottom: 1px solid #e1e1e1;
    }

    table tbody td{
        padding:5px 0;
    }

    @media only screen and (max-width:992px){
        min-height: 200px;
        max-height: 300px;
    }
`;

const OrderListComponent = (props) => {
    const [orderStatus, dispatchOrderStatus] = useReducer(orderStatusReducer, initialOrderStatus);
    const [orderStatusModalOpen, setOrderStatusModalOpen] = useState(false);

    const __orderStatus = {
        action: {
            openModal: (orderInfoId) => {
                console.log(orderInfoId);
                dispatchOrderStatus({
                    type: 'SET_DATA',
                    payload: {
                        orderInfoId: orderInfoId,
                        status: 'reserved',
                        sms: '',
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
        }
    }

    return (
        <>
            <Container>
                <TableWrapper>
                    <TableBox>
                        <table>
                            <colgroup>
                                <col width="100px" />
                                <col width="250px" />
                                <col width="250px" />
                                <col width="250px" />
                                <col width="500px" />
                                <col width="250px" />
                                <col width="250px" />
                                <col width="300px" />
                                <col width="300px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>등록일</th>
                                    <th>상태</th>
                                    <th>주문자</th>
                                    <th>연락처</th>
                                    <th>[상품][가격][개수][박][할인]</th>
                                    <th>픽업 날짜 시간</th>
                                    <th>반납 날짜 시간</th>
                                    <th>픽업 위치</th>
                                    <th>반납 위치</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.orderListState?.map((r, index) => {
                                    let nights = dateFormatUtils().getDiffDate(r.orderInfo.pickupDate, r.orderInfo.returnDate);
                                    return (
                                        <tr key={r.orderInfo.id}>
                                            <td>{dateFormatUtils().dateToYYMMDDHHmmss(r.orderInfo.createdAt, 'Invalid Date')}</td>
                                            <td>
                                                <SingleBlockButton
                                                    type='button'
                                                    onClick={() => __orderStatus.action.openModal(r.orderInfo.id)}
                                                >
                                                    신규 주문
                                                </SingleBlockButton>
                                            </td>
                                            <td>{r.orderInfo.orderer}</td>
                                            <td>{r.orderInfo.ordererPhoneNumber}</td>
                                            <td style={{ textAlign: 'left' }}>
                                                {r.orderItems?.map((orderItem, index2) => {
                                                    return (
                                                        <React.Fragment key={orderItem.id}>
                                                            <div>{index2 + 1}. [{orderItem.itemName}][{numberFormatHandler().numberWithCommas(orderItem.price || 0)}원][{orderItem.unit}개][{nights}박][{orderItem.adoptedDiscountYn === 'y' ? orderItem.discountRate : '0'}%]</div>
                                                            <div>= {orderItem.adoptedDiscountYn === 'y' ? numberFormatHandler().numberWithCommas((orderItem.price * orderItem.unit * nights * (1 - (orderItem.discountRate / 100))) || 0) : numberFormatHandler().numberWithCommas((orderItem.price * orderItem.unit * nights) || 0)}원</div>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </td>
                                            <td>{dateFormatUtils().dateToYYMMDD(r.orderInfo.pickupDate || new Date())} {r.orderInfo.pickupTime}</td>
                                            <td>{dateFormatUtils().dateToYYMMDD(r.orderInfo.returnDate || new Date())} {r.orderInfo.returnTime}</td>
                                            <td>{r.orderInfo.pickupRegion}</td>
                                            <td>{r.orderInfo.returnRegion}</td>

                                        </tr>
                                    );
                                })}
                            </tbody>
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
                    <div
                        style={{
                            padding: '10px',
                            borderBottom: '1px solid #e0e0e0',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                    >
                        상태 변경
                    </div>
                    <div
                        style={{
                            padding: '0 10px'
                        }}
                    >
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'new' && '#00B8BA',
                                color: orderStatus.status === 'new' && 'white'
                            }}
                        >
                            신규 주문
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'reserving' && '#00B8BA',
                                color: orderStatus.status === 'reserving' && 'white'
                            }}
                        >
                            예약 확인
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'reserved' && '#00B8BA',
                                color: orderStatus.status === 'reserved' && 'white'
                            }}
                        >
                            예약 완료
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'picked' && '#00B8BA',
                                color: orderStatus.status === 'picked' && 'white'
                            }}
                        >
                            픽업 완료
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'returned' && '#00B8BA',
                                color: orderStatus.status === 'returned' && 'white'
                            }}
                        >
                            반납 완료
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            style={{
                                background: orderStatus.status === 'cancelled' && '#00B8BA',
                                color: orderStatus.status === 'cancelled' && 'white'
                            }}
                        >
                            취소됨
                        </SingleBlockButton>
                    </div>
                </CommonModalComponent>
            }
        </>
    );
}
export default OrderListComponent;

const initialOrderStatus = null;

const orderStatusReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialOrderStatus;
        default: return initialOrderStatus;
    }
}