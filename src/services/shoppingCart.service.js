import axios from 'axios'
import {header} from '../helpers'
import { Service } from './user.service'

export const shoppingCartService = {
    add,
    getShoppingCart,
    deleteProduct
};

 let config = {
    headers: header()
};

const url = 'http://localhost:8080/';

async function getShoppingCart(product) {
    let local = JSON.parse(localStorage.getItem('user'))
    let request = await axios.get(`${url}shoppingCart?userId=${Service.currentUser('id')}`, {headers: {'Authorization': `Bearer ${local.token.accessToken}`}})
    if (request) {
        return request.data;
    }
}

async function add(product, user) {
    let local = JSON.parse(localStorage.getItem('user'))
    let data = await axios.get(`${url}products/${product.id}`, {headers: {'Authorization': `Bearer ${local.token.accessToken}`}})
    await axios.post(`${url}shoppingCart`, {productId: data.data.id, userId: Service.currentUser('id')}, {headers: {'Authorization': `Bearer ${local.token.accessToken}`}})
    const request = await axios.get(`${url}shoppingCart?userId=${Service.currentUser('id')}`, {headers: {'Authorization': `Bearer ${local.token.accessToken}`}})
    if (request) {
        return request.data;
    }
}

async function deleteProduct(id) {
    let request = await axios.delete(`${url}shoppingCart/${id}`, config)
    if ( request) {
        let getShoppingCart = await axios.get(`${url}shoppingCart?userId=${Service.currentUser('id')}`, config)
        if (getShoppingCart) {
            return getShoppingCart.data;
        }
    }
}

