import styled from 'styled-components';
import { userDataConnect } from '../../data_connect/userDataConnect';
import { useCustomRouterHook } from '../../hooks/router/useCustomRouterHook';
import FormFieldComponent from './form-field/FormField.component';

const Container = styled.div`

`;

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();

    const __formValue = {
        req: {
            signup: async (body) => {
                await userDataConnect().signup(body)
                    .then(res => {
                        if (res.status === 200) {
                            customRouter.push({
                                pathname: '/login',
                                replace: true
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        if (res.status === 500) {
                            alert('undefined error.')
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        submit: {
            signup: async (body) => {
                await __formValue.req.signup(body);
            }
        }
    }
    return (
        <>
            <Container>
                <FormFieldComponent
                    onSubmitSignup={__formValue.submit.signup}
                />
            </Container>
        </>
    );
}