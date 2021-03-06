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

    /**     *
     * @param card
     * @param player
     * @param neighbors
     * return if the card is playable and with which resource it is playable
     */
    getCardResources(card, player, neighbors) {
        let prices = computePrices(player, neighbors);
        let playerMoney = player.getState()["money"];
        let cardResources = {};
        //if we already got the card we can't build it
        if(player.isAlreadyBuilt(card.id) || card.id.includes("E3")) {
            cardResources["isPlayable"] = false;
            return cardResources;
        }

        //if we can build the card for free
        if(player.isFreeToBuild(card.id)){
            cardResources["isPlayable"] = true;
            cardResources["tree"] = true;
            return cardResources;
        }
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
        //getting all Combinations with player's resources only
        let combInit = [];
        combInit.push(new Map());
        let combinations = getCombinations(player.getAllResources(), combInit);
        //finding working combinations with player's resources only
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
                    let result = getUsefullAndMissingPersonalResources(player.getAllResources(), card.cost);
                    cardResources["usefullResources"] = strMapToArray(result.usefullResources); //resources used to build card
                    cardResources["missingRessources"] = strMapToArray(result.missingRessources);// resources needed but not owned
                    cardResources["stayingResources"] = strMapToArray(result.stayingResources); //resources useless + or resource

                    cardResources["availableResources"] = getNeighborResources(player,neighbors);
                }
            }
        }
        else {
           cardResources["isPlayable"] = true;
        }
        return cardResources;
    }

    /**
     *
     * @param hasFinish
     * @param cost
     * @param player
     * @param neighbors
     * return if the wonderstep is playable and with which resource it is playable
     */
    getWonderStepResources(hasFinish, cost, player ,neighbors){
        let wonderStepResources = {};
        //the player has already built all wondersteps
        if(hasFinish){
            wonderStepResources["isPlayable"] = false;
            return wonderStepResources;
        }
        let prices = computePrices(player, neighbors);
        let playerMoney = player.getState()["money"];

        //getting all Combinations with player's resources only
        let combInit = [];
        combInit.push(new Map());
        let combinations = getCombinations(player.getAllResources(), combInit);
        //finding working combinations with player's resources only
        let solutions = getSolutions(combinations, cost, [], 0);
        if(solutions.length > 0) {
            wonderStepResources["isPlayable"] = true;
        }
        else {
            let allCombinations = getAllCombinations(combinations, neighbors);
            let allSolutions = getSolutions(allCombinations, cost, prices, playerMoney);
            if (allSolutions.length === 0) {
                wonderStepResources["isPlayable"] = false;
                return wonderStepResources;
            }
            else {
                wonderStepResources["isPlayable"] = true;
                let result = getUsefullAndMissingPersonalResources(player.getAllResources(), cost);
                wonderStepResources["usefullResources"] = strMapToArray(result.usefullResources); //resources used to build card
                wonderStepResources["missingRessources"] = strMapToArray(result.missingRessources);// resources needed but not owned
                wonderStepResources["stayingResources"] = strMapToArray(result.stayingResources); //resources useless + or resource
                wonderStepResources["availableResources"] = getNeighborResources(player, neighbors);
            }
        }
        return wonderStepResources;
    }
}
module.exports = Card;

/**
 *
 * @param playerResources
 * @param cost of the card
 * @returns {{missingRessources: Map<type, quantity>, usefullResources: Map<type, quantity>, stayingResources: Map<type, quantity>}}
 * returning resources that the player need to buy, the ones which are useful and the ones that the user has and will use to build the building
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
        stayingResources.set(resourceName, playerResources.get(resourceName));
    }
    for(let resource of tmpCost){
        if (playerResources.has(resource.name) && playerResources.get(resource.name) >= resource.quantity) {
            usefullResources.set(resource.name, resource.quantity);
            stayingResources.set(resource.name, stayingResources.get(resource.name) - resource.quantity);
            if(stayingResources.get(resource.name) === 0){
                stayingResources.delete(resource.name);
            }
            resource["quantity"] = 0;
        }
        else if (playerResources.has(resource.name) && playerResources.get(resource.name) < resource.quantity) {
            resource.quantity = resource.quantity - playerResources.get(resource.name);
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

/**
 * check in all combinations which ones are good and enable the player to build the building
 * check that all needed resources are in the combination and the price of it is lesser or equal to the player money
 * @param combinations
 * @param cost
 * @param prices
 * @param playerMoney
 * @returns {Array}
 */
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

/**
 * compute all resources combinations from the player and it's neighbor resources
 * @param playerCombinations
 * @param neighbors
 * @returns {*[] | *}
 */
function getAllCombinations(playerCombinations, neighbors) {
    let c = getCombinations(neighbors[0].getCurrentResources(), playerCombinations);
    return getCombinations(neighbors[1].getCurrentResources(), c);
}

/**
 * compute all resources combinations from the player
 * @param resources
 * @param combinations
 * @returns {*}
 */
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
                combination.set(resourceName, resources.get(resourceName) + (combination.has(resourceName) ? combination.get(resourceName) : 0));
            }
        }
    }
    return combinations;
}

function isResource(name){
    return (name === "stone" || name === "wood" || name === "ore" || name === "clay"  || name === "stone/wood"  || name === "stone/clay"|| name === "clay/ore");
}

function isProduct(name){
    return (name === "loom" || name === "glass" || name === "papyrus");
}

function getNeighborResources(player, neighbors) {
    let res = [];
    let discount = player.effect.discount;
    let map1;
    let map2;
    let obj;
    for(let i = 0; i < 2 ; i++) {
        map1 = new Map();
        map2 = new Map();
        let resources = neighbors[i].getCurrentResources();
        let data = {
            "player" : neighbors[i].getState(),
            "resources" : []
        };

        for (let resourceName of resources.keys()){
            obj = {
                "cost" : 2,
                "quantity" : 0
            };
            if(discount.length > 0){
                obj.cost = 1;
                if(discount.includes("left") && i === 0 && isResource(resourceName)){
                    obj.quantity =  resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0);
                    map1.set(resourceName,obj);
                }
                else if(discount.includes("right") && i === 1 && isResource(resourceName)){
                    obj.quantity =  resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0);
                    map1.set(resourceName,obj);
                }
                else if(discount.includes("both") && isProduct(resourceName)){
                    obj.quantity =  resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0);
                    map1.set(resourceName,obj);
                }
                else{
                    obj.cost = 2;
                    obj.quantity =  resources.get(resourceName) + (map2.has(resourceName)? map2.get(resourceName) : 0);
                    map2.set(resourceName,obj);
                }
            }
            else {
                obj.cost = 2;
                obj.quantity =  resources.get(resourceName) + (map2.has(resourceName)? map2.get(resourceName) : 0);
                map2.set(resourceName,obj);            }
        }
        data.resources.push.apply(data.resources,strMapToArray(map1));
        data.resources.push.apply(data.resources,strMapToArray(map2));
        res.push(data);
    }
    return res;
}

/**
 * return an array containing type and quantity of resources for each possible price (1,2 or 3 gold)
 * @param player
 * @param neighbors
 * @returns {Array}
 */
function computePrices(player, neighbors) {
    let playerResources = player.getAllResources();
    let prices = [];
    let discount = player.effect.discount;
    let map0 = new Map();
    for(let resourceName of playerResources.keys()){
        if(resourceName !== "gold" && resourceName !== "victory"){
            map0.set(resourceName, playerResources.get(resourceName));
        }
    }
    let map1 = new Map();
    let map2 = new Map();
    for(let i = 0; i < 2 ; i++) {
        let resources = neighbors[i].getCurrentResources();
        for (let resourceName of resources.keys()){
            if(discount.length > 0){
                if(discount.includes("left") && i === 0 && isResource(resourceName)){
                    map1.set(resourceName, resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0));
                }
                else if(discount.includes("right") && i === 1 && isResource(resourceName)){
                    map1.set(resourceName, resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0));
                }
                else if(discount.includes("both") && isProduct(resourceName)){
                    map1.set(resourceName, resources.get(resourceName) + (map1.has(resourceName)? map1.get(resourceName) : 0));
                }
                else
                    map2.set(resourceName, resources.get(resourceName) + (map2.has(resourceName)? map2.get(resourceName) : 0));
            }
            else {
                map2.set(resourceName, resources.get(resourceName) + (map2.has(resourceName)? map2.get(resourceName) : 0));
            }
        }
    }
    prices.push(map0);
    prices.push(map1);
    prices.push(map2);
    return prices;
}

/**
 * check if the solution price is lesser or equal to the player moeny
 * @param combination
 * @param prices
 * @returns {number}
 */
function checkSolutionPrice(combination, prices) {
    let prices1 = [];
    for(let price of prices){
        prices1.push(copyMap(price));
    }
    let value = 0;
    let finalPrice = 0;
    //for each resource of the combination
    for(let resourceName of combination.keys()){
        //for each price (1, 2 or 3 golds)
        for(let price of prices1){
            //for each resource for that price
            for(let priceName of price.keys()){
                //the resourcename contains / (it's a or resource) or it is equal
                if(priceName.includes(resourceName) || priceName === resourceName){
                    let quantity;
                    if(price.get(priceName) >= combination.get(resourceName)){
                        quantity = combination.get(resourceName);
                        combination.delete(resourceName);
                        quantity === price.get(priceName) ? price.delete(priceName) : price.set(priceName, price.get(priceName) - quantity);
                        finalPrice += (value * quantity);
                        break
                    }
                    else if(price.get(priceName) >= 0) {
                        quantity = price.get(priceName);
                        combination.set(resourceName, combination.get(resourceName) - quantity);
                        price.delete(priceName);
                        finalPrice += (value * quantity);
                    }
                }
            }
            value++;
        }
        value = 0;
    }
    return finalPrice;
}
function strMapToArray(strMap) {
    let result = [];
    let obj;
    for (let [k,v] of strMap) {
        obj = Object.create(null);
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj["type"] = k;
        obj["quantity"] = v+-["quantity"] ? v.quantity : v;
        v["cost"]? obj["cost"] = v.cost : null;
        result.push(obj);
    }
    return result;
}