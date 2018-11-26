import React, { Component } from 'react';
import './App.css';
import StartScreen from "./screens/startScreen/startScreen";
import openSocket from "socket.io-client";
import GameScreen from "./screens/gameScreen/gameScreen";

class App extends Component {

    state={
        serverIp: 'wss://192.168.1.8:8000',
        socket: null,
        connectionError: false,
        gamePhase: 0,
        players: [],
        latestActions: null
    }
    changeServerIp = this.changeServerIp.bind(this);
    setupSocket = this.setupSocket.bind(this);

    componentDidMount(){
        this.setupSocket();
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
        this.setState({serverIp: newIp}, () => {
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
                this.setState({players: players});
            });
            socket.on('gameStart', data => {
                console.log("gameStart", data);
                this.setState({gamePhase: 1, players: data});
                socket.emit('readyAge');
            });
            socket.on('endTurn', data => {
                console.log("endTurn", data);
                this.setState({players: data.gameState.players, latestActions: data.latestActions});
            });
            this.setState({socket: socket, connectionError: false});
        });
        socket.on('connect_error', () => {
            socket.close();
            this.setState({connectionError: true});
        });
    }
}

export default App;
/*
{
    latestActions: [
        {
            player: {...},
            action: '...',
            cardId: '...'
        },
        {
            player: {...},
            action: '...',
            cardId: '...'
        },
        {
            player: {...},
            action: '...',
            cardId: '...'
        },
        {
            player: {...},
            action: '...',
            cardId: '...'
        }
    ],
    gameState: {
        players: [
            {
                name: '...',
                position: '...',
                city: '...',
                money: '...',
                warPoints: [...],
                playedCards: [...]
            },
            {
                name: '...',
                position: '...',
                city: '...',
                money: '...',
                warPoints: [...],
                playedCards: [...]
            },
            {
                name: '...',
                position: '...',
                city: '...',
                money: '...',
                warPoints: [...],
                playedCards: [...]
            },
            {
                name: '...',
                position: '...',
                city: '...',
                money: '...',
                warPoints: [...],
                playedCards: [...]
            }
        ]
    }
}
*/