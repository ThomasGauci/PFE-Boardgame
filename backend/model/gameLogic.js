let StateMachine = require('javascript-state-machine');
//TO DO SA MERE mapage socket : player
const cities = require('./Data/cities');
const cards = require('./Data/cards');
const Action = require('./action');

let num_played = 0;
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
        /*{ name: 'restartAge', from: 'enAge', to: 'newAge'},*/
        { name: 'findWinner', from: 'enAge', to: 'end'}
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
        onStartAge: function(lifecycle,client,board){
            console.log("Start new Age");
            board.distributeCards(cards.age1);
            board.age++;
        },
        onTurn: function(lifecycle,client,board){
            console.log("Start turn");
            board.turn++;
            num_played = 0;

            let data;
            for(let i=0;i<4;i++){
                data={"age": board.age,
                    "turn": board.turn,
                    "cards": board.getPlayerAvailableMoves(i)
                };
                if(board.players[i].socket != null)
                    board.players[i].socket.emit('newTurn',data);
            }
        },
        onPlayerPlayed: function(lifecycle,board,data){
            console.log("Player played");
            let player = board.findPlayer(data.position);
            let action = new Action(data.action,data.cardId,player,board);
            action.play();
            num_played++;
        },
        onStartTurn: function(lifecycle,client,board){
            console.log("Restart turn");
            num_played = 0;
            board.changeHands();
        },
        onEndTurn: function (lifecycle,client,board) {
            console.log("End turn");
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
                "gameState":
                    {"players":players}
            };
            if(client != null){
                client.emit("endTurn",data);
                client.broadcast.emit("endTurn",data);
            }
        }
    }
});

 function ifGoNextTurn(){
    return (num_played === 4);
}

function ifGoNextAge(board){
    return (board.turn === 6);
}

module.exports = { fsm: fsm,
    ifGoNextTurn : ifGoNextTurn,
    ifGoNextAge : ifGoNextAge
 };