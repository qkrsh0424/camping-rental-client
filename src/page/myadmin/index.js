import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FooterComponent from "../../component/footer/FooterComponent";
import MainComponent from "../../component/myadmin/root";
import NavbarMain from "../../component/navbar/NavbarMain";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";

export default function MyadminPage(props) {
    const customRouter = useCustomRouterHook();
    const userRdx = useSelector(state => state.userRedux);

    useEffect(() => {
        if (customRouter.isReady && !userRdx.isLoading && !userRdx.userInfo) {
            customRouter.push({
                pathname: '/',
                replace: true
            })
            return;
        }
    }, [customRouter.isReady, userRdx]);

    return (
        <>
            <NavbarMain></NavbarMain>
            <MainComponent />
            <FooterComponent></FooterComponent>
        </>
    );
}