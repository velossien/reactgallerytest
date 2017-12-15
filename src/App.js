import React, { Component } from 'react';
import ImageContainer from './components/ImageContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dem Nicks</h1>
        </header>
        <ImageContainer/>
      </div>
    );
  }
}

export default App;
