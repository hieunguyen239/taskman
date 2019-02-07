import React from 'react';
import {DragSource} from 'react-dnd';
import { connect } from "react-redux";
import dragAction from '../../redux/actions/DragAction';
import removeCardAction from '../../redux/actions/RemoveCardAction';
import './css/card.css';

import store from '../../redux/store/store';
const cardSource = {
    beginDrag(props) {
      return {
        name: props.title,
        id: props.id
      };
    },
    endDrag(props, monitor) {
      const dragItem = monitor.getItem();
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const card = {
            id: dragItem.id,
            colid: dropResult.id
        }
        props.dragAction(card);
        console.log(`You dropped ${dragItem.name + " " + dragItem.id} into ${dropResult.name}`);
      }
    },
};

function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

let Card = ({id, title, content, connectDragSource, isDragging }) => {
    function removeCard(e){
      e.target.parentNode.classList.add('removing');
      const id = e.target.dataset.id;
      setTimeout(()=>{
        store.dispatch(removeCardAction({id}));
      }, 300);
    }
    return connectDragSource(
        <div className="card-container" style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }}>
          <div className="remove-card" onClick={removeCard} data-id={id}>x</div>
          <div className="card-title">{title}</div>
          <div className="card-content">{content}</div>
        </div>
    )
}

//export default DragSource("Card", cardSource, collect)(Card);

function mapStateToProps(state) {
  return {
      tasks: state.boardReducer
  };
}

function mapDispatchToProps(dispatch){
  return {
      dragAction: (payload) => dispatch(dragAction(payload))
  }
}

Card =  DragSource("Card", cardSource, collect)(Card);
Card = connect(mapStateToProps, mapDispatchToProps)(Card);

export default Card;