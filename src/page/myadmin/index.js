import FooterComponent from "../../component/footer/FooterComponent";
import MainComponent from "../../component/myadmin/root";
import NavbarMain from "../../component/navbar/NavbarMain";

export default function MyadminPage(props){
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}