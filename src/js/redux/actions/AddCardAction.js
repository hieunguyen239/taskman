import * as type from '../constants/actionTypes';

export default function addCard(payload){
    return {
        type: type.ADD_CARD,
        payload
    }
}