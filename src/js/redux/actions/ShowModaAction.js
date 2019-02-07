import * as type from '../constants/actionTypes';

export default function showModalAction(payload){
    return{
        type: type.SHOW_MODAL,
        payload
    }
}