import React, { Component } from 'react';
import './Screen.css';

class Screen extends Component {
  static get defaultProps () {
    return {
      animState: {
        animation: 'idle',
        suggestion: 'none',
      }
    }
  }
  render() {
    return (
      <div className={ `screen ${this.props.animState.animation}`} style={ { background: `url(img/${ this.props.animState.suggestion }.png)`}}>
        <p className={ `message ${this.props.animState.animation}`} ></p>
        <div className={ `mascot ${this.props.animState.animation}`}></div>
      </div>
    );
  }
}

export default Screen;
