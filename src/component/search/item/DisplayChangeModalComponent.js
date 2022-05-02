import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

const SelectBox = styled.div`
    padding: 10px;
`;

const ButtonBox = styled.div`
    padding: 10px;

    .common-btn{
        width: 100%;
        padding: 10px;
        background: #5c5ce5;
        border: 1px solid #00000000;
        border-radius: 5px;
        color: white;
        font-weight: 600;

        cursor: pointer;
    }
`;

const initialPasswordState = null;
const initialItemState = null;

const passwordStateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            return action.payload;
        default: return null;
    }
}

const itemStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return null;
    }
}

const DisplayChangeModalComponent = (props) => {
    const [passwordState, dispatchPasswordState] = useReducer(passwordStateReducer, initialPasswordState);
    const [itemState, dispatchItemState] = useReducer(itemStateReducer, initialItemState);

    useEffect(() => {
        if (!props.selectedItemState) {
            return;
        }
        dispatchItemState({
            type: 'INIT_DATA',
            payload: props.selectedItemState
        })

    }, [props.selectedItemState])
    
    const _onChangePasswordState = (e) => {
        dispatchPasswordState({
            type: 'CHANGE_DATA',
            payload: e.target.value
        })
    }

    const _onChangeItemState = (e) => {
        dispatchItemState({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const _onUpdateSubmit = () => {
        let params = {
            itemDto: itemState,
            password: passwordState
        }

        props._onSubmit(params);
    }

    return (
        <>
            {itemState &&
                <Container>
                    <Title>[ {itemState?.name} ]</Title>
                    <SelectBox>
                        <FormControl fullWidth>
                            <InputLabel>전시상태</InputLabel>
                            <Select
                                value={itemState?.displayYn || 'y'}
                                label="전시상태"
                                name='displayYn'
                                onChange={(e) => _onChangeItemState(e)}
                            >
                                <MenuItem value={'y'}>ON</MenuItem>
                                <MenuItem value={'n'}>OFF</MenuItem>
                            </Select>
                        </FormControl>
                    </SelectBox>
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
                        <button className='common-btn' type='button' onClick={() => _onUpdateSubmit()}>변경사항 저장</button>
                    </ButtonBox>
                </Container>
            }

        </>
    );
}
export default DisplayChangeModalComponent;