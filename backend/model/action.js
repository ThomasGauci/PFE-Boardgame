class Action {
    constructor(type,card,player,board) {
        this.type = type;
        this.card = card;
        this.player = player;
        this.board = board;
    }

    getData(){
        return {
            "player": this.player.name,
            "position": this.player.position,
            "action": this.type,
            "cardId": this.card
        };
    }

    play(){
        this.player.actions.push(this.getData());
        let playedCard = this.player.findCardFromId(this.card);

        console.log(this.player.hand.indexOf(playedCard));
        this.player.hand.splice(this.player.hand.indexOf(playedCard),1);
        switch (this.type) {
            case("wonderStep"):
                break;
            case("building"):
                this.player.addCard(playedCard);
                break;
            case("discarding"):
                this.board.discarded.push(playedCard);
                break;
        }
    }

    undo(){

    }
}
module.exports = Action;