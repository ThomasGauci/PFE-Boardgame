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
        this.effect = {
            discount : [],
            resources : [],
            guild : [],
        };

        this.socket = socket;

        this.science = {
            gear : 0,
            compass : 0,
            tablet : 0,
            multiple : 0
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

    getCurrentResources(){
        return this.resources;
    }

    getAllResources(){
        let allRes = new Map(this.resources);
        for(let effect of this.effect.resources){
            if(allRes.get(effect))
                allRes.set(effect,allRes.get(effect) + 1);
            else allRes.set(effect,1);
        }
        return allRes;
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