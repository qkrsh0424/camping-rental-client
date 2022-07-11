import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/cancelled";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManageCancelledPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}