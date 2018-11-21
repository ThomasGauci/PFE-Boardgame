import React, { Component } from 'react';
import './App.css';
import StartScreen from "./screens/startScreen/startScreen";
import {ServerIp} from "./ServerIp";

class App extends Component {

    state={
        serverIp: '192.168.1.6:3000'
    }
    changeServerIp = this.changeServerIp.bind(this);

    render() {
        return (
            <ServerIp.Provider value={this.state.serverIp}>
                <div className="App">
                    <StartScreen changeServerIp={this.changeServerIp}/>
                </div>
            </ServerIp.Provider>
        );
    }

    changeServerIp(newIp){
        this.setState({serverIp: newIp});
    }
}

export default App;
