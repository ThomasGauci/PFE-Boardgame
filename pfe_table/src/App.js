import React, { Component } from 'react';
import './App.css';
import StartScreen from "./screens/startScreen/startScreen";
import openSocket from "socket.io-client";

class App extends Component {

    state={
        serverIp: 'wss://192.168.1.8:8000',
        socket: null,
        connectionError: false,
        gamePhase: 0,
        players: []
    }
    changeServerIp = this.changeServerIp.bind(this);
    setupSocket = this.setupSocket.bind(this);
    setPlayers = this.setPlayers.bind(this);

    componentDidMount(){
        this.setupSocket();
    }

    render() {
        return (
            <div className="App">
                {this.state.gamePhase === 0 ?
                    <StartScreen
                        serverIp={this.state.serverIp}
                        socket={this.state.socket}
                        connectionError={this.state.connectionError}
                        players={this.state.players}
                        setPlayers={this.setPlayers}
                        changeServerIp={this.changeServerIp}/>
                    : null
                }
            </div>
        );
    }

    changeServerIp(newIp){
        this.setState({serverIp: newIp}, () => {
            this.setupSocket();
        });
    }

    setupSocket(){
        const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        socket.on('connect', () => {
            socket.on('gameStarted', () => {
                this.setState({gamePhase: 1});
            });
            this.setState({socket: socket, connectionError: false});
        });
        socket.on('connect_error', () => {
            socket.close();
            this.setState({connectionError: true});
        });
    }

    setPlayers(players){
        this.setState({players: players});
    }
}

export default App;
