import React, { Component } from 'react';
import logo from './logo.svg';
import './Screen.css';

class Screen extends Component {
  render() {
    return (
      <div className="screen">
        <Message />
        <Mascot />
      </div>
    );
  }
}

export default Screen;
