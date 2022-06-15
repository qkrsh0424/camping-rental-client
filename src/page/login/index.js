import FooterComponent from "../../component/footer/FooterComponent";
import MainComponent from "../../component/login";
import NavbarMain from "../../component/navbar/NavbarMain";

export default function LoginPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}