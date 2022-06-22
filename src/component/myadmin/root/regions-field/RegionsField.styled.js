import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

export const Wrapper = styled.div`
    padding:0 20px;
    border:1px solid #e0e0e0;
    border-radius: 5px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;
export const HeadWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    .title{
        font-size: 20px;
        font-weight: 500;

        @media all and (max-width:992px){
            font-size: 16px;
        }
    }

    .add-button{
        margin:0;
        width: 100px;
        border: none;
        background:#b39283;
        font-size: 14px;
        font-weight: 600;
        color:white;
        cursor: pointer;

        @media all and (max-width:992px){
            width: 60px;
            font-size: 12px;
        }
    }
`;

export const RegionListWrapper = styled.div`
    .region-box:nth-last-child(1){
        border-bottom: none;
    }

    .region-box{
        border-bottom: 1px solid #e0e0e0;
        padding:10px 0;
    }

    .region-content{
        font-size: 14px;
        color:#505050;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .region-button-wrapper{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .region-button{
        width: 100px;
        margin: 0;
        border:none;
        font-size: 14px;
        color:#505050;

        @media all and (max-width:992px){
            width: 60px;
            font-size: 12px;
        }
    }
`;

export const AddAndModifyModalWrapper = styled.div`
    .input-box{
        margin-top: 20px;
        padding:0 10px;
    }

    .input-label{
        font-size: 14px;
        font-weight: 500;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .input-item{
        box-sizing: border-box;
        width:100%;
        padding:10px;
        border:none;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 5px;
        font-size: 14px;

        @media all and (max-width:992px){
            font-size: 12px;
        }
        
        &:focus{
            outline:none;
            border-bottom: 1px solid #2c73d2;
        }

        &:read-only{
            cursor: pointer;
        }
    }

    .button-box{
        display: flex;
        margin-top: 20px;
    }

    .button-item{
        border:none;
        margin: 0;
        font-size: 14px;
    }
`;