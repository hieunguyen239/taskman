import * as type from '../constants/actionTypes';

export default function RemoveCardAction(payload){
    return{
        type: type.REMOVE_CARD,
        payload
    }
}