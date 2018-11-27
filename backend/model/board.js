class Board {
    constructor(){
        this.players = [];
        this.freePlaces = [1,2,3,4];
        this.discarded = [];
        this.age = 0;
        this.turn = 0;
    }

    addPlayer(player){
        let i = this.freePlaces.indexOf(player.position);
        this.freePlaces.slice(i,1);
        this.players[i] = player;
    }

    getTookPlaces(){
        let tookPlaces = [];
        let pos;
        let n;
        for (let i = 0; i < this.players.length; i++) {
            pos = this.players[i].position;
            n = this.players[i].name;
            tookPlaces.push({"name":n.toString(),
                "position":pos.toString()});
        }
        return tookPlaces;
    }

    distributeCities(cities){
        for(let i = 0; i<this.players.length;i++){
            this.players[i].setCity(cities[i]);
        }
    }

    changeHands(){
        if(this.age%2 === 1){
            this.swapHands(0,1);
            this.swapHands(2,3);
            this.swapHands(0,2);
        }else{
            this.swapHands(0,2);
            this.swapHands(0,1);
            this.swapHands(2,3);
        }
    }

    swapHands(p1,p2){
        let tmp = this.players[p1].hand;
        this.players[p1].hand = this.players[p2].hand;
        this.players[p2].hand = tmp;
    }


    distributeCards(cards){
        let packets = [];
        let half = cards.splice(cards.length/2);
        packets.push(half.splice(half.length/2));
        packets.push(half);
        packets.push(cards.splice(cards.length/2));
        packets.push(cards);

        for(let i = 0; i<this.players.length;i++){
            this.players[i].setHand(packets[i]);
        }
    }

    findPlayer(position){
        for(let i=0; i<this.players.length;i++){
            if(position === this.players[i].position){
                return this.players[i];
            }
        }
        return -1;
    }

    getPlayerNeighbors(playerPosition){
        let neighbors = [];
        neighbors.push(this.players[(playerPosition+2)%4]);
        neighbors.push(this.players[playerPosition%4]);
        return neighbors;
    }

    getPlayerAvailableMoves(playerIndex){ //TODO: ici Pierre
        const playerHand = this.players[playerIndex].getHand();
        const playerNeighbors = this.getPlayerNeighbors(this.players[playerIndex].position);
        let availableMoves = [];
        for(let card of playerHand){
            let isPlayable = false;
            let missingResources = card.getMissingResources(this.players[playerIndex].getCurrentResources());
            let availableResources = [];

            if(missingResources.length > 0) {
                for (let resource of missingResources) {
                    for (let neighbor of playerNeighbors) {
                        let neighborAvailableResources = [];
                        let neighborResources = neighbor.getCurrentResources();
                        if (neighborResources.has(resource.name) && neighborResources.get(resource.name) >= resource.quantity) {
                            neighborAvailableResources.push({
                                type: resource.name,
                                quantity: neighborResources.get(resource.name),
                                price: 2 //TODO: Change price if discount
                            });
                        }
                        if(neighborAvailableResources.length > 0) {
                            availableResources.push({
                                player: neighbor.getState(),
                                resources: neighborAvailableResources
                            });
                        }
                    }
                }
            }

            availableMoves.push({
                card: card.getInfos(),
                isPlayable: isPlayable,
                missingResources: missingResources.length > 0 ? missingResources : null,
                availableResources: availableResources.length > 0 ? availableResources : null
            });
        }
        return availableMoves;
    }
}
module.exports = Board;