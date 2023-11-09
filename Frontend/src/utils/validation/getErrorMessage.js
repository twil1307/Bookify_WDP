import accountValidation, { types } from './accountValidation';

function getUsernameErrorMessage(isSignIn = false) {
    return (
        isSignIn ?
        'Username required' :
        'Username must be at least 5 characters' 
    )
}

function getEmailErrorMessage() {
    return 'Email must follow abc@email.xyz'
}

function getPasswordErrorMessage(isSignIn = false) {
    return (
        isSignIn ?
        'Password required' :
        'Password must be at least 8 characters')
}

function getRePasswordErrorMessage() {
    return 'Re-Password is not matched'
}

function getErrorMessage(type, isSignIn = false) {
    switch(type) {
        case types.USERNAME: 
            return getUsernameErrorMessage(isSignIn);
        case types.EMAIL:
            return getEmailErrorMessage();
        case types.PASSWORD:
            return getPasswordErrorMessage(isSignIn);
        case types.RE_PASSWORD:
            return getRePasswordErrorMessage();
        case "Card Number":
            return "Số tài khoản không hợp lệ"
        default:
            throw new Error("Invalidation");
            
    }
}

export default getErrorMessage;