const Player = require('../model/player');
const Board = require('../model/board');
const automate = require('../model/gameLogic');

let board = new Board();
board.addPlayer(new Player("jean",1,null));
board.addPlayer(new Player("pierre",2,null));
board.addPlayer(new Player("kader",3,null));
board.addPlayer(new Player("pipi",4,null));

automate.fsm.settingUp(null,board);
automate.fsm.startAge(null,board);
automate.fsm.start(null,board);