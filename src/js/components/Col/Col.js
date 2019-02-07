import React from 'react';
import './css/col.css';

import { DropTarget } from 'react-dnd';

import Card from '../Card/Card';

const colTarget = {
    drop(props) {
      return {
        name : props.name,
        id: props.id
      }
    }
};

function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
}

let Col = ({name, id, cards, toggleModal, connectDropTarget, isOver, children }) => {
    return connectDropTarget(
        <div className="drag-col" style={{
          position: 'relative',
          width: '100%',
          height: '100vh'
        }}>
        <div className="col-header" id={id}>{name}</div>
          {
            cards.map((ca) => {
              return ca.colid === id && <Card id={ca.id} title={ca.title} content={ca.content} key={Math.random()}/>
            })
          }
          <div className="add-card-container">
            {id === 1 && <button className="add-card-btn" onClick={toggleModal}>+</button>}
          </div>
          {isOver &&
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100%',
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: 'yellow',
            }} />
          }
        </div>
      );
}

export default DropTarget('Card', colTarget, collect)(Col);