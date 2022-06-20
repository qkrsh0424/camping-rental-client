const checkUsernameFormat = (username) => {
    if (username.length < 5 || username.length > 20) {
        return false;
    }

    var regex = /^[a-z]([._a-z0-9]){3,18}[._a-z0-9]$/g;
    return regex.test(username);
}

const checkNicknameFormat = (nickname) => {
    if (nickname.length < 2 || nickname.length > 15) {
        return false;
    }
    return true;
}

const checkNameFormat = (name) => {
    if (name.length > 15) {
        return false;
    }
    return true;
}

const comparePasswordFormat = (password, passwordCheck) => {
    if (password !== passwordCheck) {
        return false;
    } else {
        return true;
    }

}

const checkPasswordFormat = (password) => {
    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/ig);
    var spe = password.search(/[\\!@#$%^&*()\-_=+[\]{};:`"',.<>/?|~]/gi);

    if (password.length < 8 || password.length > 50) { // 글자수 제한
        return false;
    } else if (password.search(/\s/) !== -1) { // 공백 체크
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) { // 영문, 숫자, 특수문자 혼합 체크
        return false;
    } else {
        return true;
    }
}

const checkPhoneNumberFormat = (phoneNumber) => {
    // let regex = /^01([0|1|6|7|8|9])[-.]?([0-9]{3,4})[-.]?([0-9]{4})$/;
    let regex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    return regex.test(phoneNumber);
}

const checkEmailFormat = (email) => {
    let regex = /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    return regex.test(email);
}

export {
    checkUsernameFormat,
    checkNicknameFormat,
    checkNameFormat,
    comparePasswordFormat,
    checkPasswordFormat,
    checkPhoneNumberFormat,
    checkEmailFormat
}