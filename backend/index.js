import {Player} from 'model/player';

let board;
let numConnection;
const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('newGame', (data) => {
        console.log("Starting new game.");
        //Create game
        board = new board();
        numConnection = 0;
        client.emit('newGame', 'OK');
    });

    client.on('getPositions', () => {
        console.log("on client want free positions");
        client.emit('getPositions', board.places);
    });

    client.on('newPlayer', (data) => {
        if(numConnection < 4) {
            console.log('Creating player');
            //Create player
            let position;
            if(board.places.includes(data.position)){
                position = data.position;
            }else{
                position = board.places[0];
            }
            let player = new Player(data.name,position);
            board.add(player);
            numConnection++;

            client.broadcast.emit('playerJoined', /*InfosDuJoueur*/data);
            client.emit('newPlayer', 'OK');
        }
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
