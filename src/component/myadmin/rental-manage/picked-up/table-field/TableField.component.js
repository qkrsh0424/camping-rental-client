import { GlobalCommonBodyContainer } from "../../../../../globalStyledComponent";
import PagenationComponent from "../../../../module/pagenation/PagenationComponent";
import ResizableTh from "../../../../module/table/ResizableTh";
import { dateFormatUtils } from "../../../../../utils/dateFormatUtils";
import { numberFormatHandler } from "../../../../../utils/numberFormatHandler";
import SingleBlockButton from "../../../../module/button/SingleBlockButton";
import { useState } from 'react';
import ConfirmModalComponent from "../../../../module/modal/ConfirmModalComponent";
import { BrowserContainer, CardListWrapper, MobileContainer, TableBox, TableWrapper, PagenationContainer, BrowserButtonGroupWrapper, MobileButtonGroupWrapper } from "./TableField.styled";
import CustomCheckbox from "../../../../module/checkbox/CustomCheckbox";
import { useMatch } from "react-router-dom";
import ElementLoading from "../../../../module/loading/ElementLoading";
import { useCustomRouterHook } from "../../../../../hooks/router/useCustomRouterHook";

const __ext_calcTotalPrice = ({
    price,
    unit,
    diffHours,
    discountYn,
    discountRate,
    discountMinimumHour
}) => {
    if (discountYn === 'y' && (diffHours >= discountMinimumHour)) {
        /**
         * 할인율이 적용이 되었을때
         * 가격 * 수량 * 시간 * 할인율(%)
         */
        return price * unit * diffHours * (1 - (discountRate / 100));
    } else {
        /**
         * 할인율이 적용되지 않았을때
         * 가격 * 수량 * 시간
         */
        return price * unit * diffHours;
    }
}

export default function TableFieldComponent(props) {
    const statusMatch = useMatch('/myadmin/rental-manage/:status');
    const customRouter = useCustomRouterHook();
    const [selectIds, setSelectIds] = useState([]);
    const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);
    const [confirmReservationModalOpen, setConfirmReservationModalOpen] = useState(false);
    const [pickedUpModalOpen, setPickedUpModalOpen] = useState(false);
    const [returnedModalOpen, setReturnedModalOpen] = useState(false);
    const [completedModalOpen, setCompletedModalOpen] = useState(false);
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false);

    const __handle = {
        action: {
            openConfirmOrderModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setConfirmOrderModalOpen(true);
            },
            closeConfirmOrderModal: () => {
                setConfirmOrderModalOpen(false);
            },
            openConfirmReservationModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setConfirmReservationModalOpen(true);
            },
            closeConfirmReservationModal: () => {
                setConfirmReservationModalOpen(false);
            },
            openPickedUpModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setPickedUpModalOpen(true);
            },
            closePickedUpModal: () => {
                setPickedUpModalOpen(false);
            },
            openReturnedModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setReturnedModalOpen(true);
            },
            closeReturnedModal: () => {
                setReturnedModalOpen(false);
            },
            openCompletedModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setCompletedModalOpen(true);
            },
            closeCompletedModal: () => {
                setCompletedModalOpen(false);
            },
            openCancelOrderModal: () => {
                if (selectIds.length < 1) {
                    alert('데이터를 먼저 선택해 주세요.');
                    return;
                }
                setCancelOrderModalOpen(true);
            },
            closeCancelOrderModal: () => {
                setCancelOrderModalOpen(false);
            }
        },
        submit: {
            changeStatusToConfirmOrder: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToConfirmOrder(selectIds);
                setSelectIds([]);
                __handle.action.closeConfirmOrderModal();
            },
            changeStatusToConfirmReservation: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToConfirmReservation(selectIds);
                setSelectIds([]);
                __handle.action.closeConfirmReservationModal();
            },
            changeStatusToPickedUp: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToPickedUp(selectIds);
                setSelectIds([]);
                __handle.action.closePickedUpModal();
            },
            changeStatusToReturned: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToReturned(selectIds);
                setSelectIds([]);
                __handle.action.closeReturnedModal();
            },
            changeStatusToCompleted: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToCompleted(selectIds);
                setSelectIds([]);
                __handle.action.closeCompletedModal();
            },
            changeStatusToCancelled: () => {
                if (selectIds.length < 1) {
                    return;
                }

                props.onSubmitChangeStatusToCancelled(selectIds);
                setSelectIds([]);
                __handle.action.closeCancelOrderModal();
            }
        }
    }

    const __selectIds = {
        action: {
            selectOne: (id) => {
                let currSelectIdsSet = new Set([...selectIds])

                if (currSelectIdsSet.has(id)) {
                    currSelectIdsSet.delete(id);
                } else {
                    currSelectIdsSet.add(id);
                }

                setSelectIds([...currSelectIdsSet]);
            },
            selectAll: () => {
                if (__selectIds.return.selectedAll()) {
                    setSelectIds([]);
                } else {
                    setSelectIds([...props.rentalOrderProductPage.content.map(r => r.id)]);
                }
            }
        },
        return: {
            selectedAll: () => {
                if (selectIds.length <= 0) {
                    return false;
                }

                let contentIds = props.rentalOrderProductPage.content.map(r => r.id);
                contentIds.sort();
                selectIds.sort();
                return JSON.stringify(contentIds) === JSON.stringify(selectIds);
            }
        }
    }

    return (
        <>
            {props.rentalOrderProductPage &&
                <>
                    <BrowserContainer>
                        <GlobalCommonBodyContainer>
                            <>
                                <BrowserButtonGroup
                                    status={statusMatch.params.status}
                                    onAction={__handle.action}
                                />
                                <Table
                                    rentalOrderProducts={props.rentalOrderProductPage.content}
                                    selectIds={selectIds}
                                    onActionSelectOne={__selectIds.action.selectOne}
                                    onActionSelectAll={__selectIds.action.selectAll}
                                    onReturnSelectedAll={__selectIds.return.selectedAll}
                                />
                            </>
                        </GlobalCommonBodyContainer>
                    </BrowserContainer>
                    <MobileContainer>
                        <GlobalCommonBodyContainer>
                            <>
                                <MobileButtonGroup
                                    status={statusMatch.params.status}
                                    onAction={__handle.action}
                                    onReturnSelectedAll={__selectIds.return.selectedAll}
                                    onActionSelectAll={__selectIds.action.selectAll}
                                />
                                <CardList
                                    rentalOrderProducts={props.rentalOrderProductPage.content}
                                    selectIds={selectIds}
                                    onActionSelectOne={__selectIds.action.selectOne}
                                />
                            </>
                        </GlobalCommonBodyContainer>
                    </MobileContainer>
                    <PagenationContainer>
                        <PagenationComponent
                            isFirst={props.rentalOrderProductPage.first}
                            isLast={props.rentalOrderProductPage.last}
                            pageIndex={props.rentalOrderProductPage.number}
                            size={customRouter.query?.size || 0}
                            sizeElements={[20, 50, 100]}
                            totalPages={props.rentalOrderProductPage.totalPages}
                            totalElements={props.rentalOrderProductPage.totalElements}
                            align={'center'}
                        />
                    </PagenationContainer>

                    {confirmOrderModalOpen &&
                        <ConfirmModalComponent
                            open={confirmOrderModalOpen}
                            onClose={__handle.action.closeConfirmOrderModal}
                            message={`${selectIds.length} 건의 데이터를 주문확인 처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToConfirmOrder}
                        />
                    }

                    {confirmReservationModalOpen &&
                        <ConfirmModalComponent
                            open={confirmReservationModalOpen}
                            onClose={__handle.action.closeConfirmReservationModal}
                            message={`${selectIds.length} 건의 데이터를 예약확정 처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToConfirmReservation}
                        />
                    }

                    {pickedUpModalOpen &&
                        <ConfirmModalComponent
                            open={pickedUpModalOpen}
                            onClose={__handle.action.closePickedUpModal}
                            message={`${selectIds.length} 건의 데이터를 픽업완료 처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToPickedUp}
                        />
                    }

                    {returnedModalOpen &&
                        <ConfirmModalComponent
                            open={returnedModalOpen}
                            onClose={__handle.action.closeReturnedModal}
                            message={`${selectIds.length} 건의 데이터를 반납완료 처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToReturned}
                        />
                    }

                    {completedModalOpen &&
                        <ConfirmModalComponent
                            open={completedModalOpen}
                            onClose={__handle.action.closeCompletedModal}
                            message={`${selectIds.length} 건의 데이터를 대여완료 처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToCompleted}
                        />
                    }

                    {cancelOrderModalOpen &&
                        <ConfirmModalComponent
                            open={cancelOrderModalOpen}
                            onClose={__handle.action.closeCancelOrderModal}
                            message={`${selectIds.length} 건의 데이터를 취소처리 하시겠습니까?`}
                            onConfirm={__handle.submit.changeStatusToCancelled}
                        />
                    }
                </>
            }

            {!props.rentalOrderProductPage &&
                <>
                    <BrowserContainer>
                        <GlobalCommonBodyContainer>
                            <>
                                <div
                                    style={{
                                        display: 'flex'
                                    }}
                                >
                                    <ElementLoading
                                        style={{
                                            width: '90px',
                                            margin: '0',
                                            marginRight: '5px',
                                            padding: '0',
                                            height: '34px'
                                        }}
                                    />
                                    <ElementLoading
                                        style={{
                                            width: '90px',
                                            margin: '0',
                                            marginRight: '5px',
                                            padding: '0',
                                            height: '34px'
                                        }}
                                    />
                                </div>
                                <ElementLoading
                                    style={{
                                        height: '400px',
                                        marginTop: '10px'
                                    }}
                                />
                            </>
                        </GlobalCommonBodyContainer>
                    </BrowserContainer>
                    <MobileContainer>
                        <GlobalCommonBodyContainer>
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <ElementLoading
                                        style={{
                                            width: '18px',
                                            margin: '0',
                                            marginRight: '5px',
                                            padding: '0',
                                            height: '18px'
                                        }}
                                    />
                                    <ElementLoading
                                        style={{
                                            width: '80px',
                                            margin: '0',
                                            marginRight: '5px',
                                            padding: '0',
                                            height: '28px'
                                        }}
                                    />
                                    <ElementLoading
                                        style={{
                                            width: '80px',
                                            margin: '0',
                                            marginRight: '5px',
                                            padding: '0',
                                            height: '28px'
                                        }}
                                    />
                                </div>
                                <ElementLoading
                                    style={{
                                        height: '136px',
                                        marginTop: '10px'
                                    }}
                                />
                                <ElementLoading
                                    style={{
                                        height: '136px',
                                        marginTop: '10px'
                                    }}
                                />
                                <ElementLoading
                                    style={{
                                        height: '136px',
                                        marginTop: '10px'
                                    }}
                                />
                                <ElementLoading
                                    style={{
                                        height: '136px',
                                        marginTop: '10px'
                                    }}
                                />
                                <ElementLoading
                                    style={{
                                        height: '136px',
                                        marginTop: '10px'
                                    }}
                                />
                            </>
                        </GlobalCommonBodyContainer>
                    </MobileContainer>
                </>
            }
        </>
    );
}

function BrowserButtonGroup({
    status,
    onAction
}) {
    return (
        <BrowserButtonGroupWrapper>
            {status === 'new-order' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            marginRight: '5px',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openConfirmOrderModal}
                    >
                        주문확인
                    </SingleBlockButton>
                </>
            )}

            {status === 'confirm-order' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            marginRight: '5px',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openConfirmReservationModal}
                    >
                        예약확정
                    </SingleBlockButton>
                </>
            )}

            {status === 'confirm-reservation' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            marginRight: '5px',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openPickedUpModal}
                    >
                        픽업완료
                    </SingleBlockButton>
                </>
            )}

            {status === 'picked-up' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            marginRight: '5px',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openReturnedModal}
                    >
                        반납완료
                    </SingleBlockButton>
                </>
            )}

            {status === 'returned' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            marginRight: '5px',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openCompletedModal}
                    >
                        대여완료
                    </SingleBlockButton>
                </>
            )}

            {(status === 'new-order' || status === 'confirm-order' || status === 'confirm-reservation' || status === 'picked-up' || status === 'returned') && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            width: '90px',
                            margin: '0',
                            padding: '0',
                            height: '34px'
                        }}
                        onClick={onAction.openCancelOrderModal}
                    >
                        취소처리
                    </SingleBlockButton>
                </>
            )}
        </BrowserButtonGroupWrapper>
    );
}

function MobileButtonGroup({
    status,
    onAction,
    onReturnSelectedAll,
    onActionSelectAll
}) {
    return (
        <MobileButtonGroupWrapper>
            <CustomCheckbox
                type='checkbox'
                style={{
                    margin: '0'
                }}
                checked={onReturnSelectedAll() || false}
                onChange={() => onActionSelectAll()}
                readOnly
            />
            {status === 'new-order' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openConfirmOrderModal}
                    >
                        주문확인
                    </SingleBlockButton>

                </>
            )}

            {status === 'confirm-order' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openConfirmReservationModal}
                    >
                        예약확정
                    </SingleBlockButton>
                </>
            )}

            {status === 'confirm-reservation' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openPickedUpModal}
                    >
                        픽업완료
                    </SingleBlockButton>
                </>
            )}

            {status === 'picked-up' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openReturnedModal}
                    >
                        반납완료
                    </SingleBlockButton>
                </>
            )}

            {status === 'returned' && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openCompletedModal}
                    >
                        대여완료
                    </SingleBlockButton>
                </>
            )}

            {(status === 'new-order' || status === 'confirm-order' || status === 'confirm-reservation' || status === 'picked-up' || status === 'returned') && (
                <>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: '0',
                            marginLeft: '10px',
                            padding: '0',
                            width: '80px',
                            height: '28px',
                            fontSize: '13px'
                        }}
                        onClick={onAction.openCancelOrderModal}
                    >
                        취소처리
                    </SingleBlockButton>
                </>
            )}
        </MobileButtonGroupWrapper>
    );
}

function CardList({
    rentalOrderProducts,
    selectIds,
    onActionSelectOne,
}) {
    return (
        <CardListWrapper>
            {rentalOrderProducts?.map((r, index) => {
                let pDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.pickupDate, r.rentalOrderInfo.pickupTime);
                let rDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.returnDate, r.rentalOrderInfo.returnTime);
                let diffHours = dateFormatUtils().getDiffHoursFromDates(pDate, rDate);
                return (
                    <div
                        key={r.id}
                        style={{
                            display: 'flex',
                            borderBottom: '1px solid #e0e0e0',
                            padding: '10px 0'
                        }}
                    >
                        <div>
                            <CustomCheckbox
                                type='checkbox'
                                style={{
                                    margin: '0'
                                }}
                                checked={selectIds.includes(r.id) || false}
                                onChange={() => onActionSelectOne(r.id)}
                                readOnly
                            ></CustomCheckbox>
                        </div>
                        <div
                            style={{
                                marginLeft: '10px'
                            }}
                        >
                            <div
                                className='text-box'
                                style={{
                                    fontWeight: '600'
                                }}
                            >{r.productName}</div>
                            <div
                                className='text-box'
                            >{dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.pickupDate, 'Invalid Date')} {r.rentalOrderInfo.pickupTime} ~ {dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.returnDate, 'Invalid Date')} {r.rentalOrderInfo.returnTime} <span style={{ color: '#b39283', fontWeight: '600' }}>({diffHours}H)</span></div>
                            <div
                                className='text-box'
                            >{numberFormatHandler().numberWithCommas(r.price || 0)}원 / <span style={{ color: '#b39283', fontWeight: '600' }}>{r.unit}개</span> / {r.discountYn === 'y' && (diffHours >= r.discountMinimumHour) ? r.discountRate : '0'}% / <span style={{ color: '#b39283', fontWeight: '600' }}>합계 {
                                numberFormatHandler().numberWithCommas(__ext_calcTotalPrice({
                                    price: r.price,
                                    unit: r.unit,
                                    diffHours: diffHours,
                                    discountYn: r.discountYn,
                                    discountMinimumHour: r.discountMinimumHour,
                                    discountRate: r.discountRate
                                }) || 0)
                            } 원</span>
                            </div>
                            <div
                                className='text-box'
                            >
                                픽업: {r.rentalOrderInfo.pickupPlace}
                            </div>
                            <div
                                className='text-box'
                            >
                                반납: {r.rentalOrderInfo.returnPlace}
                            </div>
                            <div
                                className='text-box'
                            >
                                <span style={{ color: '#b39283', fontWeight: '600' }}>{r.rentalOrderInfo.orderer} / {r.rentalOrderInfo.ordererPhoneNumber}</span> / {dateFormatUtils().dateToYYMMDDHHmmss(r.rentalOrderInfo.createdAt, 'Invalid Date')}
                            </div>
                        </div>
                    </div>
                );
            })}
        </CardListWrapper >
    );
}

function Table({
    rentalOrderProducts,
    selectIds,
    onActionSelectOne,
    onActionSelectAll,
    onReturnSelectedAll
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                // cellPadding={5}
                >
                    <TableHead
                        onActionSelectAll={onActionSelectAll}
                        onReturnSelectedAll={onReturnSelectedAll}
                    />
                    <tbody>
                        {rentalOrderProducts?.map((r, index) => {
                            let pDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.pickupDate, r.rentalOrderInfo.pickupTime);
                            let rDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.returnDate, r.rentalOrderInfo.returnTime);
                            let diffHours = dateFormatUtils().getDiffHoursFromDates(pDate, rDate);

                            return (
                                <tr
                                    key={r.id}
                                    onClick={() => onActionSelectOne(r.id)}
                                >
                                    <td
                                        className='fixed-col-left'
                                    >
                                        <input
                                            type='checkbox'
                                            checked={selectIds.includes(r.id) || false}
                                            readOnly
                                        ></input>
                                    </td>
                                    <td
                                        className='fixed-col-left'
                                        style={{
                                            left: '50px'
                                        }}
                                    >{dateFormatUtils().dateToYYMMDDHHmmss(r.rentalOrderInfo.createdAt, 'Invalid Date')}</td>
                                    <td
                                        className='fixed-col-left'
                                        style={{
                                            left: '180px',
                                            width: '130px'
                                        }}
                                    >
                                        {r.rentalOrderInfo.orderer}
                                    </td>
                                    <td>{r.rentalOrderInfo.ordererPhoneNumber}</td>
                                    <td>{r.productName}</td>
                                    <td>{r.unit} 개</td>
                                    <td>{dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.pickupDate, 'Invalid Date')} {r.rentalOrderInfo.pickupTime}</td>
                                    <td>{dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.returnDate, 'Invalid Date')} {r.rentalOrderInfo.returnTime}</td>
                                    <td>{r.rentalOrderInfo.pickupPlace}</td>
                                    <td>{r.rentalOrderInfo.returnPlace}</td>
                                    <td>{diffHours}H</td>
                                    <td>{numberFormatHandler().numberWithCommas(r.price || 0)} 원</td>
                                    <td>{r.discountYn === 'y' && (diffHours >= r.discountMinimumHour) ? r.discountRate : '0'} %</td>
                                    <td>

                                        {
                                            numberFormatHandler().numberWithCommas(__ext_calcTotalPrice({
                                                price: r.price,
                                                unit: r.unit,
                                                diffHours: diffHours,
                                                discountYn: r.discountYn,
                                                discountRate: r.discountRate,
                                                discountMinimumHour: r.discountMinimumHour
                                            }) || 0)
                                        } 원
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper>
    );
}

function TableHead({
    onActionSelectAll,
    onReturnSelectedAll
}) {
    return (
        <thead>
            <tr>
                <th
                    className='fixed-col-left'
                    scope="col"
                    style={{
                        zIndex: '11',
                        width: '50px'
                    }}
                >
                    <input
                        type='checkbox'
                        checked={onReturnSelectedAll() || false}
                        onChange={onActionSelectAll}
                        readOnly
                    ></input>
                </th>
                {TABLE_HEADERS?.map((r, index) => {
                    if (index === 0) {
                        return (
                            <th
                                key={index}
                                className="fixed-col-left"
                                scope="col"

                                style={{
                                    left: '50px',
                                    width: '130px',
                                    zIndex: '11'
                                }}
                            >
                                <div
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                                >
                                    <div>
                                        {r.name}
                                    </div>
                                </div>
                            </th>
                        );
                    }
                    if (index === 1) {
                        return (
                            <th
                                key={index}
                                className="fixed-col-left"
                                scope="col"

                                style={{
                                    left: '180px',
                                    width: '120px',
                                    zIndex: '11'
                                }}
                            >
                                <div
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                                >
                                    <div>
                                        {r.name}
                                    </div>
                                </div>
                            </th>
                        );
                    }
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
                            </div>
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}

const TABLE_HEADERS = [
    {
        name: '주문일시'
    },
    {
        name: '주문자명'
    },
    {
        name: '주문자 연락처'
    },
    {
        name: '제품명'
    },
    {
        name: '개수'
    },
    {
        name: '픽업 날짜 및 시간'
    },
    {
        name: '반납 날짜 및 시간'
    },
    {
        name: '픽업 장소'
    },
    {
        name: '반납 장소'
    },
    {
        name: '대여 기간'
    },
    {
        name: '가격'
    },
    {
        name: '적용된 할인'
    },
    {
        name: '총 가격'
    }
]