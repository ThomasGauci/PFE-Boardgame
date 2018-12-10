class Player {
    constructor(name,position,socket) {
        this.name = name;
        this.position = position;
        this.hand = [];
        this.cards = [];
        this.actions = [];
        this.warPoints = [[0],[0],[0]];
        this.warPointsDisplay = [];
        this.lostWars = 0;
        this.city = null;
        this.freeCards =[];
        this.economicEffect = {
            discount : [],
            resources : []
        };

        this.socket = socket;

        this.science = {
            gear : 0,
            compass : 0,
            tablet : 0
        };
        this.gold = 3;
        this.army = 0;
        this.victory = 0;

        this.cardsPerType = new Map();
        this.resources = new Map();
    }

    setCity(city){
        this.city = city;
        if(this.resources.get(city.baseRessource)){
            this.resources.set(city.baseRessource,this.resources.get(city.baseRessource) + 1);
        }
        else{
            this.resources.set(city.baseRessource, 1);
        }
    }

    setHand(cards){
        this.hand = cards;
    }

    isFreeToBuild(id){
        for(let card of this.freeCards){
            if(card === id)
                return true;
        }
        return false;
    }

    isAlreadyBuilt(id){
        for(let card of this.cards){
            if(card.id === id)
                return true;
        }
        return false;
    }

    addCard(card){
        this.cards.push(card);
        if(card.offer){
            this.freeCards.push.apply(this.freeCards,card.offer);
        }
    }

    findCardFromId(id){
        for(let i =0;i < this.hand.length; i++){
            if(this.hand[i].id === id)
                return this.hand[i];
        }
        return -1;
    }

    getCardsId(){
        let cardsId = [];
        for(let i = 0; i< this.hand.length;i++){
            cardsId.push(this.hand[i].id);
        }
        return cardsId;
    }

    getHand(){
        return this.hand;
    }

    getWarPoints(){
        let sum = (acc,curr) => acc +curr;
        let sumRed = (lst) => lst.reduce(sum);
        let points = this.warPoints.map(sumRed);
        return points.reduce(sum);
    }

    getGoldPoints(){
        return Math.floor(this.gold/3);
    }

    getSciencePoints(){
        let gearPoints = Math.pow(this.science.gear,2);
        let compassPoints = Math.pow(this.science.compass,2);
        let tabletPoints = Math.pow(this.science.tablet,2);
        let combo = Math.min(this.science.gear,this.science.compass,this.science.tablet) * 7;
        return gearPoints + compassPoints + tabletPoints + combo;
    }

    getState(){
        return {
            "name": this.name,
            "position": this.position,
            "money": this.gold,
            "warPoints": this.warPoints,
            "city": this.city.id,
            "army": this.army,
            "playedCards": this.cards,
            "warPointsDisplay": this.warPointsDisplay,
            "victory" : this.victory
        };
    }

    getCurrentResources2(){
        let resources = new Map();
        for(let card of this.cards){
            if(card.effectTarget && card.effectTarget !== "tablet" && card.effectTarget !== "compass" && card.effectTarget !== "gear" && card.effectTarget !== "army" && card.effectTarget !== "victory" ){
                if(resources.has(card.effectTarget)){
                    resources.set(card.effectTarget, {quantity: resources.get(card.effectTarget).quantity + card.effectValue, cost: 2});
                }
                else{
                    resources.set(card.effectTarget, {quantity: card.effectValue, cost: 2});
                }
            }
        }
        if(resources.has(this.city.baseRessource))
            resources.set(this.city.baseRessource, {quantity: resources.get(this.city.baseRessource).quantity + 1, cost: 2});
        else
            resources.set(this.city.baseRessource, {quantity: 1, cost: 2});
        return resources;
    }

    getCurrentResources(){
        return this.resources;
    }
    getVictoryPoints(){
        return this.victory + this.getWarPoints() + this.getGoldPoints() + this.getSciencePoints();//TODO Ajouter cartes jaunes, guildes et merveilles
    }
    getEconomyPoints(){
        //TODO
        return 0;
    }
    getGuildPoints(){
        //TODO
        return 0;
    }
    getWonderPoints(){
        //TODO
        return 0;
    }
    getPoints(){
        return {victory: this.getVictoryPoints(), science: this.getSciencePoints(), war: this.getWarPoints(), economy: this.getEconomyPoints(), guild: this.getGuildPoints(), wonder: this.getWonderPoints(), civil: this.victory}
    }
}
module.exports = Player;