const Player = require('./model/player');
const Board = require('./model/board');
//const io = require('socket.io')();

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
let io = require('socket.io').listen(server);

let board = new Board();
board.addPlayer(new Player("jean",3));

let numConnection;

io.on('connection', (client) => {
    client.on('newGame', (callback) => {
        console.log("Starting new game.");
        //Create game
        board = new Board();
        numConnection = 0;
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
        if(numConnection < 4) {
            console.log('Creating player');
            let player = new Player(data.name,data.position);
            board.addPlayer(player);
            numConnection++;

            client.broadcast.emit('playerJoined', data);
            client.emit('newPlayer', 'OK');
        }else{
            client.emit('newPlayer', 'Rejected');
        }
    });
});
