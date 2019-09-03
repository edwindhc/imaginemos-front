import { GET_USERS, GET_USER, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from './types';
import { Service } from '../services';


// Get User

export const getUsers = () =>  async dispatch => {
    try{
        dispatch({
            type: GET_USERS
        })
    }catch(err){
        console.log(err)
    }
}

export const registerUser = (user) =>  async dispatch => {
    let register = await Service.register(user.email, user.password)
    if (register) dispatch({
        type: REGISTER_SUCCESS,
        payload: register
    })
}

export const loginUser = (user) =>  async dispatch => {
    let login = await Service.login(user.email, user.password)
    if (login) dispatch({
        type: LOGIN_SUCCESS,
        payload: login
    })
}

export const logout = () => dispatch => {
    Service.logout();
    return dispatch({
        type: LOGOUT,
        payload: {}
    })
}

export const getUser = () =>  async dispatch => {
    try{
        dispatch({
            type: GET_USER
        })
    }catch(err){
        console.log(err)
    }
}