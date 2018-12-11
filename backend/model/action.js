class Action {
    constructor(type,card,player,board, purchases) {
        this.type = type;
        this.card = card;
        this.player = player;
        this.board = board;
        this.purchases = purchases;
    }

    getData(){
        return {
            "player": this.player.getState(),
            "action": this.type,
            "cardId": this.card,
            "purchases": this.purchases
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
                if(playedCard.cost) //If card cost money then remove money from buyer
                    for(let resource of playedCard.cost)
                        if(resource.name === 'gold')
                            this.player.gold -= resource.quantity;
                if(this.purchases) //Switch money from buyer to seller
                    for(let purchase of this.purchases){
                        let seller = this.board.findPlayer(purchase.seller);
                        this.player.gold -= purchase.price;
                        seller.gold += purchase.price;
                    }
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
        let target = playedCard.effectTarget;
        switch (type) {
            case("military"):
                this.player.army += value;
                break;
            case("building"):
                this.player.victory += value;
                break;
            case("economic"):
                this.playEconomicCard(playedCard,target,value);
                break;
            case("product"):
                if(this.player.resources.get(target)){
                    let newVal = this.player.resources.get(target) + value;
                    this.player.resources.set(target,newVal);
                }else{
                    this.player.resources.set(target,value);
                }
                break;
            case("resource"):
                if(this.player.resources.get(target)){
                    let newVal = this.player.resources.get(target) + value;
                    this.player.resources.set(target,newVal);
                }else{
                    this.player.resources.set(target,value);
                }
                break;
            case("science"):
                if(target === "gear"){
                    this.player.science.gear++;
                }else if(target ==="compass"){
                    this.player.science.compass++;
                }else{
                    this.player.science.tablet++;
                }
                break;
            case("guild"):
                if(target === "science"){
                    this.player.science.multiple++;
                }
                else{
                    this.player.effect.guild.push({"target":target,"value":value});
                    console.log(this.player.effect.guild);
                }
                break;
        }
        if(this.player.cardsPerType.get(type)){
            let val = this.player.cardsPerType.get(type) + 1;
            this.player.cardsPerType.set(type,val);
        }else{
            this.player.cardsPerType.set(type,1);
        }
    }

    playEconomicCard(playedCard,target,value){
        switch (target) {
            case("gold"):
                this.player.gold += value;
                break;
            case("dynamicGold"):
                let goldWon;
                goldWon = this.board.getNeighborsNumberCards(this.player.position,value);
                if(this.player.cardsPerType.get(value)){
                    goldWon += this.player.cardsPerType.get(value);
                }
                if(value === "product")
                    goldWon *= 2;
                this.player.gold += goldWon;
                break;
            case("discount"):
                this.player.effect.discount.push(value);
                break;
            case("resources"):
                this.player.effect.resources.push(value);
                break;
            default:
                /*let effect = {
                    target: target,
                    value: value
                };
                this.player.effect.push(effect);*/
                break
        }
    }
}
module.exports = Action;