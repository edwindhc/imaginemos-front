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



async function getShoppingCart(product) {
    let request = await axios.get(`http://localhost:8080/shoppingCart?userId=${Service.currentUser('id')}`, config)
    if (request) {
        return request.data;
    }
}

async function add(product) {
    let data = await axios.get(`http://localhost:8080/products/${product.id}`, config)
    await axios.post(`http://localhost:8080/shoppingCart`, {productId: data.data.id, userId: Service.currentUser('id')}, config)
    const request = await axios.get(`http://localhost:8080/shoppingCart?userId=${Service.currentUser('id')}`, config)
    if (request) {
        return request.data;
    }
}

async function deleteProduct(id) {
    let request = await axios.delete(`http://localhost:8080/shoppingCart/${id}`, config)
    if ( request) {
        let getShoppingCart = await axios.get(`http://localhost:8080/shoppingCart?userId=${Service.currentUser('id')}`, config)
        if (getShoppingCart) {
            return getShoppingCart.data;
        }
    }
}

