import { useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Ripple from "../../module/button/Ripple";
import CommonModalComponent from "../../module/modal/CommonModalComponent";

const Container = styled.div`
    position:relative;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e0e0e0;
    padding: 30px 0;
    align-items:center;

    @media all and (max-width: 992px){
        padding: 10px 0;
    }
`;

const Title = styled.div`
    padding: 10px 20px;
    font-size: 24px;
    font-weight: 500;

    @media all and (max-width: 992px){
        padding: 10px 10px;
        font-size: 20px;
    }
`;


export default function HeadFieldComponent(props) {
    const userRdx = useSelector(state => state.userRedux);

    return (
        <>
            <Container>
                <Title>
                    {userRdx.userInfo?.nickname}
                </Title>
            </Container>
        </>
    );
}