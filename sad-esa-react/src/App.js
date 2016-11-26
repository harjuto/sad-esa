import React, { Component } from 'react';
import logo from './logo.svg';
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
          <div className="App">
            <Websocket updateAnimation={this.updateAnimation.bind(this)} />
                <div className="animstate">
                  {this.state.animation}
                </div>
          </div>
        );
    }
}

export default App;
