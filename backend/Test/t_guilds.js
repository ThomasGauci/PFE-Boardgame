const Player = require('../model/player');
const Board = require('../model/board');
const Action = require('../model/action');
const Card = require('../model/card');
const Cards = require('../model/Data/cards');
const cities = require('../model/Data/cities');

let selectedCities = cities.chooseRandomCities();

let ag1Cards= Cards.age1;
let ag2Cards = Cards.age2;
let ag3Cards = Cards.age3;
let board = new Board();

let player = new Player("rachid",2,null);
let player2 = new Player("rachid2",1,null);
let player3 = new Player("rachid3",3,null);

board.addPlayer(player);
board.addPlayer(player2);
board.addPlayer(player3);

board.distributeCities(selectedCities);

let neighbors = [player2,player3];
player.hand = ag1Cards.slice();
player2.hand = ag1Cards.slice();
player3.hand = ag1Cards.slice();

let actions1 = [];

for(let i = 0 ; i < player.hand.length; i++){
    actions1.push(new Action("building",player.hand[i].id,player,null,null));
    actions1.push(new Action("building",player2.hand[i].id,player2,null,null));
    actions1.push(new Action("building",player3.hand[i].id,player3,null,null));

}

for(let act of actions1){
    act.do();
}


console.log(player2.cardsPerType);
console.log(player3.cardsPerType);

player.hand = ag3Cards.slice();
player2.hand = ag3Cards.slice();
player3.hand = ag3Cards.slice();


console.log(player.getState());
let wonderstep = new Action("wonderStep",player.hand[0].id,player,null,null);
wonderstep.do();
console.log(player.getState());

/*let actions2 = [];
for(let i = 0 ; i < player.hand.length; i++){
    actions2.push(new Action("building",player.hand[i].id,player,null,null));

}

for(let act of actions2){
    act.do();
}
player2.lostWars = 4;
player3.lostWars = 2;


console.log(board.getGuildPoints(player.effect.guild,player));
//player.city.chooseFace("B");

/*console.log(player.city.name);
for(let wonder of player.city.currentFace){
    console.log(wonder.cost);
    console.log(wonder.power);
}*/