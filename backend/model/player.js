class Player {
    constructor(name,position,socket) {
        this.name = name;
        this.position = position;
        this.hand = [];
        this.cards = [];
        this.actions = [];
        this.gold = 3;
        this.army = 0;
        this.wardPoint = 0;
        this.city = null;
        this.socket = socket;
    }

    setCity(city){
        this.city = city;
    }

    setHand(cards){
        this.hand = cards;
    }

    addCard(card){
        this.cards.push(card);
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

    getState(){
        return {
            "name": this.name,
            "position": this.position,
            "money": this.gold,
            "warPoints": this.wardPoint,
            "city": this.city.id,
            "army": this.army,
            "playedCards": this.cards
        };
    }
}
module.exports = Player;