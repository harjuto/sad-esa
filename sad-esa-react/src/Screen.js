import React, { Component } from 'react';
import './Screen.css';
import Message from './Message';

class Screen extends Component {
  render() {
    return (
      <div className={ `screen ${this.props.animState}`}>
        <Message />
        <div className={`mascot ${this.props.animState}`}></div>
      </div>
    );
  }
}

export default Screen;
