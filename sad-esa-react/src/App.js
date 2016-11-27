import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';
// import anger from './img/anger.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            animState: {
              suggestion: 'car_commercial',
              animation: 'idle'
        }
    }
    }

    updateAnimation(anim) {
        console.info(anim)
        this.setState({animState: {
          suggestion: anim.Message,
          animation: 'active',
        }})
    }

    render() {
        return (
          <div>
            <Websocket updateAnimation={this.updateAnimation.bind(this)} />

                <Screen animState={this.state.animState} />

          </div>
        );
    }
}

export default App;
