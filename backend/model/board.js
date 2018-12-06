class Board {
    constructor(){
        this.players = [];
        this.freePlaces = [1,2,3,4];
        this.discarded = [];
        this.age = 0;
        this.turn = 0;
        this.warPointPerAge = [1,3,5];
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
        if(this.age%2 === 1){       //left
            this.swapHands(0,1);
            this.swapHands(2,3);
            this.swapHands(0,2);
        }else{                      //right
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
            if(parseInt(position) === this.players[i].position){
                return this.players[i];
            }
        }
        return -1;
    }

    findNeighbor(position){
        let neighbor = {"left":null,"right":null};
        if(position === 0){
            neighbor.left = this.players[position+1];
            neighbor.right = this.players[3];
        }else if(position === 3){
            neighbor.left = this.players[0];
            neighbor.right = this.players[position-1];
        }
        else {
            neighbor.left = this.players[position+1];
            neighbor.right = this.players[position-1];
        }
        return neighbor;
    }

    newAge(cards){
        this.age++;
        this.turn = 0;
        if(this.age === 1)
            this.distributeCards(cards.age1.slice());
        else if(this.age === 2 )
            this.distributeCards(cards.age2.slice());
        else this.distributeCards(cards.age3.slice());
    }

    battle(){
        let gainedPoint = this.warPointPerAge[this.age-1];
        let neighbor;
        let war = [];
        let data;
        for(let i = 0; i < this.players.length ; i++){
            neighbor = [this.findNeighbor(i).left,this.findNeighbor(i).right];
            for(let j = 0; j < neighbor.length ; j++){
                if(this.players[i].army > neighbor[j].army){
                    this.players[i].warPoints[this.age-1].push(gainedPoint);
                    this.players[i].warPointsDisplay.push(gainedPoint);
                    data = {
                        winner : this.players[i].getState(),
                        loser : neighbor[j].getState()
                    };
                    war.push(data);
                }
                else if(this.players[i].army < neighbor[j].army){
                    this.players[i].warPoints[this.age-1].push(-1);
                    this.players[i].warPointsDisplay.push(-1);
                    this.players[i].lostWars++;
                }
                else{
                }
            }
        }
        return war;
    }




    calculateWinner(){
        let res = [];
        let sum = 0;
        for(let player of this.players){
            sum = 0;
            sum = player.victory + player.getWarPoints() + player.getGoldPoints() + player.getSciencePoints();
            let data = {
                "player" : {
                    position: player.position,
                    name : player.name
                },
                victory : player.victory,
                war : player.getWarPoints(),
                gold : player.getGoldPoints(),
                wonder: null,
                science : player.getSciencePoints(),
                economy:null,
                total : sum,
                rank : player.position
            };
            res.push(data);
        }

        /*for(let i = 0 ; i < this.players.length; i++){
            for(let j = i+1 ; j< this.players.length; j++){
                if(res[i].total > res[j].total){
                    //if(res[i])
                }
            }
        }*/
        return res;
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
            let resources = card.getCardResources(card, this.players[playerIndex], playerNeighbors);
            availableMoves.push({
                card: card.getInfos(),
                isPlayable: resources.isPlayable,
                missingResources: resources.missingRessources,
                usefullResources: resources.usefullResources,
                stayingResources: resources.stayingResources,
                availableResources: resources.availableResources

            });
        }
        return availableMoves;
    }
}
module.exports = Board;