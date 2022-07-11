import styled from 'styled-components';

export const BrowserContainer = styled.div`
    display: block;

    @media all and (max-width:992px){
        display: none;
    }
`;

export const MobileContainer = styled.div`
    display: none;
    
    @media all and (max-width:992px){
        display: block;
    }
`;

export const PagenationContainer = styled.div`
    margin-top: 20px;
`;

export const BrowserButtonGroupWrapper = styled.div`
    display: flex;
`;

export const MobileButtonGroupWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
`;

export const TableWrapper = styled.div`
    padding:10px 0;
`;

export const TableBox = styled.div`
    overflow: auto;
    border: 1px solid #e0e0e0;
    min-height: 400px;
    max-height: 500px;

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:5px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead{
        
    }

    table thead th {
        height: 35px;

        box-sizing: border-box;
        padding:10px 5px;

        background:white;
        color: #333;
        font-weight: 600;
        position: sticky;
        top:0;
        border-bottom: 1px solid #e0e0e0;

        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        
    }

    table tbody tr{
        &:hover{
            background:#f8f8f8;

            .fixed-col-left {
                background:#f8f8f8;
            }
        }
    }

    table tbody td{
        height: 35px;

        box-sizing: border-box;
        padding:10px 5px;

        border-bottom: 1px solid #e0e0e0;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
    }

    table .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        border-right: 1px solid #e0e0e060;
        box-shadow: 6px 0 5px -7px #e0e0e0;
    }

    .status-button{
        height: 30px;
        width: 150px;
        padding:0;
        margin: auto;
        font-size: 12px;
    }

    @media only screen and (max-width:992px){
        min-height: 200px;
        max-height: 300px;
    }
`;

export const CardListWrapper = styled.div`

    .text-box:nth-child(1){
        margin-top: 0;
    }

    .text-box{
        font-size: 12px;
        margin-top: 5px;
    }
`;