import React, { Component } from 'react';
import openSocket from "socket.io-client";
import TUIOManager from "tuiomanager/core/TUIOManager";

import GameScreen from "./screens/gameScreen/gameScreen";
import StartScreen from "./screens/startScreen/startScreen";
import GameWidget from "./GameWidget"
import './App.css';
import ReactDOM from "react-dom";
import ResultScreen from "./screens/resultScreen/resultScreen";

const tuioManager = new TUIOManager();

class App extends Component {

    state={
        serverIp: 'ws://127.0.0.1:8000',
        searchingSeed: false,
        seedName: '',
        gameSeed: this.randomSeed(10),
        socket: null,
        connectionError: false,
        gamePhase: 0,
        players: [],
        playerReady: [],
        latestActions: null,
        gameWidget: null,
        cardsOnBoard: [],
        war: null,
        resultPoints: [],
        age: 1,
        turn: 1,
        discardedCards: []
    }
    changeConfig = this.changeConfig.bind(this);
    setupSocket = this.setupSocket.bind(this);
    resetLatestActions = this.resetLatestActions.bind(this);
    searchSeed = this.searchSeed.bind(this);

    componentDidMount(){
        tuioManager.start();
        this.setupSocket();
        console.log(TUIOManager.getInstance());
        this.setState({gameWidget: new GameWidget(this.state.socket, this.state.players, this.getCardsOnBoard())});
    }

    componentDidUpdate(){
        this.state.gameWidget.setCards(this.getCardsOnBoard());
    }

    render() {
        return (
            <div className="App" ref="app">
                {this.state.gamePhase === 0 ?
                    <StartScreen
                        serverIp={this.state.serverIp}
                        searchingSeed={this.state.searchingSeed}
                        seedName={this.state.seedName}
                        gameSeed={this.state.gameSeed}
                        connectionError={this.state.connectionError}
                        players={this.state.players}
                        changeConfig={this.changeConfig}
                        searchSeed={this.searchSeed}/>
                    : this.state.gamePhase === 1 ?
                        <GameScreen
                            players={this.state.players}
                            latestActions={this.state.latestActions}
                            socket={this.state.socket}
                            war={this.state.war}
                            age={this.state.age}
                            turn={this.state.turn}
                            playerReady={this.state.playerReady}
                            discardedCards={this.state.discardedCards}
                            resetLatestActions={this.resetLatestActions}/>
                        : this.state.gamePhase === 2 ?
                            <ResultScreen
                                points={this.state.resultPoints}/>
                            : null
                }
            </div>
        );
    }

    changeConfig(newIp, newName, newSeed){
        if(this.state.socket) {
            this.state.socket.close();
        }
        this.setState({socket: null, serverIp: newIp, seedName: newName, gameSeed: newSeed}, () => {
            this.setupSocket();
        });
    }

    resetLatestActions(){
        this.setState({latestActions: null});
    }
    
    searchSeed(search, callback) {
        if (this.state.socket) {
            if (search.length >= 3) {
                this.state.socket.emit('searchSeed', {search}, response => {
                    callback(response);
                });
            }
        }
    }

    setupSocket(){
        const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        socket.on('connect', () => {
            socket.emit('newGame', {seedName: this.state.seedName, gameSeed: this.state.gameSeed}, response => {
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
            socket.on('playerPlayed', data => {
                console.log("playerPlayed", data);
                let playerReady = this.state.playerReady;
                playerReady[data] = true;
                this.setState({playerReady: playerReady});
            });
            socket.on('newTurn', data => {
                console.log('newTurn');
                this.setState({playerReady: [], age: data.gameState.age, turn: data.gameState.turn, discardedCards: data.gameState.discarded, latestActions: null, war: null});
            })
            socket.on('endTurn', data => {
                console.log("endTurn", data);
                this.setState({players: data.gameState.players, discardedCards: data.gameState.discarded, latestActions: data.latestActions, war: null}, () => {
                    this.state.gameWidget.setPlayers(data.gameState.players);
                });
            });
            socket.on('battle', data => {
                console.log("battle", data);
                this.setState({players: data.gameState.players, war: data.war, latestActions: null}, () => {
                    this.state.gameWidget.setPlayers(data.gameState.players);
                });
            });
            socket.on('result', data => {
                console.log("result", data);
                this.setState({gamePhase: 2, resultPoints: data});
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

    getCardsOnBoard(){
        const cards = ReactDOM.findDOMNode(this.refs['app']).getElementsByClassName('playerCardMin');
        let result = [];
        for(let card of cards){
            result.push({
                id: card.id,
                x1: card.getBoundingClientRect().x,
                x2: card.getBoundingClientRect().x + 44,
                y1: card.getBoundingClientRect().y,
                y2: card.getBoundingClientRect().y + 44
            });
        }
        return result;
    }

    randomSeed(length) {
        let result = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charsLength = chars.length;

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }

        return result;
    }

    save(){
        const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        //socket.send("save");
        socket.emit('save', "testEnvoieDonnée", response => {
            if (response.error)
                console.error(response.error);
            else
                console.log(response.data);
        })
    }

    load(){
        const socket = openSocket(this.state.serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        socket.emit('load', "testEnvoieDonnée", response => {
            if (response.error)
                console.error(response.error);
            else
                console.log(response.data);
        })
    }
}

export default App;
