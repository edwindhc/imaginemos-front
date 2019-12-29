import { GET_USERS } from '../actions/types';
import { LOGIN_USERS } from '../actions/types';

const initialState = {
    users: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
            }
            case LOGIN_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}