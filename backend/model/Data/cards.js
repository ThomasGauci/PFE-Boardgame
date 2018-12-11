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
    effect: {
        target: "discount",
        value: "right"
    },
    type: "economic",
    offer: ["E203"]
});
addCard(age1, {
    id: "E102",
    name: "Comptoir Ouest",
    age: 1,
    effect: {
        target: "discount",
        value: "left"
    },
    type: "economic",
    offer: ["E203"]
});
addCard(age1, {
    id: "E103",
    name: "Marché",
    age: 1,
    effect: {
        target: "discount",
        value: "both"
    },
    type: "economic",
    offer: ["E204"]
});
addCard(age1, {
    id: "E104",
    name: "Taverne",
    effect: {
        target: "gold",
        value: 5
    },
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

addCard(age2, {
    id: "A201",
    name: "Ecurie",
    age: 2,
    type: "military",
    effect: {
        target: "army",
        value: 2,
    },
    cost: [{name: "clay", quantity: 1},{name: "wood", quantity: 1},{name: "ore", quantity: 1}],

});

addCard(age2, {
    id: "A202",
    name: "Muraille",
    age: 2,
    type: "military",
    effect: {
        target: "army",
        value: 2,
    },
    cost: [{name: "stone", quantity: 3}],
    offer: ["A303"]
});

addCard(age2, {
    id: "A203",
    name: "Champs de tir",
    age: 2,
    type: "military",
    effect: {
        target: "army",
        value: 2,
    },
    cost: [{name: "wood", quantity: 2},{name: "ore", quantity: 1}],

});

addCard(age2, {
    id: "A204",
    name: "Place d'armes",
    age: 2,
    type: "military",
    effect: {
        target: "army",
        value: 2,
    },
    cost: [{name: "wood", quantity: 1},{name: "ore", quantity: 2}],
    offer: ["A301"]
});

addCard(age2, {
    id: "B201",
    name: "Tribunal",
    age: 2,
    type: "building",
    effect: {
        target: "victory",
        value: 4,
    },
    cost: [{name: "clay", quantity: 2},{name: "loom", quantity: 1}],

});

addCard(age2, {
    id: "B202",
    name: "Statue",
    age: 2,
    type: "building",
    effect: {
        target: "victory",
        value: 4,
    },
    cost: [{name: "ore", quantity: 2},{name: "wood", quantity: 1}],
    offer: ["B302"]
});

addCard(age2, {
    id: "B202",
    name: "Statue",
    age: 2,
    type: "building",
    effect: {
        target: "victory",
        value: 4,
    },
    cost: [{name: "ore", quantity: 2},{name: "wood", quantity: 1}],
    offer: ["B302"]
});

addCard(age2, {
    id: "B203",
    name: "Temple",
    age: 2,
    type: "building",
    effect: {
        target: "victory",
        value: 3,
    },
    cost: [{name: "glass", quantity: 1},{name: "wood", quantity: 1},{name: "clay", quantity: 1}],
    offer: ["B303"]
});

addCard(age2, {
    id: "B204",
    name: "Aqueduc",
    age: 2,
    type: "building",
    effect: {
        target: "victory",
        value: 5,
    },
    cost: [{name: "stone", quantity: 3}],

});

addCard(age2, {
    id: "E201",
    name: "Vignoble",
    age: 2,
    effect: {
        target: "dynamicGold",
        value: "resource"
    },
    type: "economic",

});

addCard(age2, {
    id: "E202",
    name: "Bazar",
    age: 2,
    effect: {
        target: "dynamicGold",
        value: "product"
    },
    type: "economic",

});

addCard(age2, {
    id: "E203",
    name: "Forum",
    age: 2,
    effect: {
        target: "resources",
        value: "glass/loom/papyrus"
    },
    type: "economic",
    cost: [{name: "clay", quantity: 2}],
    offer: ["E303"]
});

addCard(age2, {
    id: "E204",
    name: "Caravansérail",
    age: 2,
    effect: {
        target: "resources",
        value: "wood/stone/ore/clay"
    },
    type: "economic",
    cost: [{name: "wood", quantity: 2}],
    offer: ["E304"]
});

addCard(age2, {
    id: "P101",
    name: "Métier à tisser",
    age: 2,
    type: "product",
    effect: {
        target: "loom",
        value: 1,
    }
});
addCard(age2, {
    id: "P102",
    name: "Verrerie",
    age: 2,
    type: "product",
    effect: {
        target: "glass",
        value: 1,
    }
});
addCard(age2, {
    id: "P103",
    name: "Presse",
    age: 2,
    type: "product",
    effect: {
        target: "papyrus",
        value: 1,
    }
});

addCard(age2, {
    id: "R201",
    name: "Scierie",
    age: 2,
    type: "resource",
    effect: {
        target: "wood",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R201",
    name: "Scierie",
    age: 2,
    type: "resource",
    effect: {
        target: "wood",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R202",
    name: "Carrière",
    age: 2,
    type: "resource",
    effect: {
        target: "stone",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R202",
    name: "Carrière",
    age: 2,
    type: "resource",
    effect: {
        target: "stone",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R203",
    name: "Briqueterie",
    age: 2,
    type: "resource",
    effect: {
        target: "clay",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R203",
    name: "Briqueterie",
    age: 2,
    type: "resource",
    effect: {
        target: "clay",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "R204",
    name: "Fonderie",
    age: 2,
    type: "resource",
    effect: {
        target: "ore",
        value: 2,
    },
    cost: [{name: "gold", quantity: 1}]
});

addCard(age2, {
    id: "S201",
    name: "Laboratoire",
    age: 2,
    type: "science",
    effect: {
        target: "gear",
        value: 1,
    },
    cost: [{name: "papyrus", quantity: 1},{name: "clay", quantity: 2}],
    offer: ["S301", "A304"]
});

addCard(age2, {
    id: "S202",
    name: "Ecole",
    age: 2,
    type: "science",
    effect: {
        target: "tablet",
        value: 1,
    },
    cost: [{name: "papyrus", quantity: 1},{name: "wood", quantity: 1}],
    offer: ["S302", "S305"]
});

addCard(age2, {
    id: "S203",
    name: "Dispensaire",
    age: 2,
    type: "science",
    effect: {
        target: "compass",
        value: 1,
    },
    cost: [{name: "glass", quantity: 1},{name: "ore", quantity: 2}],
    offer: ["S304", "E301"]
});

addCard(age2, {
    id: "S203",
    name: "Dispensaire",
    age: 2,
    type: "science",
    effect: {
        target: "compass",
        value: 1,
    },
    cost: [{name: "glass", quantity: 1},{name: "ore", quantity: 2}],
    offer: ["S304", "E301"]
});

addCard(age2, {
    id: "S204",
    name: "Bibliothèque",
    age: 2,
    type: "science",
    effect: {
        target: "tablet",
        value: 1,
    },
    cost: [{name: "stone", quantity: 2},{name: "loom", quantity: 1}],
    offer: ["B305", "S303"]
});

let age3 = [];

addCard(age3, {
    id: "A301",
    name: "Cirque",
    age: 3,
    type: "military",
    effect: {
        target: "army",
        value: 3,
    },
    cost: [{name: "stone", quantity: 3},{name: "ore", quantity: 1}],

});

addCard(age3, {
    id: "A302",
    name: "Arsenal",
    age: 3,
    type: "military",
    effect: {
        target: "army",
        value: 3,
    },
    cost: [{name: "wood", quantity: 2},{name: "ore", quantity: 1},{name: "loom", quantity: 1}],

});

addCard(age3, {
    id: "A302",
    name: "Arsenal",
    age: 3,
    type: "military",
    effect: {
        target: "army",
        value: 3,
    },
    cost: [{name: "wood", quantity: 2},{name: "ore", quantity: 1},{name: "loom", quantity: 1}],

});

addCard(age3, {
    id: "A303",
    name: "Fortifications",
    age: 3,
    type: "military",
    effect: {
        target: "army",
        value: 3,
    },
    cost: [{name: "ore", quantity: 3},{name: "stone", quantity: 1}],

});

addCard(age3, {
    id: "A304",
    name: "Atelier de siège",
    age: 3,
    type: "military",
    effect: {
        target: "army",
        value: 3,
    },
    cost: [{name: "clay", quantity: 3},{name: "wood", quantity: 1}],

});

addCard(age3, {
    id: "B301",
    name: "Palace",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 8,
    },
    cost: [{name: "stone", quantity: 1},{name: "ore", quantity: 1},{name: "wood", quantity: 1},{name: "clay", quantity: 1},{name: "glass", quantity: 1},{name: "papyrus", quantity: 1},{name: "loom", quantity: 1}],

});

addCard(age3, {
    id: "B302",
    name: "Jardins",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 5,
    },
    cost: [{name: "clay", quantity: 2},{name: "wood", quantity: 1}],

});

addCard(age3, {
    id: "B302",
    name: "Jardins",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 5,
    },
    cost: [{name: "clay", quantity: 2},{name: "wood", quantity: 1}],

});

addCard(age3, {
    id: "B303",
    name: "Panthéon",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 7,
    },
    cost: [{name: "clay", quantity: 2},{name: "ore", quantity: 1},{name: "loom", quantity: 1},{name: "glass", quantity: 1},{name: "papyrus", quantity: 1}],

});

addCard(age3, {
    id: "B304",
    name: "Hôtel de ville",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 6,
    },
    cost: [{name: "stone", quantity: 2},{name: "ore", quantity: 1},{name: "glass", quantity: 1}],

});

addCard(age3, {
    id: "B305",
    name: "Sénat",
    age: 3,
    type: "building",
    effect: {
        target: "victory",
        value: 6,
    },
    cost: [{name: "wood", quantity: 2},{name: "ore", quantity: 1},{name: "stone", quantity: 1}],

});

addCard(age3, {
    id: "E301",
    name: "Arène",
    age: 3,
    effect: {
        target: "victory/gold",
        value: "w",
    },
    type: "economic",
    cost: [{name: "ore", quantity: 1},{name: "stone", quantity: 2}],

});

addCard(age3, {
    id: "E302",
    name: "Chambre de commerce",
    age: 3,
    effect: {
        target: "victory/gold",
        value: "p",
    },
    type: "economic",
    cost: [{name: "papyrus", quantity: 1},{name: "clay", quantity: 2}],

});

addCard(age3, {
    id: "E303",
    name: "Port",
    age: 3,
    effect: {
        target: "victory/gold",
        value: "r",
    },
    type: "economic",
    cost: [{name: "wood", quantity: 1},{name: "ore", quantity: 1},{name: "loom", quantity: 1}],

});

addCard(age3, {
    id: "E303",
    name: "Port",
    age: 3,
    effect: {
        target: "victory/gold",
        value: "e",
    },
    type: "economic",
    cost: [{name: "stone", quantity: 1},{name: "glass", quantity: 1}],

});

addCard(age3, {
    id: "E304",
    name: "Phare",
    age: 3,
    type: "economic",

});

addCard(age3, {
    id: "S301",
    name: "Observatoire",
    age: 3,
    type: "science",
    effect: {
        target: "gear",
        value: 1,
    },
    cost: [{name: "ore", quantity: 2},{name: "glass", quantity: 1},{name: "loom", quantity: 1}],

});

addCard(age3, {
    id: "S302",
    name: "Académie",
    age: 3,
    type: "science",
    effect: {
        target: "compass",
        value: 1,
    },
    cost: [{name: "stone", quantity: 3},{name: "glass", quantity: 1}],

});

addCard(age3, {
    id: "S303",
    name: "Université",
    age: 3,
    type: "science",
    effect: {
        target: "tablet",
        value: 1,
    },
    cost: [{name: "wood", quantity: 2},{name: "glass", quantity: 1},{name: "papyrus", quantity: 1}],

});

addCard(age3, {
    id: "S303",
    name: "Université",
    age: 3,
    type: "science",
    effect: {
        target: "tablet",
        value: 1,
    },
    cost: [{name: "wood", quantity: 2},{name: "glass", quantity: 1},{name: "papyrus", quantity: 1}],

});

addCard(age3, {
    id: "S304",
    name: "Loge",
    age: 3,
    type: "science",
    effect: {
        target: "compass",
        value: 1,
    },
    cost: [{name: "clay", quantity: 2},{name: "loom", quantity: 1},{name: "papyrus", quantity: 1}],

});

addCard(age3, {
    id: "S305",
    name: "Etude",
    age: 3,
    type: "science",
    effect: {
        target: "gear",
        value: 1,
    },
    cost: [{name: "wood", quantity: 1},{name: "loom", quantity: 1},{name: "papyrus", quantity: 1}],

});


let guilds = [];

addCard(guilds, {
    id: "G301",
    name: "Guilde des travailleurs",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value : "resource"
    },
    cost: [{name: "ore", quantity: 2},{name: "clay", quantity: 1},{name: "stone", quantity: 1},{name: "wood", quantity: 1}],

});

addCard(guilds, {
    id: "G302",
    name: "Guilde des artisans",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value: "product"
    },
    cost: [{name: "ore", quantity: 2},{name: "stone", quantity: 2}],
});

addCard(guilds, {
    id: "G303",
    name: "Guilde des commerçants",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value : "economic"
    },
    cost: [{name: "glass", quantity: 1},{name: "loom", quantity: 1},{name: "papyrus", quantity: 1}],
});

addCard(guilds, {
    id: "G304",
    name: "Guilde des philosophes",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        type : "science"
    },
    cost: [{name: "clay", quantity: 3},{name: "loom", quantity: 1},{name: "papyrus", quantity: 1}],
});

addCard(guilds, {
    id: "G305",
    name: "Guilde des espions",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value : "army"
    },
    cost: [{name: "clay", quantity: 3},{name: "glass", quantity: 1}],
});

addCard(guilds, {
    id: "G306",
    name: "Guilde des stratèges",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value : "lost"
    },
    cost: [{name: "ore", quantity: 2},{name: "stone", quantity: 1},{name: "loom", quantity: 1}],
});

addCard(guilds, {
    id: "G307",
    name: "Guilde des armateurs",
    age: 3,
    type: "guild",
    effect: {
        target: "self",
        value : ["resource","product","guild"]
    },
    cost: [{name: "wood", quantity: 3},{name: "glass", quantity: 1},{name: "papyrus", quantity: 1}],
});

addCard(guilds, {
    id: "G308",
    name: "Guilde des scientifiques",
    age: 3,
    type: "guild",
    effect: {
        target: "science",
        value: "compass/tablet/gear"
    },
    cost: [{name: "wood", quantity: 2},{name: "ore", quantity: 2},{name: "papyrus", quantity: 1}],
});

addCard(guilds, {
    id: "G309",
    name: "Guilde des magistrats",
    age: 3,
    type: "guild",
    effect: {
        target: "neighbors",
        value: "building",
    },
    cost: [{name: "wood", quantity: 3},{name: "stone", quantity: 1},{name: "loom", quantity: 1}],
});

addCard(guilds, {
    id: "G310",
    name: "Guilde des bâtisseurs",
    age: 3,
    type: "guild",
    effect: {
        target: "all",
        value: "wonder",
    },
    cost: [{name: "stone", quantity: 2},{name: "clay", quantity: 2},{name: "glass", quantity: 1}],
});

shuffleArray(guilds);
age3.push.apply(age3,guilds.slice(0,6));
shuffleArray(age1);
shuffleArray(age2);
shuffleArray(age3);

function addCard(list,cardInfos){
    list.push(new Card(cardInfos));
}

function findCardFromId(id){
    let age = id.charAt(1);
    if(age === '1'){
        return findCardInList(id,age1);
    }
    else if(age === '2'){
        return findCardInList(id,age2);
    }
    else{
        return findCardInList(id,age3);
    }
}

function findCardInList(id,list){
    for(let i = 0; i < list.length ; i++){
        if(list[i].id === id)
            return list[i];
    }
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
    age3: age3,
    findCardFromId : findCardFromId
};