const JSON = require('circular-json');

const Player = require('./model/player');
const Board = require('./model/board');
const Cards = require('./model/Data/cards');
const automate = require('./model/gameLogic');

let fs = require( 'fs' );
let app = require('express')();
let http = require('http');
let seedrandom = require('seedrandom');
let server = http.createServer(app);
server.listen(8000);
//communication objects
let io = require('socket.io').listen(server);
let numConnection;
let table;

//game logic objects
let board;
let played;

let seedsList = {seeds:[]};

if (!fs.existsSync('seeds.txt')) {
    fs.writeFileSync('seeds.txt', JSON.stringify(seedsList));
} else {
    let seedsContent = fs.readFileSync('seeds.txt');
    seedsList = JSON.parse(seedsContent);
}

io.on('connection', (client) => {
    client.on('newGame', callback => {
        console.log('Starting new game.');

        if (infos.seedName !== '') {
            let found = false;

        //Create game
        board = new Board();
        numConnection = 0;
        automate.fsm.restart();
        table = client;
        callback({"data":"OK"});
    });

    client.on('searchSeed', (data, callback) => {
        console.log(`Received searchSeed for ${data.search}`);

        let seeds = seedsList.seeds;
        let result = {seeds:[]};
        for (let key in seeds) {
            for (let seedname in seeds[key]) {
                if (seedname.indexOf(data.search) != -1) {
                    result.seeds.push(seeds[key]);
                }
            }
        }

        callback(result);
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
        if(board.age === 0){
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
        automate.fsm.playerPlayed(board,data,table);

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

    client.on('save', (data) => {
        console.log("Sauvegarde");
        //console.log("Donnée reçue : "+data);

        d = new Date();
        date = d.toLocaleDateString()+'_'+d.toLocaleTimeString()+"\n"; 
        json = JSON.stringify(board.players);
        fs.appendFile("save.txt",json,function(err){
        //fs.appendFile("save:"+date+".txt",date+json,function(err){
            if(err)
                console.log(err);
            else
                console.log("Sauvegarde completée.");
        })

    });

    client.on('load', (data) => {
        console.log("Chargement");
        //console.log("Donnée reçue : "+data);

        let saveContent = fs.readFile("save.txt");
        board.players = JSON.parse(saveContent);
        console.log(players);
    });

});