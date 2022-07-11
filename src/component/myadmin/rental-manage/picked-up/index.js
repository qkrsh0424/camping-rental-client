import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { rentalOrderProductDataConnect } from "../../../../data_connect/rentalOrderProductDataConnect";
import { useBackdropHook } from "../../../../hooks/backdrop/useBackdropHook";
import { useCustomRouterHook } from "../../../../hooks/router/useCustomRouterHook";
import NavbarComponent from "../../navbar/Navbar.component";
import RentalManageNavbarComponent from "../../navbar/RentalManageNavbar.component";
import TableFieldComponent from "./table-field/TableField.component";
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 150px;
`;

export default function MainComponent(props) {
    const [rentalOrderProductPage, dispatchRentalOrderProductPage] = useReducer(rentalOrderProductPageReducer, initialRentalOrderProductPage);
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();

    const {
        open: backdropOpen,
        onActionOpen: onActionBackdropOpen,
        onActionClose: onActionBackdropClose
    } = useBackdropHook();

    useEffect(() => {
        if (!customRouter.isReady) {
            return;
        }

        if (userRdx.isLoading || !userRdx.userInfo) {
            return;
        }

        __rentalOrderProductPage.req.fetch()
    }, [userRdx.isLoading, userRdx.userInfo]);

    const __rentalOrderProductPage = {
        req: {
            fetch: async () => {
                let page = customRouter.query.page ?? 1;
                let size = customRouter.query.size ?? 20;

                let params = {
                    page: page,
                    size: size,
                    status: 'pickedUp'
                }

                await rentalOrderProductDataConnect().searchPageByPrivate({ params: params })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchRentalOrderProductPage({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            },
            changeStatusToConfirmOrder: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToConfirmOrderForList({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            changeStatusToConfirmReservation: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToConfirmReservationForList({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            changeStatusToPickedUp: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToPickedUpForList({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            changeStatusToReturned: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToReturnedForList({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            changeStatusToCompleted: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToCompletedForList({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            },
            changeStatusToCancelled: async (ids) => {
                let productIds = [...ids];

                let body = {
                    productIds: productIds,
                }

                await rentalOrderProductDataConnect().changeStatusToCancelled({
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원할하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            changeStatusToConfirmOrder: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToConfirmOrder(ids);
                await __rentalOrderProductPage.req.fetch();
            },
            changeStatusToConfirmReservation: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToConfirmReservation(ids);
                await __rentalOrderProductPage.req.fetch();
            },
            changeStatusToPickedUp: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToPickedUp(ids);
                await __rentalOrderProductPage.req.fetch();
            },
            changeStatusToReturned: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToReturned(ids);
                await __rentalOrderProductPage.req.fetch();
            },
            changeStatusToCompleted: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToCompleted(ids);
                await __rentalOrderProductPage.req.fetch();
            },
            changeStatusToCancelled: async (ids) => {
                await __rentalOrderProductPage.req.changeStatusToCancelled(ids);
                await __rentalOrderProductPage.req.fetch();
            },
        }
    }

    return (
        <>
            <Container>
                <NavbarComponent />
                <RentalManageNavbarComponent />
                <TableFieldComponent
                    rentalOrderProductPage={rentalOrderProductPage}
                    onSubmitChangeStatusToConfirmOrder={__rentalOrderProductPage.submit.changeStatusToConfirmOrder}
                    onSubmitChangeStatusToConfirmReservation={__rentalOrderProductPage.submit.changeStatusToConfirmReservation}
                    onSubmitChangeStatusToPickedUp={__rentalOrderProductPage.submit.changeStatusToPickedUp}
                    onSubmitChangeStatusToReturned={__rentalOrderProductPage.submit.changeStatusToReturned}
                    onSubmitChangeStatusToCompleted={__rentalOrderProductPage.submit.changeStatusToCompleted}
                    onSubmitChangeStatusToCancelled={__rentalOrderProductPage.submit.changeStatusToCancelled}
                />
            </Container>
        </>
    );
}

const initialRentalOrderProductPage = null;

const rentalOrderProductPageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRentalOrderProductPage;
        default: return initialRentalOrderProductPage;
    }
}