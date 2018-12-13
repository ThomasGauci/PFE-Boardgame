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
console.log("--------- Start -----------");
console.log(p1.resources);
console.log(p2.resources);
console.log(p3.resources);
console.log(p4.resources);

for(let i = 0; i < 6;i++){
    if(i !== 0)
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

console.log("-------------");
if(automate.ifGoNextAge(board)){
    automate.fsm.battle(null,board);
}

automate.fsm.restartAge(null,board);
automate.fsm.start(null,board);

for(let i = 0; i < 6;i++){
    if(i !== 0)
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

if(automate.ifGoNextAge(board)){
    automate.fsm.battle(null,board);
}


if(board.age === 3){
    automate.fsm.findWinner(null,board);
}
 //console.log(p1);
