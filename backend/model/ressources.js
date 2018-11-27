let Ressources = Object.freeze({
    WOOD:"wood",
    STONE:"stone",
    CLAY:"clay",
    ORE:"ore",
    LOOM:"loom",
    GLASS:"glass",
    PAPYRUS:"papyrus"
});

exports.fromString = function(string) {
    switch(string){
        case("wood"):
            return Ressources.WOOD;
        case("stone"):
            return Ressources.STONE;
        case("clay"):
            return Ressources.CLAY;
        case("ore"):
            return Ressources.ORE;
        case("loom"):
            return Ressources.LOOM;
        case("glass"):
            return Ressources.GLASS;
        case("papyrus"):
            return Ressources.PAPYRUS;
    }
    return null;
};

module.exports = { enum: Ressources };