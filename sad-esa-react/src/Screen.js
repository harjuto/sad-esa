import React, { Component } from 'react';
import './Screen.css';
import Message from './Message';
import Mascot from './Mascot';

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
