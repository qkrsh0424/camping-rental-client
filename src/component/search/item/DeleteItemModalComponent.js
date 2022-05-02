import { useReducer } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const Container = styled.div`

`;

const Title = styled.div`
    padding: 10px;
    font-weight: 600;
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

    .delete-btn{
        width: 100%;
        padding: 10px;
        background: red;
        border: 1px solid #00000000;
        border-radius: 5px;
        color: white;
        font-weight: 600;

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

const DeleteItemModalComponent = (props) => {
    const [passwordState, dispatchPasswordState] = useReducer(passwordStateReducer, initialPasswordState);

    const _onChangePasswordState = (e) => {
        dispatchPasswordState({
            type: 'CHANGE_DATA',
            payload: e.target.value
        })
    }

    const _onDeleteSubmit = () => {
        let params = {
            itemId: props.selectedItemState?.id,
            password: passwordState
        }

        props._onDeleteItemSubmit(params);
    }

    return (
        <>
            <Container>
                <Title>[ {props.selectedItemState?.name} ] 를 삭제 합니다.</Title>
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
                    <button className='delete-btn' type='button' onClick={() => _onDeleteSubmit()}>삭제</button>
                </ButtonBox>
            </Container>
        </>
    );
}
export default DeleteItemModalComponent;