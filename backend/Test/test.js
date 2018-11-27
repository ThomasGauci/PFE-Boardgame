const Player = require('../model/player');
const Board = require('../model/board');
const automate = require('../model/gameLogic');

let board = new Board();
let p1 = new Player("jean",1,null);
let p2 = new Player("pierre",2,null);
let p3 = new Player("kader",3,null);
let p4 = new Player("pipi",4,null);

board.addPlayer(p1);
board.addPlayer(p2);
board.addPlayer(p3);
board.addPlayer(p4);

automate.fsm.settingUp(null,board);
automate.fsm.startAge(null,board);
automate.fsm.start(null,board);

console.log(p1.hand);
let data = {"action":"building","position":"1","cardId":p1.hand[0]};
automate.fsm.playerPlayed(board,data);
console.log(p1.hand);

data = {"action":"building","position":"2","cardId":p1.hand[0]};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"3","cardId":p1.hand[0]};
automate.fsm.playerPlayed(board,data);
data = {"action":"building","position":"4","cardId":p1.hand[0]};
automate.fsm.playerPlayed(board,data);