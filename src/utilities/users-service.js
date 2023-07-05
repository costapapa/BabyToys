import * as usersAPI from "./users-api";

export async function signUp(userData){
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export function getToken() {
    //get Item will retur null if the key does not exist
    const token = localStorage.getItem('token')
    if(!token) return null
    //obtain payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]))
    // A jwt exp is expressed in second, not miliscnds, so convert
    if (payload.exp * 1000 < Date.now()) {
        //token has expired
        localStorage.removeItem('token')
        return null
    }
    return token
}

export function getUser() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function checkToken() {
    //cant forget how to use .then for promises
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}
