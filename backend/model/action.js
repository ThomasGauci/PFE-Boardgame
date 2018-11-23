class Action {
    constructor(type,card,pseudo) {
        this.type = type;
        this.card = card;
        this.pseudo = pseudo;
    }

    getData(){
        return {
            "player": this.pseudo,
            "action": this.type,
            "cardId": this.card
        };
    }
}
module.exports = Action;