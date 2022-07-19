import styled from 'styled-components';
import FooterComponent from '../../component/footer/FooterComponent';
import NavbarMain from '../../component/navbar/NavbarMain';
import MainComponent from '../../component/search/order-v3';

const Container = styled.div`

`;

const SearchOrderPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <MainComponent></MainComponent>
                <FooterComponent></FooterComponent>
            </Container>
        </>
    );
}
export default SearchOrderPage;