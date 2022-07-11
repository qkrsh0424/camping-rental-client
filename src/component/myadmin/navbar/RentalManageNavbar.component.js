import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import CommonModalComponent from '../../module/modal/CommonModalComponent';

const Container = styled.div`
    padding: 10px;
`;

const BrowserWrapper = styled.div`
    display: flex;
    justify-content: flex-end;

    @media all and (max-width:992px){
        display: none;
    }

    .nav-active{
        color:#b39283 !important;
        font-weight: 700;
    }
`;

const MobileWrapper = styled.div`
    display: none;

    @media all and (max-width:992px){
        display: flex;
        justify-content: flex-start;
    }
`;

const NavItem = styled.div`
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100px;
    height: 34px;
    text-align: center;
    color: #505050;
    font-weight: 500;

    cursor: pointer;

    &:hover{
        color: #303030;
    }
`;

const ModalButtonBox = styled.div`
    .button-item{
        width:100%;
        background: white;
        border: none;
        padding: 15px 0;
        font-size: 14px;
    }
    .button-active{
        background: #b39283 !important;
        color:white !important;
        font-weight: 600 !important;
    }
`;

const thisRouters = [
    {
        name: '신규주문',
        pathname: '/myadmin/rental-manage/new-order'
    },
    {
        name: '주문확인',
        pathname: '/myadmin/rental-manage/confirm-order'
    },
    {
        name: '예약확정',
        pathname: '/myadmin/rental-manage/confirm-reservation'
    },
    {
        name: '픽업완료',
        pathname: '/myadmin/rental-manage/picked-up'
    },
    {
        name: '반납완료',
        pathname: '/myadmin/rental-manage/returned'
    },
    {
        name: '완료내역',
        pathname: '/myadmin/rental-manage/completed'
    },
    {
        name: '취소내역',
        pathname: '/myadmin/rental-manage/cancelled'
    }
]

export default function RentalManageNavbarComponent(props) {
    const customRouter = useCustomRouterHook();
    const [mobileRouterSelectorOpen, setMobileRouterSelectorOpen] = useState(false);

    const __handle = {
        action: {
            route: (pathname) => {
                customRouter.push({
                    pathname: pathname,
                    replace: true
                })
            },
            openMobileRouterSelector: () => {
                setMobileRouterSelectorOpen(true);
            },
            closeMobileRouterSelector: () => {
                setMobileRouterSelectorOpen(false);
            },
        }
    }
    return (
        <>
            <Container>
                <BrowserWrapper>
                    {thisRouters.map(r => {
                        return (
                            <NavItem
                                key={r.pathname}
                                className={`${customRouter.pathname === r.pathname ? 'nav-active' : ''}`}
                                onClick={() => __handle.action.route(r.pathname)}
                            >
                                {r.name}
                            </NavItem>
                        );
                    })}
                </BrowserWrapper>
                <MobileWrapper>
                    <SingleBlockButton
                        type='button'
                        style={{
                            margin: 0,
                            padding: 0,
                            width: '150px',
                            height: '34px',
                            background: '#b39283',
                            border: 'none',
                            color: 'white'
                        }}
                        onClick={() => __handle.action.openMobileRouterSelector()}
                    >
                        {thisRouters.find(r => r.pathname === customRouter.pathname).name}
                    </SingleBlockButton>
                </MobileWrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={mobileRouterSelectorOpen}

                onClose={() => __handle.action.closeMobileRouterSelector()}
            >
                {thisRouters.map((r) => (
                    <React.Fragment
                        key={r.name}
                    >
                        <Link
                            to={r.pathname}
                            replace={true}
                        >
                            <ModalButtonBox>
                                <button
                                    type='button'
                                    className={`button-item ${customRouter.pathname === r.pathname ? 'button-active' : ''}`}
                                >{r.name}</button>
                            </ModalButtonBox>
                        </Link>
                    </React.Fragment>
                ))}
            </CommonModalComponent>
        </>
    );
}