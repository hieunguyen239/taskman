import React, { Component } from 'react';
import Board from './js/components/Board/Board';
import './App.css';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
class App extends Component {
  render() {
    return (
      <div className="App">
      <DragDropContextProvider backend={HTML5Backend}>
          <Board />
      </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
