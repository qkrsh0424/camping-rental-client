import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/confirm-order";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManageConfirmOrderPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}