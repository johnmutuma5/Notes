import React, { Component } from 'react';
import logo from './logo.svg';
import chai from 'chai';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            { 
              'We made it finally, babe! Just hold on to this. This is us!!' + 
              ' We did it again and we\'re going to do it over again'
            }
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Loving it!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
