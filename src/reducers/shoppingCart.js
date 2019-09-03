import { GET_SHOPPINGCART, ADD_SHOPPINGCART, DELETE_SHOPPINGCART } from '../actions/types';

const initialState = {
    cart: [],
    delete: false,
    totalToPay: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SHOPPINGCART:
            return {
                ...state,
                cart: action.payload.data,
                totalToPay: action.payload.totalToPay,
            }
        case ADD_SHOPPINGCART:
            state.cart.push(action.payload)
            return {
                ...state,
                cart: action.payload
            }
        case DELETE_SHOPPINGCART:
            return {
                ...state,
                cart: action.payload.data,
                delete: action.payload.delete,
                totalToPay: action.payload.totalToPay
            }
        default:
            return state;
    }
}