class Player {
    constructor(name,position) {
        this.name = name;
        this.position = position;
        this.cards = [];
        this.gold = 0;
        this.army = 0;
        this.wardPoint = 0;
    }
}

export { Player };