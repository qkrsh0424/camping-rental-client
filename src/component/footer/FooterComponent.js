import styled from 'styled-components';

const Container = styled.div`
    border-top: 1px solid #e1e1e1;
    height: 150px;
    padding: 8px;
    color: #666;
    font-size: 14px;
    font-weight: 600;
`;

const FooterComponent = (props) => {
    return (
        <>
            <Container>
                고객센터 : 010-5003-6206
            </Container>
        </>
    );
}
export default FooterComponent;