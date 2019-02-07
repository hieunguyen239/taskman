import * as type from '../constants/actionTypes';

export default function moveCard(payload){
    return {
        type: type.MOVE_CARD,
        payload
    };
}