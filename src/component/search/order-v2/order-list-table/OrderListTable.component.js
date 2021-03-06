import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { dateFormatUtils } from '../../../../utils/dateFormatUtils';
import { numberFormatHandler } from '../../../../utils/numberFormatHandler';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import SortButton from '../../../module/button/SortButton';
import CustomCheckbox from '../../../module/checkbox/CustomCheckbox';
import LineBreakerBottom from '../../../module/fragment/LineBreakerBottom';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import PagenationComponent from '../../../module/pagenation/PagenationComponent';
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
        name: '?????????'
    },
    {
        name: '??????'
    },
    {
        name: '?????????'
    },
    {
        name: '?????????'
    },
    {
        name: '??????'
    },
    {
        name: '??????'
    },
    {
        name: '??????'
    },
    {
        name: '?????????'
    },
    {
        name: '??????'
    },
    {
        name: '??? ??????'
    },
    {
        name: '?????? ?????? ??? ??????'
    },
    {
        name: '?????? ?????? ??? ??????'
    },
    {
        name: '?????? ??????'
    },
    {
        name: '?????? ??????'
    }
]

const ORDER_STATUS_LIST = [
    {
        fieldName: 'newOrder',
        name: '?????? ??????',
        color: '#000000'
    },
    {
        fieldName: 'confirmOrder',
        name: '?????? ??????',
        color: '#000000'
    },
    {
        fieldName: 'confirmReservation',
        name: '?????? ??????',
        color: '#00B8BA'
    },
    {
        fieldName: 'pickedUp',
        name: '?????? ??????',
        color: '#dcbd85'
    },
    {
        fieldName: 'returned',
        name: '?????? ??????',
        color: '#046683'
    },
    {
        fieldName: 'completed',
        name: '?????????',
        color: '#888888'
    },
    {
        fieldName: 'cancelled',
        name: '?????????',
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
         * ???????????? ????????? ????????????
         * ?????? * ?????? * ??? * ?????????(%)
         */
        return price * unit * nights * (1 - (discountRate / 100));
    } else {
        /**
         * ???????????? ???????????? ????????????
         * ?????? * ?????? * ???
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
                                let nights = dateFormatUtils().getDiffDate(r.pickupDate, r.returnDate);
                                let orderItemsCount = r.orderItems.length;
                                let currOrderStatus = ORDER_STATUS_LIST.filter(orderStatus => orderStatus.fieldName === r.status)[0];

                                return (
                                    <tbody key={r.id}>
                                        <tr>
                                            <td rowSpan={orderItemsCount + 1}>{dateFormatUtils().dateToYYMMDDHHmmss(r.createdAt, 'Invalid Date')}</td>
                                            <td rowSpan={orderItemsCount + 1}>
                                                <SingleBlockButton
                                                    type='button'
                                                    onClick={() => __orderStatus.action.openModal(r)}
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
                                                    <td>{r.orderer}</td>
                                                    <td>{r.ordererPhoneNumber}</td>
                                                    <td>
                                                        {orderItem.itemName}
                                                    </td>
                                                    <td>
                                                        {numberFormatHandler().numberWithCommas(orderItem.price || 0)}???
                                                    </td>
                                                    <td>
                                                        {orderItem.unit}
                                                    </td>
                                                    <td>
                                                        {nights}???
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
                                                        )}???
                                                    </td>
                                                    <td>{dateFormatUtils().dateToYYMMDD(r.pickupDate || new Date())} {r.pickupTime}</td>
                                                    <td>{dateFormatUtils().dateToYYMMDD(r.returnDate || new Date())} {r.returnTime}</td>
                                                    <td>{r.pickupRegion}</td>
                                                    <td>{r.returnRegion}</td>
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
                                ?????? ?????? ??????
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
                                ?????? ?????? ??????
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
                                    ?????? ?????? ????????? [{ORDER_STATUS_LIST.filter(r => r.fieldName === orderStatus.selectedStatus)[0].name}] ????????? ?????? ?????????.
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
                                            label={'????????? ??????'}
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
                                    ??????
                                </SingleBlockButton>
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        border: 'none'
                                    }}
                                    onClick={__orderStatus.submit.confirm}
                                >
                                    ??????
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