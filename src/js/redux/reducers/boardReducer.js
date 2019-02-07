import * as action_type from '../constants/actionTypes';

const initialState = {
   cards:[
   //    {
   //       id: 1,
   //       title: 'Learning',
   //       content: 'Keep trying on everything.',
   //       colid: 1
   //   },
   //   {
   //       id: 2,
   //       title: 'Coding',
   //       content: 'A cursory glance at the docs will show that this library supports far more than I’ve shown, and this project is as yet my only experience with it.',
   //       colid: 1
   //   }
   ],
   isModalShow: false
};

export default function tasks(state = initialState, action) {
   switch(action.type){
        case action_type.MOVE_CARD:
         let newCards = state.cards.slice(0);
         newCards.forEach((card) => card.id === action.payload.id ? card.colid =  action.payload.colid : undefined)
        return {cards: newCards};

        case action_type.ADD_CARD:
         const card = {id: Math.floor(Math.random() * 9999), ...action.payload, colid:1}
         let cards = state.cards.slice(0).concat(card);
        return {cards, isModalShow: false};

        case action_type.REMOVE_CARD:
         const {id} = action.payload;
        return {cards: state.cards.filter(card => card.id !== +id)};

        case action_type.SHOW_MODAL:
        return Object.assign({}, state, action.payload);

        default:
        return initialState;
   }
}