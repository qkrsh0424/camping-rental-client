import FooterComponent from "../../../../component/footer/FooterComponent";
import MainComponent from "../../../../component/myadmin/rental-manage/picked-up";
import NavbarMain from "../../../../component/navbar/NavbarMain";

export default function MyadminRentalManagePickedUpPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}