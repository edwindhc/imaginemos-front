import axios from 'axios'
import {header} from '../helpers'

export const Service = {
    login,
    logout,
    register,
    currentUser
};

function currentUser(input = '') {
    let local = JSON.parse(localStorage.getItem('user'))
    if (local){
        if (input === 'rol' || input === 'role') return local.user.role
    if (input === 'id') return local.user.id
    if (input === 'token') return local.token.accessToken
    return local;
    }
}

async function login(email, password) {
    let request = await axios.post(`http://localhost:8080/login`, {email,password})
    if (request) {
        localStorage.setItem('user', JSON.stringify(request.data));
        header()
        return request.data;
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function register(email, password) {
    let request = await axios.post(`http://localhost:8080/register`, {email,password})
    if (request) {
        localStorage.setItem('user', JSON.stringify(request.data));
        return request.data;
    }
}

