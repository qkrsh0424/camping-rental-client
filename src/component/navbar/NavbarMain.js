import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';
import { userDataConnect } from '../../data_connect/userDataConnect';
import { useCustomRouterHook } from '../../hooks/router/useCustomRouterHook';

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


const TextLink = styled(Link)`
    text-decoration: none;
    color:white;
    &:hover{
        color:#ffffff80;
    }
`;

const LogoutButton = styled.div`
    user-select: none;
    text-decoration: none;
    color:white;
    cursor: pointer;
    &:hover{
        color:#ffffff80;
    }
`;

const UserWrapper = styled.div`
    display: flex;

    font-size: 14px;
    font-weight: 600;
    color:white;
`;

export default function NavbarMain() {
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();

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
                        <TextLink
                            to={'/'}
                            replace={false}
                        >
                            캠핑 렌탈
                        </TextLink>
                    </LogoEl>
                    {!userRdx.isLoading && !userRdx.userInfo &&
                        <UserWrapper>
                            <TextLink
                                to={'/login'}
                                style={{
                                    marginRight: '10px'
                                }}
                            >로그인</TextLink>
                            <TextLink
                                to={'/signup'}
                            >회원가입</TextLink>
                        </UserWrapper>
                    }
                    {!userRdx.isLoading && userRdx.userInfo &&
                        <UserWrapper>
                            <LogoutButton onClick={__userRdx.submit.logout}>로그아웃</LogoutButton>
                        </UserWrapper>
                    }
                </FirstContainer>
            </Container>
        </>
    );
}