import styled from 'styled-components';
import NavbarMain from '../component/navbar/NavbarMain';
import MainComponent from '../component/update/MainComponent';

const Container = styled.div`

`;

const UpdatePage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <MainComponent></MainComponent>
            </Container>
        </>
    );
}
export default UpdatePage;