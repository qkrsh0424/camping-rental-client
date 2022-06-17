import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
    background:#f0f0f0;
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;

    border-radius: 5px;
    background:#ffffff;

    @media all and (max-width: 992px){
        width: 90%;
    }
`;

const FormGroup = styled.form`
    padding: 0 50px;

    @media all and (max-width: 992px){
        padding: 0 20px;
    }
    
    .submit-button{
        width: 100%;
        height: 48px;
        margin-top: 40px;
        margin-bottom: 40px;
        padding:0;

        background: #000000;
        border: none;

        font-size: 16px;
        font-weight: 600;
        color: white;

        transition: all .5s;
        
        &:hover{
            background: #808080;
        }

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
        }
    }
`;

const InputBox = styled.div`
    width: 100%;
    margin-top: 40px;

    .input-label{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #555;
    }

    .input-item{
        width: 100%;
        height: 48px;
        padding: 0 12px;

        border: 1px solid #e1e1e1;
        box-sizing: border-box;

        font-size: 15px;

        transition: all .5s;
        outline: none;
        &:hover{
            border: 1px solid #808080;
        }
        &:focus{
            border: 1px solid #808080;
        }
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }

    .valid-label{
        display:inline-block;
        margin-right:10px;
        padding:1px 5px;

        border:1px solid red;
        font-size: 12px;
        font-weight: 400;

        color:red;
    }

    .pass-valid-label{
        border:1px solid #50bb1a;
        color:#50bb1a;
    }
`;

export {
    Container,
    Wrapper,
    FormGroup,
    InputBox
}