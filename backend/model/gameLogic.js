let StateMachine = require('javascript-state-machine');
//TO DO SA MERE mapage socket : player
const cities = require('./Data/cities');
const cards = require('./Data/cards');
const Action = require('./action');

let playerPlayed = [];
let currentActions = new Map();
let m_board;

let fsm = new StateMachine({
    init: 'wait',
    transitions: [
        /*{ name: 'initialSetUp', from: 'wait',  to: 'wait'},*/
        /*{ name: 'playerJoined', from: 'wait',  to: 'wait'},*/
        { name: 'settingUp', from: 'wait',  to: 'setUp'},
        { name: 'startAge', from: 'setUp', to: 'newAge'},
        { name: 'start', from: 'newAge', to: 'turn'},
        { name: 'playerPlayed', from: 'turn', to: 'turn'},
        { name: 'playTurn', from: 'turn', to: 'endTurn'},
        { name: 'startTurn', from: 'endTurn', to: 'turn'},
        { name: 'battle', from: 'endTurn', to: 'endAge'},
        { name: 'restartAge', from: 'endAge', to: 'newAge'},
        { name: 'findWinner', from: 'endAge', to: 'end'},
        { name: 'restart', from: '*', to: 'wait'}
    ],
    methods: {
        onSetUp:  function(lifecycle,client,board) {
            console.log("Setup table");
            m_board = board;
            let selectedCities = cities.chooseRandomCities();
            board.distributeCities(selectedCities);
            let data = [];
            for(let i = 0; i<4;i++){
                data.push(board.players[i].getState());
            }
            if(client != null)
                client.broadcast.emit('gameStart', data);
        },
        onNewAge: function(lifecycle,client,board){
            console.log("Start new Age");
            board.newAge(cards);
        },
        onStart: function(lifecycle,table,board){
            console.log("Start turn");
            board.turn++;
            playerPlayed = [];
            currentActions = new Map();
            let data;
            for(let i=0;i<4;i++){
                data={
                    "age": board.age,
                    "turn": board.turn,
                    "cards": board.getPlayerAvailableMoves(i),
                    "money": board.players[i].gold,
                    "points": board.players[i].getPoints()
                };
                if(board.players[i].socket != null)
                    board.players[i].socket.emit('newTurn',data);
            }

            let latestActions = [];
            for(let i = 0; i<4;i++){
                latestActions.push(board.players[i].actions[board.players[i].actions.length - 1]);
            }
            let players = [];
            for(let i = 0; i<4;i++){
                players.push(board.players[i].getState());
            }
            data= {
                "latestActions":latestActions,
                "gameState": {
                    "players": players,
                    "turn": board.turn,
                    "age" : board.age
                }
            };
            if(table != null){
                table.emit("newTurn",data);
            }
        },
        onPlayerPlayed: function(lifecycle,board,data,table){
            console.log("Player played", data.position);
            let player = board.findPlayer(data.position);
            if(player === -1){
                console.log("erreur: player not found");
            }else{
                let action = new Action(data.action,data.cardId,player,board, data.purchases);
                if(!playerPlayed.includes(data.position)){
                    playerPlayed.push(data.position);
                }
                currentActions.set(data.position,action);
                if(table != null){
                    table.emit("playerPlayed",data.position);
                }
            }
        },
        onEndTurn: function (lifecycle,client,board) {
            console.log("End turn");
            for(let currentActionKey of currentActions.keys()){
                currentActions.get(currentActionKey).do();
            }
            let latestActions = [];
            for(let i = 0; i<4;i++){
                latestActions.push(board.players[i].actions[board.players[i].actions.length - 1]);
            }
            let players = [];
            for(let i = 0; i<4;i++){
                players.push(board.players[i].getState());
            }
            let data= {
                "latestActions":latestActions,
                "gameState": {
                    "players": players,
                    "turn": board.turn,
                    "age" : board.age
                }
            };
            if(client != null){
                client.emit("endTurn",data);
                client.broadcast.emit("endTurn",data);
            }
        },onStartTurn: function(lifecycle,table,board){
            console.log("Restart turn");
            playerPlayed = [];
            currentActions = new Map();
            board.turn++;
            board.changeHands();
            let data;
            for(let i=0;i<4;i++){
                data={"age": board.age,
                    "turn":board.turn,
                    "cards":board.getPlayerAvailableMoves(i),
                    "money": board.players[i].gold,
                    "points": board.players[i].getPoints()
                };
                if(board.players[i].socket != null){
                    board.players[i].socket.emit('newTurn',data);
                }
            }

            let latestActions = [];
            for(let i = 0; i<4;i++){
                latestActions.push(board.players[i].actions[board.players[i].actions.length - 1]);
            }
            let players = [];
            for(let i = 0; i<4;i++){
                players.push(board.players[i].getState());
            }
            data= {
                "latestActions":latestActions,
                "gameState": {
                    "players": players,
                    "turn": board.turn,
                    "age" : board.age
                }
            };
            if(table != null)
                table.emit("newTurn",data);
        },
        onBattle: function(lifecycle,table,board){
            console.log("End of age: battle");
            let players = [];
            for(let i = 0; i<4;i++){
                players.push(board.players[i].getState());
            }
            let wars = board.battle();
            let data= {
                "war": wars,
                "gameState":
                    {"players" : players,
                        "turn": board.turn,
                        "age" : board.age
                    }
            };
            if(table != null){
                table.emit('battle',data);
            }
        },
        onFindWinner: function(lifecycle,table,board){
            console.log("End of game");
            let res = board.calculateWinner();
            if(table != null){
                table.emit("result",res);
            }
        },
        onInvalidTransition: function(transition, from, to) {
            console.log("transition " + transition + " not allowed from " + from + " to " + to);
            //throw new Error("transition " + transition + " not allowed from " + from + " to " + to);
        }
    }
});

 function ifGoNextTurn(){
    return (playerPlayed.length === 4);
}

function ifGoNextAge(board){
    return (board.turn === 6 && ifGoNextTurn());
}

module.exports = { fsm: fsm,
    ifGoNextTurn : ifGoNextTurn,
    ifGoNextAge : ifGoNextAge
 };