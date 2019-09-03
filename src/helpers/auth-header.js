import {Service} from '../services/user.service'

export  function header(){
    if (Service.currentUser()){
        let user = Service.currentUser('token')
        if (user) {
            return { 'Authorization': `Bearer ${user}`};
        } else {
            return {};
        }
    }
 }