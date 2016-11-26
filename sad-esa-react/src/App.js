import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';


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
          <div className={`screen ${animstate}`}>
            <Websocket updateAnimation={this.updateAnimation.bind(this)} />
                <div className="animstate">
                  {this.state.animation}
                </div>
                <Screen />
          </div>
        );
    }
}

export default App;
