class Action {
    constructor(type,card,pseudo,board) {
        this.type = type;
        this.card = card;
        this.pseudo = pseudo;
        this.board = board;
    }

    getData(){
        return {
            "player": this.pseudo,
            "action": this.type,
            "cardId": this.card
        };
    }

    play(){
        let player = this.board.findPlayer(this.pseudo);
        player.actions.push(this.getData());
        let playedCard = player.findCardFromId(this.card);

        console.log(player.hand.indexOf(playedCard));
        player.hand.splice(player.hand.indexOf(playedCard),1);
        switch (this.type) {
            case("wonderStep"):
                break;
            case("building"):
                player.addCard(playedCard);
                break;
            case("discarding"):
                this.board.discarded.push(playedCard);
                break;
        }
    }

}
module.exports = Action;