class Card {
    constructor(infos) {
        this.id = infos.id;
        this.name = infos.name;
        this.age = infos.age;
        this.type = infos.type;
        if(infos.effect) {
            this.effectTarget = infos.effect.target;
            this.effectValue = infos.effect.value;
        }
        if(infos.cost)
            this.cost = infos.cost;
        if(infos.offer)
            this.offer = infos.offer;
    }

    getInfos(){
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            type: this.type,
            effectTarget: this.effectTarget,
            effectValue: this.effectValue,
            cost: this.cost,
            offer: this.offer
        };
    }

    getMissingResources(resources){
        let missingResources = [];
        if(this.cost) {
            for (let resource of this.cost) {
                if (!resources.has(resource.name) || resources.get(resource.name) < resource.quantity) {
                    missingResources.push(resource);
                }
            }
        }
        return missingResources;
    }

    play(action){

    }
}
module.exports = Card;