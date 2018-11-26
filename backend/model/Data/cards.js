const Card = require('../card');
const ressources = require('../ressources');
let age1 = [];
addCard(age1,"A101");
addCard(age1,"A102");
addCard(age1,"A103");

addCard(age1,"E101");
addCard(age1,"E102");
addCard(age1,"E103");
addCard(age1,"E104");

addCard(age1,"P101");
addCard(age1,"P102");
addCard(age1,"P103");

addCard(age1,"R101");
addCard(age1,"R102");
addCard(age1,"R103");
addCard(age1,"R104");
addCard(age1,"R105");
addCard(age1,"R106");
addCard(age1,"R107");
addCard(age1,"R108");
addCard(age1,"R109");
addCard(age1,"R110");

addCard(age1,"S101");
addCard(age1,"S102");
addCard(age1,"S103");

let age2 = [];
addCard(age2,"A201");
addCard(age2,"A202");
addCard(age2,"A203");
addCard(age2,"A204");

addCard(age2,"E201");
addCard(age2,"E202");
addCard(age2,"E203");
addCard(age2,"E204");

addCard(age2,"M201");
addCard(age2,"M202");
addCard(age2,"M203");
addCard(age2,"M204");

addCard(age2,"R201");
addCard(age2,"R202");
addCard(age2,"R203");
addCard(age2,"R204");

addCard(age2,"S201");
addCard(age2,"S202");
addCard(age2,"S203");
addCard(age2,"S204");

let age3 = [];
addCard(age3,"A301");
addCard(age3,"A302");
addCard(age3,"A303");
addCard(age3,"A304");

addCard(age3,"E301");
addCard(age3,"E302");
addCard(age3,"E303");
addCard(age3,"E304");

addCard(age3,"G301");
addCard(age3,"G302");
addCard(age3,"G303");
addCard(age3,"G304");
addCard(age3,"G305");
addCard(age3,"G306");
addCard(age3,"G307");
addCard(age3,"G308");
addCard(age3,"G309");
addCard(age3,"G310");

addCard(age3,"S301");
addCard(age3,"S302");
addCard(age3,"S303");
addCard(age3,"S304");
addCard(age3,"S305");

shuffleArray(age1);
shuffleArray(age2);
shuffleArray(age3);

function addCard(list,id){
    list.push(new Card(id));
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