import styled from 'styled-components';
import TextField from '@mui/material/TextField';

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

        &:focus{
            outline: none;
        }
    }
`;

const SearchOperatorComponent = (props) => {

    const onSubmitSearchOrders = (e) => {
        e.preventDefault();
        props.onSubmitSearchOrderList()
    }

    return (
        <>
            <Container>
                <form onSubmit={onSubmitSearchOrders}>
                    <InputBox>
                        <TextField
                            type='password'
                            className='input-item'
                            label='접근번호'
                            placeholder=''
                            value={props.password || ''}
                            onChange={(e) => props.onChangePassword(e)}
                        ></TextField>
                    </InputBox>
                    <ButtonBox>
                        <button type='submit' className='button-item'>조회하기</button>
                    </ButtonBox>
                </form>
            </Container>
        </>
    );
}
export default SearchOperatorComponent;