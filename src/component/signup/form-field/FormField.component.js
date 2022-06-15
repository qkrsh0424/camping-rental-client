import { useEffect, useReducer, useState } from 'react';
import { userDataConnect } from '../../../data_connect/userDataConnect';
import { validationDataConnect } from '../../../data_connect/validationDataConnect';
import { useBasicSnackbarHook, BasicSnackbarHookComponent } from '../../../hooks/snackbar/useBasicSnackbarHook';
import { checkPasswordFormat, checkPhoneNumberFormat, checkUsernameFormat, comparePasswordFormat } from '../../../utils/regexUtils';
import SingleBlockButton from '../../module/button/SingleBlockButton';
import { Container, FormGroup, InputBox, Wrapper } from './FormField.styled';

const initialFormValue = {
    username: '',
    password: '',
    passwordChecker: '',
    phoneNumber: '',
    phoneNumberValidationCode: '',
}

const initialFormValid = {
    username: false,
    password: false,
    passwordChecker: false,
    phoneNumber: false,
    phoneNumberValidationCode: false,
    usernameNotDuplicated: false,
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
    const [activePhoneNumberValidationCodeInput, setActivePhoneNumberValidationCodeInput] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        let usernameBool = __formValid.action.checkUsername();

        dispatchFormValid({
            type: 'SET_DATA',
            payload: {
                ...formValid,
                username: usernameBool,
                usernameNotDuplicated: false
            }
        })

    }, [
        formValue.username
    ]);

    useEffect(() => {
        let passwordBool = __formValid.action.checkPassword();
        let phoneNumberBool = __formValid.action.checkPhoneNumber();
        let passwordCheckerBool = false;
        let phoneNumberValidationCodeBool = __formValid.action.checkPhoneNumberValidationCode();

        if (passwordBool) {
            passwordCheckerBool = __formValid.action.checkPasswordChecker();
        }

        dispatchFormValid({
            type: 'SET_DATA',
            payload: {
                ...formValid,
                password: passwordBool,
                passwordChecker: passwordCheckerBool,
                phoneNumber: phoneNumberBool,
                phoneNumberValidationCode: phoneNumberValidationCodeBool
            }
        })

    }, [
        formValue.password,
        formValue.passwordChecker,
        formValue.nickname,
        formValue.phoneNumber,
        formValue.phoneNumberValidationCode
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
                    alert('입력하신 정보가 정확한지 확인하여 주세요.');
                    return;
                }
                props.onSubmitSignup(formValue);
            }
        }
    }

    const __formValid = {
        req: {
            checkDuplicateUsername: async () => {
                let username = formValue.username;

                await userDataConnect().checkDuplicateUsername({ username })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchFormValid({
                                type: 'SET_DATA',
                                payload: {
                                    ...formValid,
                                    usernameNotDuplicated: true
                                }
                            })
                        }
                    })
                    .catch(err => {
                        // console.clear();
                        let res = err.response;

                        dispatchFormValid({
                            type: 'SET_DATA',
                            payload: {
                                ...formValid,
                                usernameNotDuplicated: false
                            }
                        });

                        if (res.data?.memo) {
                            onActionOpenSnackbar(res.data.memo);
                        }
                    })
            },
            sendPhoneValidationCode: async () => {
                let phoneNumber = formValue.phoneNumber;

                await validationDataConnect().sendPhoneValidationCode({ phoneNumber })
                    .then(res => {
                        if (res.status === 200) {
                            setActivePhoneNumberValidationCodeInput(true);
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
            checkUsername: () => {
                let value = formValue.username;
                let bool = false;

                if (checkUsernameFormat(value)) {
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
            checkPhoneNumber: () => {
                let phoneNumber = formValue.phoneNumber;
                let bool = false;

                if (checkPhoneNumberFormat(phoneNumber)) {
                    bool = true;
                } else {
                    bool = false;
                }

                return bool;
            },
            checkPhoneNumberValidationCode: () => {
                let phoneNumberValidationCode = formValue.phoneNumberValidationCode;
                let bool = false;

                if (phoneNumberValidationCode.length > 0) {
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
                    formValid.username
                    && formValid.password
                    && formValid.passwordChecker
                    && formValid.phoneNumber
                    && formValid.phoneNumberValidationCode
                    && formValid.usernameNotDuplicated
                ) {
                    return true;
                }
                return false;
            }
        },
        submit: {
            checkDuplicateUsername: () => {
                setDisabledBtn(true);

                if (disabledBtn) {
                    return;
                }

                if (!formValid.username) {
                    onActionOpenSnackbar('아이디 형식에 맞게 입력해 주세요.');
                    return;
                }
                __formValid.req.checkDuplicateUsername();
            },
            sendPhoneValidationCode: () => {
                setDisabledBtn(true);

                if (disabledBtn) {
                    return;
                }
                
                if (!formValid.phoneNumber) {
                    onActionOpenSnackbar('휴대전화를 형식에 맞게 입력해 주세요.');
                    return;
                }
                __formValid.req.sendPhoneValidationCode();
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
                        회원가입
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
                                >아이디</div>
                                <ValidTag
                                    isValid={formValid.username}
                                >형식 체크</ValidTag>
                                <ValidTag
                                    isValid={formValid.usernameNotDuplicated}
                                >중복 체크</ValidTag>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <input
                                    type='text'
                                    className={`input-item`}
                                    name='username'
                                    defaultValue={formValue.username || ''}
                                    onChange={(e) => __formValue.change.valueOfName(e)}
                                    placeholder={'영문, 숫자 최소 5-20자'}

                                ></input>
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        width: 150,
                                        height: 48,
                                        marginLeft: '5px'
                                    }}
                                    onClick={__formValid.submit.checkDuplicateUsername}
                                    disabled={!formValid.username || disabledBtn}
                                >
                                    중복 체크
                                </SingleBlockButton>
                            </div>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >패스워드</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.password}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='password'
                                value={formValue.password || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
                                placeholder={'영문, 숫자, 특수문자 혼합 8-50자'}
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
                                >패스워드 확인</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.passwordChecker}
                                    >패스워드 확인</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='passwordChecker'
                                value={formValue.passwordChecker || ''}
                                onChange={(e) => __formValue.change.valueOfName(e)}
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
                                >휴대전화</div>
                                <div>
                                    <ValidTag
                                        isValid={formValid.phoneNumber}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <input
                                    type='text'
                                    className={`input-item`}
                                    name='phoneNumber'
                                    value={formValue.phoneNumber || ''}
                                    placeholder="'-'표 없이 입력해 주세요."
                                    onChange={(e) => __formValue.change.valueOfName(e)}
                                ></input>
                                <SingleBlockButton
                                    type='button'
                                    style={{
                                        margin: 0,
                                        width: 150,
                                        height: 48,
                                        marginLeft: '5px'
                                    }}
                                    onClick={__formValid.submit.sendPhoneValidationCode}
                                    disabled={!formValid.phoneNumber || disabledBtn}
                                >
                                    인증번호 받기
                                </SingleBlockButton>
                            </div>
                            {activePhoneNumberValidationCodeInput &&
                                <div
                                    style={{
                                        marginTop: '10px'
                                    }}
                                >
                                    <input
                                        type='text'
                                        className={`input-item`}
                                        name='phoneNumberValidationCode'
                                        value={formValue.phoneNumberValidationCode || ''}
                                        placeholder="인증번호를 입력하세요."
                                        onChange={(e) => __formValue.change.valueOfName(e)}
                                    ></input>
                                    <div className='input-notice'>인증번호를 발송했습니다.(유효시간 30분)</div>
                                    <div className='input-notice'>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                    <div className='input-notice'>이미 가입된 번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.</div>
                                </div>
                            }
                        </InputBox>

                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                            disabled={!__formValid.return.canSubmit() || disabledBtn}
                        >
                            회원가입
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