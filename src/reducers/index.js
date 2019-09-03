import { combineReducers } from 'redux';
import users from './users';
import products from './products';
import authentication from './authentication'
import shoppingCart from './shoppingCart'
import order from './order'

export default combineReducers({
    products,
    users,
    authentication,
    shoppingCart,
    order
});