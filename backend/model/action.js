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
                this.play(playedCard);
                break;
            case("discarding"):
                this.board.discarded.push(playedCard);
                this.player.gold += 3;
                break;
        }
    }

    undo(){
    }

    play(playedCard){
        let type = playedCard.type;
        let value = playedCard.effectValue;
        switch (type) {
            case("military"):
                this.player.army += value;
                break;
            case("building"):
                this.player.victory += value;
                break;
            case("economic"):
                break;
            case("product"):
                break;
            case("resource"):
                break;
            case("science"):
                let target = playedCard.effectTarget;
                if(target === "gear"){
                    this.player.science.gear++;
                }else if(target ==="compass"){
                    this.player.science.compass++;
                }else{
                    this.player.science.tablet++;
                }
                break;
            case("guild"):
                break;
        }
    }
}
module.exports = Action;