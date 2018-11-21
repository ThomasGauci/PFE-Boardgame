class Board {
    constructor(){
        this.players = [];
        this.freePlaces = [1,2,3,4];
    }

    addPlayer(player){
        let i = this.freePlaces.indexOf(player.position);
        this.freePlaces.slice(i,1);
        this.players.push(player);
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
}
module.exports = Board;