import { GET_ORDERS } from './types';
import { orderService } from '../services';

// Get My Orders

export const getMyOrders =  () =>  async dispatch => {
    let request = await orderService.getMyOrders()
    try{
        if (request) dispatch({
            type: GET_ORDERS,
            payload: request.data
        })
    }catch(err){
        console.log(err)
    }
}