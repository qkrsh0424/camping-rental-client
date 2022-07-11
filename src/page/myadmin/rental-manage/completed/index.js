import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/completed";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManageCompletedPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}