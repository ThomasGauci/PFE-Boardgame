class Action {
    constructor(type,card,player,board) {
        this.type = type;
        this.card = card;
        this.player = player;
        this.board = board;
    }

    getData(){
        return {
            "player": this.player.getState(),
            "action": this.type,
            "cardId": this.card
        };
    }

    do(){
        this.player.actions.push(this.getData());
        let playedCard = this.player.findCardFromId(this.card);

        this.player.hand.splice(this.player.hand.indexOf(playedCard),1);
        switch (this.type) {
            case("wonderStep"):
                break;
            case("building"):
                this.player.addCard(playedCard);
                break;
            case("discarding"):
                this.board.discarded.push(playedCard);
                this.player.gold += 3;
                break;
        }
    }

    undo(){
    }
}
module.exports = Action;