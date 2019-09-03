import { GET_ORDERS, GENERATE_ORDER } from '../actions/types';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        case GENERATE_ORDER:
            return {
                ...state,
            }
        default:
            return state;
    }
}