const City = require('../city');
const ressources = require('../ressources');
let list = [];

let faceA = [
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "clay", quantity: 3}],
        power:[{type:"army",quantity:2}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 4}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

let faceB = [
    {
        cost:[{name: "stone", quantity: 3}],
        power:[{type:"victory",quantity:3},{type:"gold",quantity:3},{type:"army",quantity:1}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 4}],
        power:[{type:"victory",quantity:4},{type:"gold",quantity:4},{type:"army",quantity:1}],
        built:"false"
    }];

let rhodes = new City("Le Colosse de Rhodes",ressources.enum.ORE,faceA,faceB,1);
list.push(rhodes);

faceA = [
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 2}],
        power:[{type:"effect",effect:"resource",value:"wood/stone/ore/clay"}],
        built:"false"
    },
    {
        cost:[{name: "glass", quantity: 2}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "clay", quantity: 2}],
        power:[{type:"effect",effect:"resource",value:"wood/stone/ore/clay"}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"effect",effect:"resource",value:"compass/tablet/gear"}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 3}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

let alexendrie = new City("Le phare d'Alexandrie",ressources.enum.GLASS,faceA,faceB,2);
list.push(alexendrie);

faceA = [
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"gold",quantity:9}],
        built:"false"
    },
    {
        cost:[{name: "papyrus", quantity: 2}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"victory",quantity:2},{type:"gold",quantity:4}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"victory",quantity:3},{type:"gold",quantity:4}],
        built:"false"
    },
    {
        cost:[{name: "glass", quantity: 1},{name: "loom", quantity: 1},{name: "papyrus", quantity: 1}],
        power:[{type:"victory",quantity:5},{type:"gold",quantity:4}],
        built:"false"
    }];

let ephese = new City("Le temple d'Artémis à Ephèse",ressources.enum.PAPYRUS,faceA,faceB,3);
list.push(ephese);

faceA = [
    {
        cost:[{name: "clay", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 3}],
        power:[{type:"effect",effect:"science"}],
        built:"false"
    },
    {
        cost:[{name: "clay", quantity: 4}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "clay", quantity: 1},{name: "loom", quantity: 1}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 2},{name: "glass", quantity: 1}],
        power:[{type:"effect",effect:"lastCard"}],
        built:"false"
    },
    {
        cost:[{name: "clay", quantity: 3},{name: "papyrus", quantity: 1}],
        power:[{type:"effect",effect:"science"}],
        built:"false"
    }];

let babylone = new City("Les jardins suspendus de Babylone",ressources.enum.CLAY,faceA,faceB,4);
list.push(babylone);

faceA = [
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"effect",effect:"freeCard"}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 2}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"effect",effect:"discount"}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"victory",quantity:5}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 2},{name: "loom", quantity: 1}],
        power:[{type:"effect",effect:"copyGuild"}],
        built:"false"
    }];

let olympie = new City("La statue de Zeus à Olympie",ressources.enum.WOOD,faceA,faceB,5);
list.push(olympie);

faceA = [
    {
        cost:[{name: "clay", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "ore", quantity: 3}],
        power:[{type:"effect",effect:"freeDiscardedCard"}],
        built:"false"
    },
    {
        cost:[{name: "loom", quantity: 2}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "ore", quantity: 2}],
        power:[{type:"victory",quantity:2},{type:"effect",effect:"freeDiscardedCard"}],
        built:"false"
    },
    {
        cost:[{name: "clay", quantity: 3}],
        power:[{type:"victory",quantity:1},{type:"effect",effect:"freeDiscardedCard"}],
        built:"false"
    },
    {
        cost:[{name: "glass", quantity: 1},{name: "papyrus", quantity: 1},{name: "loom", quantity: 1}],
        power:[{type:"effect",effect:"freeDiscardedCard"}],
        built:"false"
    }];

let halicarnasse = new City("Le mausolée d'Halicarnasse",ressources.enum.LOOM,faceA,faceB,6);
list.push(halicarnasse);

faceA = [
    {
        cost:[{name: "stone", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "wood", quantity: 3}],
        power:[{type:"victory",quantity:5}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 4}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];

faceB = [
    {
        cost:[{name: "wood", quantity: 2}],
        power:[{type:"victory",quantity:3}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 3}],
        power:[{type:"victory",quantity:5}],
        built:"false"
    },
    {
        cost:[{name: "clay", quantity: 3}],
        power:[{type:"victory",quantity:5}],
        built:"false"
    },
    {
        cost:[{name: "stone", quantity: 3},{name: "papyrus", quantity: 1}],
        power:[{type:"victory",quantity:7}],
        built:"false"
    }];
let gizeh = new City("La grande pyramide de Gizeh",ressources.enum.STONE,faceA,faceB,7);
list.push(gizeh);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function chooseRandomCities(){
    shuffleArray(list);
    return list.slice(0,4);
}

module.exports = {
    chooseRandomCities: chooseRandomCities,
    list: list
};

