import FooterComponent from "../../component/footer/FooterComponent";
import NavbarMain from "../../component/navbar/NavbarMain";
import MainComponent from "../../component/room";

export default function RoomPage(props) {
    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}