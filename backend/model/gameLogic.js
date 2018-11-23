let StateMachine = require('javascript-state-machine');
//TO DO SA MERE mapage socket : player
const cities = require('./Data/cities');
const cards = require('./Data/cards');

let fsm = new StateMachine({
    init: 'wait',
    transitions: [
        /*{ name: 'initialSetUp', from: 'wait',  to: 'wait'},*/
        /*{ name: 'playerJoined', from: 'wait',  to: 'wait'},*/
        { name: 'settingUp', from: 'wait',  to: 'setUp'},
        { name: 'startAge', from: 'setUp', to: 'newAge'},
        { name: 'start', from: 'newAge', to: 'turn'},
        /*{ name: 'playTurn', from: 'turn', to: 'turn'}*/
        { name: 'playTurn', from: 'turn', to: 'endTurn'},
        { name: 'startTurn', from: 'endTurn', to: 'turn'},
        { name: 'battle', from: 'endTurn', to: 'endAge'},
        /*{ name: 'restartAge', from: 'enAge', to: 'newAge'},*/
        { name: 'findWinner', from: 'enAge', to: 'end'}
    ],
    methods: {
        onSetUp:  function(lifecycle,client,board) {
            console.log("Setup table");
            let selectedCities = cities.chooseRandomCities();
            board.distributeCities(selectedCities);
            let data = [];
            for(let i = 0; i<4;i++){
                data.push({"name":board.players[i].name, "city":board.players[i].city.id, "position":board.players[i].position});
            }
            console.log(data);
            client.broadcast.emit('gameStart', data);
        },
        onStartAge: function(lifecycle,client,board){
            console.log("Start new Age");
            board.distributeCards(cards.age1);
            board.age++;
        },
        onTurn: function(lifecycle,client,board){
            console.log("Start turn");
            board.turn++;
            let data;
            for(let i=0;i<4;i++){
                data={"age": board.age,
                    "turn":board.turn,
                    "cards":board.players[i].getCardsId()
                };
                //console.log(data);
                board.players[i].socket.emit('newTurn',data);
                console.log(board.players[i].socket);
            }
        },
        onEndTurn: function (lifecycle,table,board) {
            console.log("End turn");
            let latestActions = [];
            for(let i = 0; i<4;i++){
                latestActions.push(board.players.actions[board.players.actions.length - 1].getData());
            }
            let players = [];
            for(let i = 0; i<4;i++){
                players.push(board.players.getState());
            }
            let data= {
                "latestActions":latestActions,
                "gameState":
                    {"players":players}
            };
            table.emit("endTurn",data);
        }
    }
});

module.exports = { fsm: fsm };