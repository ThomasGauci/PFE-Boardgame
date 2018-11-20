class Board {
    constructor(){
        this.players = [];
        this.places = [1,2,3,4];
    }

    addPlayer(player){
        let i = this.places.indexOf(player.position);
        this.places.slice(i,1);
        this.players.push(player);
    }
}

export { Board };