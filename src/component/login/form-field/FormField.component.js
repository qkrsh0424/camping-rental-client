import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { userDataConnect } from '../../../data_connect/userDataConnect';
import { validationDataConnect } from '../../../data_connect/validationDataConnect';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';
import { useBasicSnackbarHook, BasicSnackbarHookComponent } from '../../../hooks/snackbar/useBasicSnackbarHook';
import { checkPasswordFormat, checkPhoneNumberFormat, checkUsernameFormat, comparePasswordFormat } from '../../../utils/regexUtils';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import { Container, FormGroup, InputBox, Wrapper } from './FormField.styled';

const initialFormValue = {
    username: '',
    password: '',
}

const formValueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return initialFormValue;
    }
}

export default function FormFieldComponent(props) {
    const customRouter = useCustomRouterHook();
    const {
        open: snackbarOpen,
        message: snackbarMessage,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar
    } = useBasicSnackbarHook();

    const [formValue, dispatchFormValue] = useReducer(formValueReducer, initialFormValue);

    const __formValue = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchFormValue({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        },
        submit: {
            login: (e) => {
                e.preventDefault();
                props.onSubmitLogin(formValue);
            }
        }
    }

    const __self = {
        action: {
            routeToSignup: () => {
                customRouter.push({
                    pathname: '/signup'
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <div
                        style={{
                            marginTop: '40px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: '18px',
                        }}
                    >
                        로그인
                    </div>
                    <FormGroup onSubmit={__formValue.submit.login}>
                        <InputBox>
                            <input
                                type='email'
                                className={`input-item`}
                                name='username'
                                defaultValue={formValue.username || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                placeholder={'아이디(이메일)'}
                                required
                            ></input>
                        </InputBox>
                        <InputBox
                            style={{
                                marginTop: 20
                            }}
                        >
                            <input
                                type='password'
                                className={`input-item`}
                                name='password'
                                value={formValue.password || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                placeholder={'패스워드'}
                                required
                            ></input>
                        </InputBox>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                fontSize: '13px',
                                color: '#808080',
                                marginTop: '10px',
                                textDecoration: 'underline'
                            }}
                        >
                            아이디/비밀번호 찾기
                        </div>
                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                        >
                            로그인
                        </SingleBlockButton>
                    </FormGroup>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '13px',
                            color: '#808080',
                            marginTop: '40px',
                            marginBottom: '40px'
                        }}
                    >
                        회원이 아니신가요? <span style={{ textDecoration: 'underline', cursor:'pointer' }} onClick={__self.action.routeToSignup}>회원가입</span>
                    </div>
                </Wrapper>
            </Container>

            {/* Snackbar */}
            {snackbarOpen &&
                <BasicSnackbarHookComponent
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={'warning'}
                    duration={4000}
                    onClose={onActionCloseSnackbar}
                />
            }
        </>
    );
}