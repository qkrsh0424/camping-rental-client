import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterComponent from "../../component/footer/FooterComponent";
import NavbarMain from "../../component/navbar/NavbarMain";
import MainComponent from "../../component/signup";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";

export default function SignupPage(props) {
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();

    useEffect(() => {
        if (!userRdx.isLoading && userRdx.userInfo) {
            customRouter.push({
                pathname: '/',
                replace: true
            })
        }
    }, [userRdx.userInfo, userRdx.isLoading]);


    return (
        <>
            <NavbarMain></NavbarMain>
            {(!userRdx.isLoading && !userRdx.userInfo) &&
                <>
                    <MainComponent />
                    <FooterComponent></FooterComponent>
                </>
            }
        </>
    );
}