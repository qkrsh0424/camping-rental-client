import { style } from '@mui/system';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height:48px;
    /* border:1px solid #e0e0e0; */
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%);
    /* background: linear-gradient(to right, #000 8%, #f4f4f4 38%, #fafafa 54%); */
    background-size: 1000px 640px;
    
    position: relative;

    @keyframes placeHolderShimmer{
        0%{
            background-position: -468px 0
        }
        100%{
            background-position: 468px 0
        }
    }
`;

export default function ElementLoading({ style, ...props }) {
    return (
        <>
            <Container style={{ ...style }}>
            </Container>
        </>
    );
}