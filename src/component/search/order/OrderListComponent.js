import React from 'react';
import styled from 'styled-components';
import { dateFormatUtils } from '../../../utils/dateFormatUtils';
import { numberFormatHandler } from '../../../utils/numberFormatHandler';

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
        &:hover{
            background:#9352bd30;
        }
    }

    table tbody {
        border-bottom: 1px solid #e1e1e1;
    }

    table tbody td{
        padding:5px 0;
        &:hover{
            background:#9352bd40;
        }
    }

    @media only screen and (max-width:992px){
        min-height: 200px;
        max-height: 300px;
    }
`;

const OrderListComponent = (props) => {
    return (
        <>
            <Container>
                <TableWrapper>
                    <TableBox>
                        <table>
                            <colgroup>
                                <col width="50px" />
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
                                    <th>#</th>
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
                                            <td>{index + 1}</td>
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
        </>
    );
}
export default OrderListComponent;