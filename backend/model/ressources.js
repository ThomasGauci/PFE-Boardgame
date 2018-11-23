let Ressources = Object.freeze({
    WOOD:"wood",
    STONE:"stone",
    BRICK:"brick",
    IRON:"iron",
    LOOM:"loom",
    GLASSWARE:"glassware",
    PRESS:"press"
});

exports.fromString = function(string) {
    switch(string){
        case("wood"):
            return Ressources.WOOD;
        case("stone"):
            return Ressources.STONE;
        case("brick"):
            return Ressources.BRICK;
        case("iron"):
            return Ressources.IRON;
        case("loom"):
            return Ressources.LOOM;
        case("glassware"):
            return Ressources.GLASSWARE;
        case("press"):
            return Ressources.PRESS;
    }
    return null;
};

module.exports = { enum: Ressources };