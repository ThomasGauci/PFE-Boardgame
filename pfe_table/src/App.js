import React, { Component } from 'react';
import './App.css';
import StartScreen from "./screens/startScreen/startScreen";

class App extends Component {

    state={
        serverIp: 'wss://192.168.1.8:8000',
        players: []
    }
    changeServerIp = this.changeServerIp.bind(this);

    render() {
        return (
            <div className="App">
                <StartScreen
                    serverIp={this.state.serverIp}
                    changeServerIp={this.changeServerIp}/>
            </div>
        );
    }

    changeServerIp(newIp){
        this.setState({serverIp: newIp});
    }

    setPlayers(){

    }
}

export default App;
