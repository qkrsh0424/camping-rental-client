import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';
import { userDataConnect } from '../../data_connect/userDataConnect';
import { useCustomRouterHook } from '../../hooks/router/useCustomRouterHook';
import { SwipeableDrawer } from '@mui/material';

const Container = styled.div`
    position: relative;
`;

const FirstContainer = styled.div`
    overflow: hidden;
    position:relative;
    z-index: 99;
    display: flex;
    align-items: center;
    
    padding:0 20px;
    box-sizing: border-box;
    background: #b39283;
    width: 100%;
    height:64px;
    justify-content: space-between;
`;

const MenuWrapper = styled.div`
    width:350px;
    @media all and (max-width:992px){
        width:280px;
    }
`;

const LogoEl = styled.div`
    
    /* padding: 0 10px; */
    word-break: keep-all;
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: 'Gugi', cursive;

    @media only screen and (max-width:992px){
        font-size: 1rem;
    }
`;

const LogoLink = styled(Link)`
    text-decoration: none;
    color:#ffffff;
    &:hover{
        color:#ffffff80;
    }
`;

const UserWrapper = styled.div`
    user-select: none;
    display: flex;

    font-size: 14px;
    font-weight: 600;
    color:#fff;
    border-bottom: 1px solid #e0e0e0;

    .item-box{
        flex:1;
        text-align: center;
        padding: 15px 0;
        letter-spacing: 0.1em;
    }

    .item-link{
        text-decoration: none;
        color:#404040;

        &:hover{
            color:#40404080;
        }
    }

    .logout-button{
        user-select: none;
        text-decoration: none;
        color:#404040;
        cursor: pointer;

        &:hover{
            color:#40404080;
        }
    }
`;

const ItemWrapper = styled.div`
    user-select: none;
    &>.item-box:nth-child(1){
        padding-top:30px;
    }

    .item-box{
        padding:15px 25px;
    }

    .item-link{
        text-decoration: none;
        color:#404040;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.1em;

        &:hover{
            color:#40404080;
        }
    }
`;

const MenuButton = styled.button`
    position:relative;
    user-select: none;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 5px;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
    .icon{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:70%;
        height:70%;
    }
`;

export default function NavbarMain() {
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();
    const [menuOpen, setMenuOpen] = useState(false);

    const __handle = {
        action: {
            openMenu: () => {
                setMenuOpen(true);
            },
            closeMenu: () => {
                setMenuOpen(false);
            }
        }
    }

    const __userRdx = {
        req: {
            logout: async () => {
                await userDataConnect().logout()
                    .finally(() => {
                        customRouter.push({
                            pathname: '/',
                            replace: true
                        })
                    })
            }
        },
        submit: {
            logout: async () => {
                await __userRdx.req.logout();
            }
        }
    }

    return (
        <>
            <Container>
                <FirstContainer>
                    <LogoEl>
                        <LogoLink
                            to={'/'}
                            replace={false}
                        >
                            캠핑 렌탈
                        </LogoLink>
                    </LogoEl>
                    <MenuButton
                        type='button'
                        onClick={__handle.action.openMenu}
                    >
                        <img
                            className='icon'
                            src='/assets/icon/menu_default_white.svg'
                            alt='menu'
                        ></img>
                    </MenuButton>
                </FirstContainer>
            </Container>

            <SwipeableDrawer
                anchor={'right'}
                open={menuOpen}
                onClose={__handle.action.closeMenu}
                onOpen={__handle.action.openMenu}
            >
                <MenuWrapper>
                    {!userRdx.isLoading && !userRdx.userInfo &&
                        <UserWrapper>
                            <div className='item-box'>
                                <Link
                                    className='item-link'
                                    to={'/login'}
                                >
                                    로그인
                                </Link>
                            </div>
                            <div className='item-box'>
                                <Link
                                    className='item-link'
                                    to={'#'}
                                    style={{
                                        color: '#e0e0e0'
                                    }}
                                >
                                    회원가입(준비중)
                                </Link>
                            </div>
                        </UserWrapper>
                    }
                    {!userRdx.isLoading && userRdx.userInfo &&
                        <UserWrapper>
                            <div className='item-box'>
                                <Link
                                    className='item-link'
                                    // to={`/room?roomNo=${userRdx.userInfo.id}`}
                                    to='#'
                                    style={{
                                        color: '#e0e0e0'
                                    }}
                                >
                                    마이룸(준비중)
                                </Link>
                            </div>
                            <div className='item-box'>
                                <div
                                    className='logout-button'
                                    onClick={__userRdx.submit.logout}
                                >로그아웃</div>
                            </div>
                        </UserWrapper>
                    }
                    <ItemWrapper>
                        <div
                            className='item-box'
                        >
                            <Link
                                className='item-link'
                                to='/search/order'
                            >
                                주문 내역 조회
                            </Link>
                        </div>
                    </ItemWrapper>
                </MenuWrapper>
            </SwipeableDrawer>
        </>
    );
}