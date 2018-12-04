const Player = require('./model/player');
const Board = require('./model/board');
const Cards = require('./model/Data/cards');
const automate = require('./model/gameLogic');

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

    client.on('getInformations', (data) => {
        let card = Cards.findCardFromId(data.id);
        let player = board.players[data.position-1];
        player.socket.emit("cardInformation",card);
    });


    client.on('newPlayer', (data) => {
        console.log(data);
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
        console.log("table ready for a new age");
        if(board.age === 2){
            automate.fsm.startAge(client,board);
        }
        else if(board.age === 3){
            automate.fsm.findWinner(table,board);
            return;
        }else{
            automate.fsm.restartAge(client,board);
        }
        automate.fsm.start(client,board);
        played = 0;
    });


    client.on('turnValidated', (data) => {
        automate.fsm.playerPlayed(board,data);

        if(automate.ifGoNextTurn()){
            automate.fsm.playTurn(client,board);
        }
    });

    client.on('readyTurn', () => {
        console.log("table ready for a new turn");
        if(automate.ifGoNextAge(board)){
            automate.fsm.battle(table,board);
            return;
        }
        automate.fsm.startTurn(client,board);
    });
});

