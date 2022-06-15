import FooterComponent from "../../component/footer/FooterComponent";
import NavbarMain from "../../component/navbar/NavbarMain";
import MainComponent from "../../component/signup";

export default function SignupPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}