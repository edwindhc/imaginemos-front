import axios from 'axios';
import { GET_PRODUCTS } from './types';

// Get User

export const getProducts =  (perPage = 0, currentPage, name, category) =>  async dispatch => {
    let products = await axios.get(`http://localhost:8080/products?perPage=${perPage}&page=${currentPage}${name ? '&name='+ name : ''}${category ? '&category='+category : ''}`);
    try{
        if (products) dispatch({
            type: GET_PRODUCTS,
            payload: products.data
        })
    }catch(err){
        console.log(err)
    }
}