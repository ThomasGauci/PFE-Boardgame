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

    getCardResources(card, playerResources, neighbors){
        //getting all Combinations with player's ressources only
        let combInit = [];
        combInit.push(new Map());
        let combinations = getCombinations(playerResources, combInit);
        //finding working combinations with player's ressources only
        let cardResources = {};
        if(card.cost){
            let solutions = getSolutions(combinations, card.cost);
            if(solutions.length > 0) {
                cardResources["isPlayable"] = true;
            }
            else {
                let allCombinations = getAllCombinations(combinations, neighbors);
                let allSolutions = getSolutions(allCombinations, card.cost);
                if(solutions.length === 0){
                    cardResources["isPlayable"] = false;
                    return cardResources;
                }
                else {
                    cardResources["isPlayable"] = true;
                    cardResources["playerResources"] = getUsefullPersonalResources(playerResources, card.cost);
                    let result = getUsefullAndMissingPersonalResources(playerResources, card.cost);
                    cardResources["usefullResources"] = result.usefullResources; //resources used to build card
                    cardResources["missingRessources"] = result.missingRessources;// resources needed but not owned
                    cardResources["stayingResources"] = result.stayingResources; //resources useless + or resources
                }
            }
        }
        else {
           cardResources["isPlayable"] = true;
        }
        return cardResources;
    }

    play(action){

    }
}
module.exports = Card;

/**
 * preselect personal resources
 */
function getUsefullAndMissingPersonalResources(playerResources, cost) {
    let missingRessources = new Map();
    let usefullResources = new Map();
    let stayingResources = new Map();
    for(let resource of playerResources) {
        stayingResources.set(resource,resource.quantity);
    }
    for(let resource of cost){
        if (playerResources.has(resource.name) && playerResources.get(resource.name) >= resource.quantity) {
            usefullResources.set(resource.name,resource.quantity);
            cost.delete(resource.name);
            stayingResources.set(resource.name, playerResources.get(resource.name) - resource.quantity);
        }
        else if (playerResources.has(resource.name) && playerResources.get(resource.name) < resource.quantity) {
            cost.set(resource.name, cost.get(resource.name) - playerResources.get(resource.name));
            missingRessources.set(resource.name, cost.get(resource.name));
            stayingResources.delete(resource.name);
        }
        else {
            missingRessources.set(resource.name, cost.get(resource.name));
        }
    }
    return {missingRessources: missingRessources, usefullResources: usefullResources, stayingResources: stayingResources};
}
function copyMap(oldMap) {
    let newMap = new Map();
    for(let key of oldMap.keys()){
        newMap.set(key,oldMap.get(key));
    }
    return newMap;
}

function getSolutions(combinations, cost) {
    let solutions = [];
    for(let combination of combinations) {
        let missingResources = [];
        for (let resource of cost) {
            if (!combination.has(resource.name) || combination.get(resource.name) < resource.quantity) {
                missingResources.push(resource);
            }
        }
        if(missingResources.length === 0){
            solutions.push(combination);
        }
    }
    return solutions;
}

function getAllCombinations(playerCombinations, neighbors) {
    let c = getCombinations(neighbors[0].getCurrentResources(), playerCombinations);
    return getCombinations(neighbors[1].getCurrentResources(), c);
}

function getCombinations(resources, combinations) {
    console.log(resources);
    for(let resourceName of resources.keys()) {
        if(resourceName.includes("/")) {
            let resourcesNames = resourceName.split("/");
            let newCombinations = [];
            for(let resource of resourcesNames) {
                for(let combination of combinations) {
                    let currentCombination = copyMap(combination);
                    if(currentCombination.has(resource)) {
                        currentCombination.set(resource, resources.get(resource) + 1);
                    }
                    else {
                        currentCombination.set(resource, 1)
                    }
                    newCombinations.push(currentCombination);
                }
            }
            combinations = [];
            combinations = newCombinations.slice(0, newCombinations.length);
        }
        else {
            for(let combination of combinations) {
                combination.set(resourceName, resources.get(resourceName) + (combination.has(resourceName) ? combination.get(resourceName) : 0));
            }
        }
    }
    return combinations;
}