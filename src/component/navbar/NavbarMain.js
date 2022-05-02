import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { throttle } from 'lodash';

const Container = styled.div`
    
    .nav-none{
        background: #00000000;
        transition: all .3s;
    }

    .nav-block{
        background:#b39283;
        transition: all .3s;
    }
`;

const FirstContainer = styled.div`
    overflow: hidden;
    position:fixed;
    left: 20px;
    z-index: 99;
    /* background:linear-gradient(70deg, #00B8BA, #31CEAE);
    background: -webkit-linear-gradient(70deg, #00B8BA, #31CEAE); */
    width: 120px;
    height:64px;

    &:hover{
        background:#b39283;
    }

    @media all and (max-width:992px){
        width: 60px;
    }
`;

const LogoEl = styled.div`
    /* position:absolute;
    left:20px;
    top:50%;
    transform: translate(0,-50%); */
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    text-align: center;
    width: 100%;
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
    color:white;
    &:hover{
        color:#ffffff80;
    }
`;

export default function NavbarMain() {
    const [scrollY, setScrollY] = useState(window.scrollY);

    const throttledScroll = useMemo(
        () =>
            throttle(() => {
                setScrollY(window.scrollY);
            }, 300),
        []
    );

    useEffect(() => {
        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, []);

    return (
        <>
            <Container>
                <FirstContainer
                    className={`${scrollY > 64 ? 'nav-block' : 'nav-none'}`}
                >
                    <LogoEl>
                        <LogoLink
                            to={'/'}
                            replace={false}
                        >
                            캠핑 렌탈
                        </LogoLink>
                    </LogoEl>
                </FirstContainer>
            </Container>
        </>
    );
}