import styled from 'styled-components';
import NavbarMain from '../component/navbar/NavbarMain';
import MainComponent from '../component/write/MainComponent';

const Container = styled.div`

`;

const WritePage = (props) => {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
        </>
    );
}
export default WritePage;