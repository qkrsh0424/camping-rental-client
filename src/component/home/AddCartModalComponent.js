import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { numberFormatHandler } from '../../utils/numberFormatHandler';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`

`;

const TitleBox = styled.div`
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
        padding: 10px;
        box-sizing: border-box;
    }
`;

const SelectBox = styled.div`
    padding: 10px;

    .select-label{
        color: #555;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .select-item{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
`;


const ButtonBox = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    .cancel-btn{
        border: 1px solid #00000000;
        background: white;
        padding: 10px 5px;
        font-weight: 500;
        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const initialCartItemState = {
    id: null,
    itemId: null,
    itemName: null,
    categoryId: null,
    categoryName: null,
    price: null,
    discountRate: null,
    unit: '1'
};

const cartItemStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return {
                ...state,
                itemId: action.payload.id,
                itemName: action.payload.name,
                categoryId: action.payload.categoryId,
                categoryName: action.payload.categoryName,
                price: action.payload.price,
                discountRate: action.payload.discountRate,
                thumbnailFullUri: action.payload.thumbnailFullUri
            }
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return { ...state };
    }
}

const AddCartModalComponent = (props) => {
    const [cartItemState, dispatchCartItemState] = useReducer(cartItemStateReducer, initialCartItemState);

    useEffect(() => {
        if (!props.selectedItemState) {
            return;
        }
        dispatchCartItemState({
            type: 'INIT_DATA',
            payload: props.selectedItemState
        })
    }, [props.selectedItemState]);

    const _onChangeCartItemState = (e) => {
        dispatchCartItemState({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const _onAddCartSubmit = () => {
        let params = {
            ...cartItemState,
            id: uuidv4()
        }
        props._onAddCartSubmit(params);
    }

    return (
        <>
            <Container>
                <TitleBox>{props.selectedItemState?.name}</TitleBox>
                <SelectBox>
                    <div className='select-label'>?????? ?????? ??????</div>
                    <select
                        className='select-item'
                        value={cartItemState.unit || '1'}
                        name='unit'
                        onChange={(e) => _onChangeCartItemState(e)}
                    >
                        <option value='1'>1???</option>
                        <option value='2'>2???</option>
                        <option value='3'>3???</option>
                        <option value='4'>4???</option>
                        <option value='5'>5???</option>
                        <option value='6'>6???</option>
                        <option value='7'>7???</option>
                        <option value='8'>8???</option>
                        <option value='9'>9???</option>
                        <option value='10'>10???</option>
                    </select>
                </SelectBox>
                <ButtonBox>
                    <button type='button' className='cancel-btn' style={{ color: '#f36565' }} onClick={() => props._onAddCartModalClose()}>??????</button>
                    <button type='button' className='cancel-btn' onClick={() => _onAddCartSubmit()} style={{ color: '#379f37' }}>???????????? ??????</button>
                </ButtonBox>
            </Container>
        </>
    );
}
export default AddCartModalComponent;