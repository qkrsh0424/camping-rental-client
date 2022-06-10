import styled from 'styled-components';
import NavbarMain from '../../component/navbar/NavbarMain';
import MainComponent from '../../component/search/order-v2';

const Container = styled.div`

`;

const SearchOrderPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <MainComponent></MainComponent>
            </Container>
        </>
    );
}
export default SearchOrderPage;