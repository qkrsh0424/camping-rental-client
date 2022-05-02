import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { useEffect, useReducer, useState } from 'react';

const Container = styled.div`

`;

const InputBox = styled.div`
    padding: 10px;

    .input-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .input-item{
        width: 100%;
    }
`;

const ButtonBox = styled.div`
    padding: 10px;

    .button-item{
        width:100%;
        padding: 16px;

        background: #00B8BA;
        border: 1px solid #00B8BA;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color:white;

        cursor: pointer;
    }
`;

const initialPasswordState = null;

const passwordStateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            return action.payload;
        default: return null;
    }
}
const AccessInfoComponent = (props) => {
    const [passwordState, dispatchPasswordState] = useReducer(passwordStateReducer, initialPasswordState);

    const _onChangePasswordState = (e) => {
        dispatchPasswordState({
            type: 'CHANGE_DATA',
            payload: e.target.value
        })
    }

    return (
        <>
            <Container>
                <InputBox>
                    <TextField
                        type='password'
                        className='input-item'
                        label='접근번호'
                        placeholder=''
                        value={passwordState || ''}
                        onChange={(e) => _onChangePasswordState(e)}
                    ></TextField>
                </InputBox>
                <ButtonBox>
                    <button type='button' className='button-item' onClick={() => props._onSearchOrders(passwordState)}>조회하기</button>
                </ButtonBox>
            </Container>
        </>
    );
}
export default AccessInfoComponent;