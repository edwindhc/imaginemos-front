import { GET_SHOPPINGCART, ADD_SHOPPINGCART, DELETE_SHOPPINGCART, REFRESH_SHOPPINGCART, GENERATE_ORDER } from './types';
import { shoppingCartService, orderService } from '../services';


export const getRefreshCart =  (id) =>  async dispatch => {
    try{
        dispatch({
            type: REFRESH_SHOPPINGCART,
            payload: id
        })
    }catch(err){
        console.log(err)
    }
}

// Get User

export const getShoppingCart =  () =>  async dispatch => {
    let request = await shoppingCartService.getShoppingCart()
    try{
        if (request) dispatch({
            type: GET_SHOPPINGCART,
            payload: request
        })
    }catch(err){
        console.log(err)
    }
}

export const addProduct =  (product) =>  async dispatch => {
    let request = await shoppingCartService.add(product)
    try{
        if (request){
            dispatch({
                type: ADD_SHOPPINGCART,
                payload: request.data
            })
        }
    }catch(err){
        console.log(err)
    }
}

export const deleteProduct =  (id) =>  async dispatch => {
    let request = await shoppingCartService.deleteProduct(id)
    try{
        if (request){
            const data = request.data;
            const totalToPay = request.totalToPay;
            dispatch({
                type: DELETE_SHOPPINGCART,
                payload: {data,delete:true,totalToPay}
            })
        }
    }catch(err){
        console.log(err)
    }
}

export const generateOrder =  (data) =>  async dispatch => {
    const { cart, totalToPay } = data
    let request = await orderService.generateOrder(cart, totalToPay)
    try{
        if (request){
            const data = request.data;
            const totalToPay = request.totalToPay;
            dispatch({
                type: GENERATE_ORDER,
                payload: {data,delete:true,totalToPay}
            })
        }
    }catch(err){
        console.log(err)
    }
}