import React, { Component } from 'react';
import openSocket from "socket.io-client";
import TUIOManager from "tuiomanager/core/TUIOManager";

import GameScreen from "./screens/gameScreen/gameScreen";
import StartScreen from "./screens/startScreen/startScreen";
import GameWidget from "./GameWidget"
import './App.css';
import ReactDOM from "react-dom";

const tuioManager = new TUIOManager();

class App extends Component {

    state={
        serverIp: 'wss://192.168.1.8:8000',
        socket: null,
        connectionError: false,
        gamePhase: 0,
        players: [],
        latestActions: null,
        gameWidget: null
    }
    changeServerIp = this.changeServerIp.bind(this);
    setupSocket = this.setupSocket.bind(this);

    componentDidMount(){
        tuioManager.start();
        this.setupSocket();
        console.log(TUIOManager.getInstance());
        this.setState({gameWidget: new GameWidget(this.state.socket, this.state.players)});
    }

    render() {
        return (
            <div className="App">
                {this.state.gamePhase === 0 ?
                    <StartScreen
                        serverIp={this.state.serverIp}
                        connectionError={this.state.connectionError}
                        players={this.state.players}
                        changeServerIp={this.changeServerIp}/>
                    : this.state.gamePhase === 1 ?
                        <GameScreen
                            players={this.state.players}
                            latestActions={this.state.latestActions}
                            socket={this.state.socket}/>
                        : null
                }
            </div>
        );
    }

    changeServerIp(newIp){
        if(this.state.socket)
            this.state.socket.close();
        this.setState({socket: null, serverIp: newIp}, () => {
            this.setupSocket();
        });
    }

    setupSocket(){
        const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        socket.on('connect', () => {
            socket.emit('newGame', response => {
                if (response.error)
                    console.error(response.error);
                else
                    console.log(response.data);
            });
            socket.on('playerJoined', data => {
                console.log("playerJoined", data);
                let players = this.state.players;
                players.push(data);
                this.setState({players: players}, () => {
                    this.state.gameWidget.setPlayers(players);
                });
            });
            socket.on('gameStart', data => {
                console.log("gameStart", data);
                this.setState({gamePhase: 1, players: data}, () => {
                    this.state.gameWidget.setPlayers(data);
                });
                socket.emit('readyAge');
            });
            socket.on('endTurn', data => {
                console.log("endTurn", data);
                this.setState({players: data.gameState.players, latestActions: data.latestActions}, () => {
                    this.state.gameWidget.setPlayers(data.gameState.players);
                });
            });
            socket.on('battle', data => {
                console.log("battle", data);
                socket.emit('readyAge');
            });
            this.setState({socket: socket, connectionError: false}, () => {
                this.state.gameWidget.setSocket(socket);
            });
        });
        socket.on('connect_error', () => {
            socket.close();
            this.setState({connectionError: true});
        });
    }
}

export default App;