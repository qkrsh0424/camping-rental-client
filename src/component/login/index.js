import { useEffect } from "react";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";
import FormFieldComponent from "./form-field/FormField.component";

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();

    return (
        <>
            <FormFieldComponent />
        </>
    );
}