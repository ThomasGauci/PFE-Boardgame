const Player = require('../model/player');
const Board = require('../model/board');
const Cards = require('../model/Data/cards');

let ag1Cards= Cards.age1;
let ag2Cards = Cards.age2;
let player = new Player("rachid",1,null);

for(let card of ag1Cards){
    player.addCard(card);
}
console.log("test is already built");
console.log(player.isAlreadyBuilt(ag1Cards[0].id));
console.log("---------");

for(let card of ag2Cards){
    console.log(card.id);
    console.log(player.isFreeToBuild(card.id));
}
