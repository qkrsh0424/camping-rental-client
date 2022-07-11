import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/new-order";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManageNewOrderPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}