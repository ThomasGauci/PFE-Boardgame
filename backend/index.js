const Player = require('./model/player');
const Board = require('./model/board');
const Action = require('./model/action');
const automate = require('./model/gameLogic');
//test
/*let board = new Board();
board.addPlayer(new Player("jean",1,"ccc"));
board.addPlayer(new Player("pierre",2));
board.addPlayer(new Player("kader",3));
board.addPlayer(new Player("pipi",4,"cca"));

automate.fsm.settingUp("",board);
automate.fsm.startAge("",board);
automate.fsm.start("",board);*/

let fs = require( 'fs' );
let app = require('express')();
let https = require('https');
let server = https.createServer({
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8'),
    requestCert: false,
    rejectUnauthorized: false
},app);
server.listen(8000);
//communication objects
let io = require('socket.io').listen(server);
let numConnection;
let table;

//game logic objects
let board;
let played;

io.on('connection', (client) => {
    client.on('newGame', (callback) => {
        console.log("Starting new game.");
        //Create game
        board = new Board();
        numConnection = 0;
        table = client;
        callback({"data":"OK"});
    });

    client.on('getPositions', (callback) => {
        console.log("on client want took positions");
        console.log(board.getTookPlaces());
        callback({"data":board.getTookPlaces()});
    });

    client.on('newPlayer', (data) => {
        console.log(data);
        console.log(data.name);
        console.log(data.position);
        if(numConnection <= 2) {
            console.log('Creating player');
            let player = new Player(data.name,data.position,client);
            board.addPlayer(player);
            numConnection++;

            client.broadcast.emit('playerJoined', data);
            client.emit('newPlayer', 'OK');
        }else if(numConnection === 3){
            console.log('Creating LAST player');
            let player = new Player(data.name,data.position,client);
            board.addPlayer(player);
            numConnection++;

            client.broadcast.emit('playerJoined', data);
            automate.fsm.settingUp(client,board);
            client.emit('newPlayer', 'OK');
        }
        else{
            client.emit('newPlayer', 'Rejected');
        }
    });

    client.on('readyAge', () => {
        console.log("table ready for a new turn");
        automate.fsm.startAge(client,board);
        automate.fsm.start(client,board);
        played = 0;
    });

    client.on('readyTurn', () => {
        console.log("table ready for a new turn");
        automate.fsm.startTurn(client,board);
        played = 0;
    });

    client.on('turnValidated', (data) => {
        console.log("Player played");
        played++;
        let action = new Action(data.action,data.cardId,data.pseudo);
        board.findPlayer(data.pseudo).addAction(action);
        if(played === 3){
            automate.fsm.playTurn(table,board);
        }
    });
});

