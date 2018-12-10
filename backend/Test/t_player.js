const Player = require('../model/player');
const Board = require('../model/board');
const Action = require('../model/action');
const Card = require('../model/card');
const Cards = require('../model/Data/cards');

let ag1Cards= Cards.age1;
let ag2Cards = Cards.age2;
let player = new Player("rachid",1,null);
let player2 = new Player("rachid2",2,null);
let player3 = new Player("rachid3",3,null);

let neighbors = [player2,player3];
player.hand = ag1Cards.slice();
player2.hand = ag1Cards.slice();
player3.hand = ag1Cards.slice();

player.city = 4;
player2.city = 5;
player3.city = 6;

let actions1 = [];

for(let i = 0 ; i < player.hand.length; i++){
    actions1.push(new Action("building",player.hand[i].id,player,null,null));
}

actions1.push(new Action("building","R104",player2,null,null));
actions1.push(new Action("building","R105",player2,null,null));
actions1.push(new Action("building","R106",player3,null,null));
actions1.push(new Action("building","R107",player3,null,null));

for(let act of actions1){
    act.do();
}

player.economicEffect.discount.splice(player.economicEffect.discount.indexOf("left"),1);
console.log(Card.test(player,neighbors));

/*console.log("test is already built");
console.log(player.isAlreadyBuilt(ag1Cards[0].id));
console.log("---------");

for(let card of ag2Cards){
    console.log(card.id);
    console.log(player.isFreeToBuild(card.id));
}

player.hand = ag2Cards;

/*let action = new Action("building",player.hand[0].id,player,null,null);
action.do();*/
