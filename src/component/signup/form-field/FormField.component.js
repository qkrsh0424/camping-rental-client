import { useEffect, useReducer, useState } from 'react';
import { validationDataConnect } from '../../../data_connect/validationDataConnect';
import { useBasicSnackbarHook, BasicSnackbarHookComponent } from '../../../hooks/snackbar/useBasicSnackbarHook';
import { checkPasswordFormat, comparePasswordFormat, checkEmailFormat, checkNicknameFormat } from '../../../utils/regexUtils';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import { Container, FormGroup, InputBox, Wrapper } from './FormField.styled';

const initialFormValue = {
    email: '',
    emailValidationCode: '',
    password: '',
    passwordChecker: '',
    nickname: ''
}

const initialFormValid = {
    email: false,
    emailValidationCode: false,
    password: false,
    passwordChecker: false,
    nickname: false
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

const formValidReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialFormValid
    }
}

const ValidTag = (props) => {
    return (<span className={`valid-label ${props.isValid === true ? 'pass-valid-label' : ''}`}>{props.children}</span>);
}

export default function FormFieldComponent(props) {
    const {
        open: snackbarOpen,
        message: snackbarMessage,
        onActionOpen: onActionOpenSnackbar,
        onActionClose: onActionCloseSnackbar
    } = useBasicSnackbarHook();

    const [formValue, dispatchFormValue] = useReducer(formValueReducer, initialFormValue);
    const [formValid, dispatchFormValid] = useReducer(formValidReducer, initialFormValid);
    const [activeEmailValidationCodeInput, setActiveEmailValidationCodeInput] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        let emailBool = __formValid.action.checkEmail();
        let emailValidationCodeBool = __formValid.action.checkEmailValidationCode();
        let passwordBool = __formValid.action.checkPassword();
        let passwordCheckerBool = false;
        let nicknameBool = __formValid.action.checkNickname();

        if (passwordBool) {
            passwordCheckerBool = __formValid.action.checkPasswordChecker();
        }

        dispatchFormValid({
            type: 'SET_DATA',
            payload: {
                ...formValid,
                email: emailBool,
                emailValidationCode: emailValidationCodeBool,
                password: passwordBool,
                passwordChecker: passwordCheckerBool,
                nickname: nicknameBool
            }
        })

    }, [
        formValue.email,
        formValue.emailValidationCode,
        formValue.password,
        formValue.passwordChecker,
        formValue.nickname,
    ]);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000)

        return () => clearTimeout(timeout);
    }, [disabledBtn])

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
            signup: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                if (disabledBtn) {
                    return;
                }

                if (!__formValid.return.canSubmit()) {
                    alert('???????????? ????????? ???????????? ???????????? ?????????.');
                    return;
                }
                props.onSubmitSignup(formValue);
            }
        }
    }

    const __formValid = {
        req: {
            sendEmailValidationCode: async () => {
                let email = formValue.email;

                await validationDataConnect().sendEmailValidationCode({ email })
                    .then(res => {
                        if (res.status === 200) {
                            setActiveEmailValidationCodeInput(true);
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
        action: {
            checkEmail: () => {
                let email = formValue.email;
                let bool = false;

                if (checkEmailFormat(email)) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            },
            checkEmailValidationCode: () => {
                let emailValidationCode = formValue.emailValidationCode;
                let bool = false;

                if (emailValidationCode.length === 6) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            },
            checkPassword: () => {
                let password = formValue.password;
                let bool = formValid.password;

                if (checkPasswordFormat(password)) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            },
            checkPasswordChecker: () => {
                let password = formValue.password;
                let passwordChecker = formValue.passwordChecker;
                let bool = formValid.passwordChecker;

                if (comparePasswordFormat(password, passwordChecker)) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            },
            checkNickname: () => {
                let nickname = formValue.nickname;
                let bool = false;

                if (checkNicknameFormat(nickname)) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            }
        },
        return: {
            canSubmit: () => {
                if (
                    formValid.email
                    && formValid.emailValidationCode
                    && formValid.password
                    && formValid.passwordChecker
                    && formValid.nickname
                ) {
                    return true;
                }
                return false;
            }
        },
        submit: {
            sendEmailValidationCode: () => {
                setDisabledBtn(true);

                if (disabledBtn) {
                    return;
                }

                if (!formValid.email) {
                    onActionOpenSnackbar('????????? ????????? ????????? ?????? ????????? ?????????.');
                    return;
                }
                __formValid.req.sendEmailValidationCode();
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
                        ????????????
                    </div>
                    <FormGroup onSubmit={__formValue.submit.signup}>
                        <InputBox>
                            <div
                                className='input-label'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >?????????(?????????)</div>
                                <ValidTag
                                    isValid={formValid.email}
                                >?????? ??????</ValidTag>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <input
                                    type='email'
                                    className={`input-item`}
                                    name='email'
                                    defaultValue={formValue.email || ''}
                                    onChange={(e) => __formValue.change.valueOfName(e)}
                                    placeholder={'????????? ????????? ????????? ?????????.'}
                                    required
                                ></input>
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        width: 150,
                                        height: 48,
                                        marginLeft: '5px'
                                    }}
                                    onClick={__formValid.submit.sendEmailValidationCode}
                                    disabled={!formValid.email || disabledBtn}
                                >
                                    ???????????? ??????
                                </SingleBlockButton>
                            </div>
                            {activeEmailValidationCodeInput &&
                                <div
                                    style={{
                                        marginTop: '10px'
                                    }}
                                >
                                    <input
                                        type='text'
                                        className={`input-item`}
                                        name='emailValidationCode'
                                        value={formValue.emailValidationCode || ''}
                                        placeholder="??????????????? ???????????????."
                                        onChange={(e) => __formValue.change.valueOfName(e)}
                                        minLength={6}
                                        maxLength={6}
                                        required
                                    ></input>
                                    <div className='input-notice'>??????????????? ??????????????????.(???????????? 30???)</div>
                                    <div className='input-notice'>??????????????? ?????? ????????? ???????????? ????????? ???????????? ???????????? ?????????.</div>
                                    <div className='input-notice' style={{ color: 'red' }}>?????? ????????? ???????????? ??????????????? ?????? ??? ????????????.</div>
                                    <div className='input-notice' style={{ color: 'red' }}>??????????????? ????????? ?????? ?????? ?????? ?????? ???????????? ???????????? ?????????.</div>
                                </div>
                            }
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >????????????</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.password}
                                    >?????? ??????</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='password'
                                value={formValue.password || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                placeholder={'??????, ??????, ???????????? ?????? 8-50???'}
                                minLength={8}
                                maxLength={50}
                                required
                            ></input>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >???????????? ??????</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.passwordChecker}
                                    >???????????? ??????</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='passwordChecker'
                                value={formValue.passwordChecker || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                minLength={8}
                                maxLength={50}
                                required
                            ></input>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >?????????(????????? ??????)</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.nickname}
                                    >?????? ??????</ValidTag>
                                </div>
                            </div>
                            <input
                                type='text'
                                className={`input-item`}
                                name='nickname'
                                value={formValue.nickname || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                placeholder={'2??? ?????? 15??? ????????? ????????? ?????????.'}
                                minLength={2}
                                maxLength={15}
                                required
                            ></input>
                        </InputBox>

                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                            disabled={!__formValid.return.canSubmit() || disabledBtn}
                        >
                            ????????????
                        </SingleBlockButton>
                    </FormGroup>
                </Wrapper>
            </Container>

            {/* Snackbar */}
            {
                snackbarOpen &&
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