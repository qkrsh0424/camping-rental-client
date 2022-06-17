import { userDataConnect } from "../../data_connect/userDataConnect";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";
import FormFieldComponent from "./form-field/FormField.component";

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();

    const __formValue = {
        req: {
            login: async (body) => {
                await userDataConnect().login(body)
                    .then(res => {
                        if (res.status === 200) {
                            customRouter.push({
                                pathname: '/',
                                replace: true
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if(!res){
                            alert('네트워크 연결이 원활하지 않습니다.')
                            return;
                        }

                        if(res.status === 500){
                            alert('undefined error.');
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            login: async (body) => {
                await __formValue.req.login(body);
            }
        }
    }

    return (
        <>
            <FormFieldComponent
                onSubmitLogin={__formValue.submit.login}
            />
        </>
    );
}