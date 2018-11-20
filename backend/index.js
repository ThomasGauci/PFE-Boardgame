const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('newGame', (data) => {
        console.log("Starting new game.");
        //Create game
        client.emit('newGame', 'OK');
    });

    client.on('newPlayer', (data) => {
        if(/*GameStarted && GameHasVacantPlace*/true) {
            console.log('Creating player');
            //Create player
            client.broadcast.emit('playerJoined', /*InfosDuJoueur*/data);
            client.emit('newPlayer', 'OK');
        }
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
