const City = require('../city');
const ressources = require('../ressources');
let list = [];

let faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let rhodes = new City("Le Colosse de Rhodes",ressources.enum.IRON,faceA,faceB,1);
list.push(rhodes);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let alexendrie = new City("Le phare d'Alexandrie",ressources.enum.GLASSWARE,faceA,faceB,2);
list.push(alexendrie);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let ephese = new City("Le temple d'Artémis à Ephèse",ressources.enum.IRON,faceA,faceB,3);
list.push(ephese);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let babylone = new City("Les jardins suspendus de Babylone",ressources.enum.IRON,faceA,faceB,4);
list.push(babylone);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let olympie = new City("La statue de Zeus à Olympie",ressources.enum.IRON,faceA,faceB,5);
list.push(olympie);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let halicarnasse = new City("Le mausolée d'Halicarnasse",ressources.enum.IRON,faceA,faceB,6);
list.push(halicarnasse);

faceA = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
faceB = [{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"},{cost:[],power:[],built:"false"}];
let gizeh = new City("La grande pyramide de Gizeh",ressources.enum.IRON,faceA,faceB,7);
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

