import styled from 'styled-components';
import { GlobalCommonBodyContainer } from '../../../globalStyledComponent';

const Wrapper = styled.div`
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0.05em;

    @media all and (max-width: 992px){
        font-size: 24px;
    }
`;
export default function HeadFieldComponent(props) {
    return (
        <>
            <GlobalCommonBodyContainer>
                <Wrapper>
                    장바구니
                </Wrapper>
            </GlobalCommonBodyContainer>
        </>
    );
}