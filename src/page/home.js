import React from 'react';
import styled from 'styled-components';
import MainComponent from '../component/home-v2';
import NavbarMain from '../component/navbar/NavbarMain';
import FooterComponent from '../component/footer/FooterComponent';

const Container = styled.div`

`;

const HomePage = (props) => {
    return (
        <React.Fragment>
            <NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
            <FooterComponent></FooterComponent>
        </React.Fragment>
    );
}
export default HomePage;