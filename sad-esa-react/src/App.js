import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';


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
        this.setState({animState: {
          suggestion: 'spa_ad',
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
