import { getToken } from './users-service'

export default async function sendRequest(url, method = 'GET', payload = null) {
    //fet accepts an options opbject as the 2nd arg
    // use to include data payload set head , specifiy method
    const options = { method}
    if (payload) {
        options.headers = { 'Content-Type': 'application/json'}
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if (token) {
        //need to add an authorisation header
        //use the logical or Assignment operation
        options.headers ||= {}
        options.headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, options)
    //if res.ok is false then something went wrong
    if (res.ok) return res.json()
    throw new Error('Bad Request')
}