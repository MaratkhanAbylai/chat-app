export function isValidLogin(login) {
    return login.length >= 3;
}

export function isValidPassword(password) {
    return password.length >= 6;
}