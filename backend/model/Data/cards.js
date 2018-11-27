const Card = require('../card');
const ressources = require('../ressources');
let age1 = [];
addCard(age1, {
    id: "A101",
    name: "Caserne",
    age: 1,
    type: "military",
    effect: {
        target: "army",
        value: 1,
    },
    cost: [{name: "ore", quantity: 1}]
});
addCard(age1,  {
    id: "A102",
    name: "Palissade",
    age: 1,
    type: "military",
    effect: {
        target: "army",
        value: 1,
    },
    cost: [{name: "wood", quantity: 1}]
});
addCard(age1, {
    id: "A103",
    name: "Tour de garde",
    age: 1,
    type: "military",
    effect: {
        target: "army",
        value: 1,
    },
    cost: [{name: "clay", quantity: 1}]
});

addCard(age1, {
    id: "B101",
    name: "Théatre",
    age: 1,
    type: "building",
    effect: {
        target: "victory",
        value: 2,
    },
    offer: ["B202"]
});
addCard(age1, {
    id: "B102",
    name: "Prêteur sur gages",
    age: 1,
    type: "building",
    effect: {
        target: "victory",
        value: 3,
    }
});
addCard(age1, {
    id: "B103",
    name: "Autel",
    age: 1,
    type: "building",
    effect: {
        target: "victory",
        value: 2,
    },
    offer: ["B203"]
});
addCard(age1, {
    id: "B104",
    name: "Bains",
    age: 1,
    type: "building",
    effect: {
        target: "victory",
        value: 3,
    },
    cost: [{name: 'stone', quantity: 1}],
    offer: ["B204"]
});

addCard(age1, {
    id: "E101",
    name: "Comptoir Est",
    age: 1,
    type: "economic",
    offer: ["E203"]
});
addCard(age1, {
    id: "E102",
    name: "Comptoir Ouest",
    age: 1,
    type: "economic",
    offer: ["E203"]
});
addCard(age1, {
    id: "E103",
    name: "Marché",
    age: 1,
    type: "economic",
    offer: ["E204"]
});
addCard(age1, {
    id: "E104",
    name: "Taverne",
    age: 1,
    type: "economic"
});

addCard(age1, {
    id: "P101",
    name: "Métier à tisser",
    age: 1,
    type: "product",
    effect: {
        target: "loom",
        value: 1,
    }
});
addCard(age1, {
    id: "P102",
    name: "Verrerie",
    age: 1,
    type: "product",
    effect: {
        target: "glass",
        value: 1,
    }
});
addCard(age1, {
    id: "P103",
    name: "Presse",
    age: 1,
    type: "product",
    effect: {
        target: "papyrus",
        value: 1,
    }
});

addCard(age1, {
    id: "R101",
    name: "Cavité",
    age: 1,
    type: "resource",
    effect: {
        target: "stone",
        value: 1,
    }
});
addCard(age1, {
    id: "R102",
    name: "Bassin argileux",
    age: 1,
    type: "resource",
    effect: {
        target: "clay",
        value: 1,
    }
});
addCard(age1, {
    id: "R103",
    name: "Filon",
    age: 1,
    type: "resource",
    effect: {
        target: "ore",
        value: 1,
    }
});
addCard(age1, {
    id: "R104",
    name: "Chantier",
    age: 1,
    type: "resource",
    effect: {
        target: "wood",
        value: 1,
    }
});
addCard(age1, {
    id: "R105",
    name: "Friche",
    age: 1,
    type: "resource",
    effect: {
        target: "wood/clay",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});
addCard(age1, {
    id: "R106",
    name: "Excavation",
    age: 1,
    type: "resource",
    effect: {
        target: "stone/clay",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});
addCard(age1, {
    id: "R107",
    name: "Fosse argileuse",
    age: 1,
    type: "resource",
    effect: {
        target: "clay/ore",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});
addCard(age1, {
    id: "R108",
    name: "Exploitation forestière",
    age: 1,
    type: "resource",
    effect: {
        target: "stone/wood",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});
addCard(age1, {
    id: "R109",
    name: "Gisement",
    age: 1,
    type: "resource",
    effect: {
        target: "wood/ore",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});
addCard(age1, {
    id: "R110",
    name: "Mine",
    age: 1,
    type: "resource",
    effect: {
        target: "stone/ore",
        value: 1,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age1, {
    id: "S101",
    name: "Officine",
    age: 1,
    type: "science",
    effect: {
        target: "compass",
        value: 1,
    },
    cost: [{name: "loom", quantity: 1}],
    offer: ["A201", "S203"]
});
addCard(age1, {
    id: "S102",
    name: "Scriptorium",
    age: 1,
    type: "science",
    effect: {
        target: "tablet",
        value: 1,
    },
    cost: [{name: "papyrus", quantity: 1}],
    offer: ["B201", "S204"]
});
addCard(age1, {
    id: "S103",
    name: "Atelier",
    age: 1,
    type: "science",
    effect: {
        target: "gear",
        value: 1,
    },
    cost: [{name: "glass", quantity: 1}],
    offer: ["S201", "A203"]
});

let age2 = [];
addCard(age2,{id:"A201"});
addCard(age2,{id:"A202"});
addCard(age2,{id:"A203"});
addCard(age2,{id:"A204"});

addCard(age2,{id:"E201"});
addCard(age2,{id:"E202"});
addCard(age2,{id:"E203"});
addCard(age2,{id:"E204"});

addCard(age2,{id:"M201"});
addCard(age2,{id:"M202"});
addCard(age2,{id:"M203"});
addCard(age2,{id:"M204"});

addCard(age2,{id:"R201"});
addCard(age2,{id:"R202"});
addCard(age2,{id:"R203"});
addCard(age2,{id:"R204"});

addCard(age2,{id:"S201"});
addCard(age2,{id:"S202"});
addCard(age2,{id:"S203"});
addCard(age2,{id:"S204"});

let age3 = [];
addCard(age3,{id:"A301"});
addCard(age3,{id:"A302"});
addCard(age3,{id:"A303"});
addCard(age3,{id:"A304"});

addCard(age3,{id:"E301"});
addCard(age3,{id:"E302"});
addCard(age3,{id:"E303"});
addCard(age3,{id:"E304"});

addCard(age3,{id:"G301"});
addCard(age3,{id:"G302"});
addCard(age3,{id:"G303"});
addCard(age3,{id:"G304"});
addCard(age3,{id:"G305"});
addCard(age3,{id:"G306"});
addCard(age3,{id:"G307"});
addCard(age3,{id:"G308"});
addCard(age3,{id:"G309"});
addCard(age3,{id:"G310"});

addCard(age3,{id:"S301"});
addCard(age3,{id:"S302"});
addCard(age3,{id:"S303"});
addCard(age3,{id:"S304"});
addCard(age3,{id:"S305"});

shuffleArray(age1);
shuffleArray(age2);
shuffleArray(age3);

function addCard(list,cardInfos){
    list.push(new Card(cardInfos));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = {
    age1: age1,
    age2: age2,
    age3: age3
};