import styled from 'styled-components';

const Container = styled.div`
    /* margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    } */
`;

const Wrapper = styled.div`
    display: flex;

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

export default function InfoLayout(props) {
    return (
        <>
            <Container>
                <Wrapper>
                    {props.children}
                </Wrapper>
            </Container>
        </>
    );
}