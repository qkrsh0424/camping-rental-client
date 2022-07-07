import React, { useEffect } from "react";
import MainComponent from "../../component/cart";
import FooterComponent from "../../component/footer/FooterComponent";
import NavbarMain from "../../component/navbar/NavbarMain";
import { useCartListLocalStorage } from "../../hooks/useCartListLocalStorage";

export default function CartPage(props) {
    return (
        <React.Fragment>
            <NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
            <FooterComponent></FooterComponent>
        </React.Fragment>
    );
}