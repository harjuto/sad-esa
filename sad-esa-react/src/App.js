import React, { Component } from 'react';
import Screen from './Screen';
import './App.css';
import Websocket from './websocket';


class App extends Component {
    constructor() {
        super();
        this.state = {
            animState: 'idle'
        }
    }

    updateAnimation(anim) {
        this.setState({animState: anim})
    }

    render() {
        return (
          <div className="App">
            <Websocket updateAnimation={this.updateAnimation.bind(this)} />
                <div className="animstate">
                  {this.state.animation}
                </div>
                <Screen animState={this.state.animState} />
          </div>
        );
    }
}

export default App;
