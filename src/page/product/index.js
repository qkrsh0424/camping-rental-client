import FooterComponent from "../../component/footer/FooterComponent";
import NavbarMain from "../../component/navbar/NavbarMain";
import MainComponent from "../../component/product";

export default function ProductPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}