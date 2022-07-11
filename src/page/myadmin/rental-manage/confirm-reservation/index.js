import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/confirm-reservation";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManageConfirmReservationPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}