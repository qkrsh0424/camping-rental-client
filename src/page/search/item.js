import styled from 'styled-components';
import NavbarMain from '../../component/navbar/NavbarMain';
import MainComponent from '../../component/search/item/MainComponent';

const Container = styled.div`

`;

const SearchItemPage = (props) => {
    return (
        <>
            <Container>
                <NavbarMain></NavbarMain>
                <MainComponent></MainComponent>
            </Container>
        </>
    );
}
export default SearchItemPage;