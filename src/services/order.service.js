import axios from 'axios'
import {header} from '../helpers'
import { Service } from './user.service'

export const orderService = {
    add,
    getMyOrders,
    generateOrder
};

 let config = {
    headers: header()
};

async function getMyOrders(query) {
    let request = await axios.get(`http://localhost:8080/orders?userId=${Service.currentUser('id')}`, config)
    if (request) {
        return request.data;
    }
}

async function generateOrder(cart, total) {
    let factor = cart.map(r => {
        return {
            name: r._doc.name,
            price: r._doc.price,
            userId: r.userId
        }
    })
    let request = await axios.post(`http://localhost:8080/orders`,{cart: factor, total, userId: Service.currentUser('id')}, config)
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

