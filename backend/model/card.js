class Card {
    constructor(infos) {
        this.id = infos.id;
        this.name = infos.name;
        this.age = infos.age;
        this.type = infos.type;
        if(infos.effect) {
            this.effectTarget = infos.effect.target;
            this.effectValue = infos.effect.value;
        } else {
            this.effectTarget = null;
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

    getCardResources(card, player, neighbors) {
        let playerResources = player.getCurrentResources();
        let prices = computePrices(playerResources, neighbors);
        let playerMoney = player.getState()["money"];
        let cardResources = {};
        //card cost is money only
        if(card.cost && card.cost[0].name === "gold"){
            //not enough gold to buy card
            if(playerMoney < card.cost[0].quantity){
                cardResources["isPlayable"] = false;
                return cardResources;
            }
            //enough money to buy card
            else {
                cardResources["isPlayable"] = true;
                return cardResources;
            }
        }
        //getting all Combinations with player's ressources only
        let combInit = [];
        combInit.push(new Map());
        let combinations = getCombinations(playerResources, combInit);
        //finding working combinations with player's ressources only
        if(card.cost){
            let solutions = getSolutions(combinations, card.cost, [], 0);
            if(solutions.length > 0) {
                cardResources["isPlayable"] = true;
            }
            else {
                let allCombinations = getAllCombinations(combinations, neighbors);
                let allSolutions = getSolutions(allCombinations, card.cost, prices, playerMoney);
                if(allSolutions.length === 0){
                    cardResources["isPlayable"] = false;
                    return cardResources;
                }
                else {
                    cardResources["isPlayable"] = true;
                    let result = getUsefullAndMissingPersonalResources(playerResources, card.cost);
                    cardResources["usefullResources"] = strMapToObj(result.usefullResources); //resources used to build card
                    cardResources["missingRessources"] = strMapToObj(result.missingRessources);// resources needed but not owned
                    cardResources["stayingResources"] = strMapToObj(result.stayingResources); //resources useless + or resources
                    let availableResources = [];
                    for(let neighbor of neighbors){
                        let obj = {player: neighbor.getState(), resources: strMapToObj(neighbor.getCurrentResources())};
                        availableResources.push(obj);
                    }
                    cardResources["availableResources"] = availableResources;
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
    let tmpCost = [];
    for(let resource of cost){
        tmpCost.push({quantity: resource.quantity, name: resource.name});
    }
    for(let resourceName of playerResources.keys()) {
        stayingResources.set(resourceName, playerResources.get(resourceName).quantity);
    }
    for(let resource of tmpCost){
        if (playerResources.has(resource.name) && playerResources.get(resource.name).quantity >= resource.quantity) {
            usefullResources.set(resource.name, resource.quantity);
            stayingResources.set(resource.name, stayingResources.get(resource.name) - resource.quantity);
            if(stayingResources.get(resource.name) === 0){
                stayingResources.delete(resource.name);
            }
            resource["quantity"] = 0;
        }
        else if (playerResources.has(resource.name) && playerResources.get(resource.name).quantity < resource.quantity) {
            resource.quantity = resource.quantity - playerResources.get(resource.name).quantity;
            missingRessources.set(resource.name, resource.quantity);
            stayingResources.delete(resource.name);
        }
        else {
            missingRessources.set(resource.name, resource.quantity);
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

function getSolutions(combinations, cost, prices, playerMoney) {
    let solutions = [];
    for(let combination of combinations) {
        let missingResources = [];
        let neededResources = new Map();
        for (let resource of cost) {
            if ((!combination.has(resource.name) || combination.get(resource.name) < resource.quantity)) {
                missingResources.push(resource);
            }
            else {
                neededResources.set(resource.name, resource.quantity);
            }
        }
        if(missingResources.length === 0 && (prices.length === 0 || checkSolutionPrice(neededResources, prices,) <= playerMoney)){
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
    for(let resourceName of resources.keys()) {
        if(resourceName.includes("/")) {
            let resourcesNames = resourceName.split("/");
            let newCombinations = [];
            for(let resource of resourcesNames) {
                for(let combination of combinations) {
                    let currentCombination = copyMap(combination);
                    if(currentCombination.has(resource)) {
                        currentCombination.set(resource, currentCombination.get(resource) + 1);
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
        else  {
            for(let combination of combinations) {
                combination.set(resourceName, resources.get(resourceName).quantity + (combination.has(resourceName) ? combination.get(resourceName) : 0));
            }
        }
    }
    return combinations;
}

function computePrices(playerResources, neighbors) {
    let prices = [];
    let map0 = new Map();
    for(let resourceName of playerResources.keys()){
        if(resourceName !== "gold" && resourceName !== "victory"){
            map0.set(resourceName, playerResources.get(resourceName).quantity)
        }
    }
    let map1 = new Map();
    let map2 = new Map();
    for(let neighbor of neighbors) {
        let resources = neighbor.getCurrentResources();
        for (let resourceName of resources.keys()){
            if(resources.get(resourceName).cost === 1){
                map1.set(resourceName, resources.get(resourceName).quantity + map1.has(resourceName)? map1.get(resourceName) : 0);
            }
            else {
                map2.set(resourceName, resources.get(resourceName).quantity + (map2.has(resourceName)? map2.get(resourceName) : 0));
            }
        }
    }
    prices.push(map0);
    prices.push(map1);
    prices.push(map2);
    return prices;
}

function checkSolutionPrice(combination, prices) {
    let prices1 = [];
    for(let price of prices){
        prices1.push(copyMap(price));
    }
    let value = 0;
    let finalPrice = 0;
    for(let resourceName of combination.keys()){
        for(let price of prices1){
            for(let priceName of price.keys()){
                if(priceName.includes(resourceName)){
                    resourceName = priceName;
                    break
                }
            }
            if(price.has(resourceName)){
                let quantity;
                if(price.get(resourceName) >= combination.get(resourceName)){
                   quantity = combination.get(resourceName);
                   combination.delete(resourceName);
                   quantity === price.get(resourceName) ? price.delete(resourceName) : price.set(resourceName, price.get(resourceName) - quantity);
                   finalPrice += (value * quantity);
                   break
                }
                else if(price.get(resourceName) >= 0) {
                    quantity = price.get(resourceName);
                    combination.set(resourceName, combination.get(resourceName) - quantity);
                    price.delete(resourceName);
                    finalPrice += (value * quantity);
                }
            }
            value++;
        }
        value = 0;
    }
    return finalPrice;
}
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj["type"] = k;
        obj["quantity"] = v["quantity"] ? v.quantity : v;
        v["cost"]? obj["cost"] = v.cost : null;
    }
    return obj;
}