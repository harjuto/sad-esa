import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';
import anger from './img/anger.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            animation: 'idle'
        }
    }

    updateAnimation(anim) {
        this.setState({animation: anim})
    }

    render() {
        return (
          <div>
            <Websocket updateAnimation={this.updateAnimation.bind(this)} />
                <div className="animstate" style={{background: `url(${anger})`}}>
                  {this.state.animation}
                </div>
                <Screen />
          </div>
        );
    }
}

export default App;
