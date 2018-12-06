const Player = require('../model/player');
const Board = require('../model/board');
const automate = require('../model/gameLogic');

let board = new Board();
let p2 = new Player("pierre",2,null);
let p1 = new Player("jean",1,null);
let p4 = new Player("pipi",4,null);
let p3 = new Player("kader",3,null);
/*p2.army = 1;
p4.army = 1;*/

board.addPlayer(p1);
board.addPlayer(p2);
board.addPlayer(p3);
board.addPlayer(p4);

automate.fsm.settingUp(null,board);
automate.fsm.startAge(null,board);
automate.fsm.start(null,board);
console.log(board.turn);
//console.log(p1.hand);
let data = {"action":"building","position":"1","cardId":p1.hand[0].id};
automate.fsm.playerPlayed(board,data);
//console.log(p1.hand);
data = {"action":"building","position":"2","cardId":p2.hand[0].id};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"3","cardId":p3.hand[0].id};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"4","cardId":p4.hand[0].id};
automate.fsm.playerPlayed(board,data);
//console.log(p4.hand);
//end turn
automate.fsm.playTurn(null,board);
//restart turn
automate.fsm.startTurn(null,board);
console.log(board.turn);
console.log(board);
//console.log(p4.hand);
automate.fsm.playTurn(null,board);


automate.fsm.startTurn(null,board);
console.log(board.turn);
automate.fsm.playTurn(null,board);

automate.fsm.startTurn(null,board);
console.log(board.turn);
automate.fsm.playTurn(null,board);

automate.fsm.startTurn(null,board);
console.log(board.turn);
console.log(automate.ifGoNextAge(board));
automate.fsm.playTurn(null,board);

automate.fsm.startTurn(null,board);
console.log(board.turn);
console.log(automate.ifGoNextTurn());
console.log(automate.ifGoNextAge(board));

data = {"action":"building","position":"1","cardId":p1.hand[0].id};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"2","cardId":p2.hand[0].id};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"3","cardId":p3.hand[0].id};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"4","cardId":p4.hand[0].id};
automate.fsm.playerPlayed(board,data);

automate.fsm.playTurn(null,board);

console.log(automate.ifGoNextTurn());
console.log(automate.ifGoNextAge(board));

if(automate.ifGoNextAge(board)){
    automate.fsm.battle(null,board);
}


automate.fsm.restartAge(null,board);
automate.fsm.start(null,board);
console.log(board.age);
console.log(board.turn);
automate.fsm.playTurn(null,board);

for(let i = 0; i < 5;i++){
    automate.fsm.startTurn(null,board);
    console.log(board.turn);
    data = {"action":"building","position":"1","cardId":p1.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"2","cardId":p2.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"3","cardId":p3.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"4","cardId":p4.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    automate.fsm.playTurn(null,board);
    console.log(p1.hand)
}


if(automate.ifGoNextAge(board)){
    automate.fsm.battle(null,board);
}

if(board.age === 3){
    automate.fsm.findWinner(null,board);
}

automate.fsm.restartAge(null,board);
automate.fsm.start(null,board);
console.log(board.age);
console.log(board.turn);
automate.fsm.playTurn(null,board);

for(let i = 0; i < 5;i++){
    automate.fsm.startTurn(null,board);
    console.log(board.turn);
    data = {"action":"building","position":"1","cardId":p1.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"2","cardId":p2.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"3","cardId":p3.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    data = {"action":"building","position":"4","cardId":p4.hand[0].id};
    automate.fsm.playerPlayed(board,data);
    automate.fsm.playTurn(null,board);
}

console.log(board.age);
console.log(board.turn);

console.log(board.players[0].freeCards);

if(automate.ifGoNextAge(board)){
    automate.fsm.battle(null,board);
}

if(board.age === 3){
    automate.fsm.findWinner(null,board);
}
