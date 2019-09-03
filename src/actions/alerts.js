import { ALERT } from './types';

export const textAlert = (message) => dispatch => {
    return dispatch({
        type: ALERT,
        payload: message
    })
}