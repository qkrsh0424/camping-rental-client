import { useSelector } from "react-redux";
import { useCustomRouterHook } from "../../../hooks/router/useCustomRouterHook";
import styled from 'styled-components';

export default function PrivateField(props) {
    const customRouter = useCustomRouterHook();
    const userRdx = useSelector(state => state.userRedux);

    if (customRouter.isReady && !userRdx.isLoading && userRdx.userInfo) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return <div style={{margin:'200px 0'}}></div>;
    }
}