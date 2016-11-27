import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';
// import anger from './img/anger.png';

class App extends Component {
    constructor() {
        super();
        this.state = {}
    }

    updateAnimation(anim) {
        this.setState({animState: {
          suggestion: anim.Message,
          animation: 'active',
        }})
    }

    resetAnimation() {
        console.info("reset")
        this.setState({animState: {
            suggestion: 'none',
            animation:'idle'
        }})
    }

    render() {
        return (
          <div>
            <Websocket reset={this.resetAnimation.bind(this)} updateAnimation={this.updateAnimation.bind(this)} />

                <Screen animState={this.state.animState} />

          </div>
        );
    }
}

export default App;
