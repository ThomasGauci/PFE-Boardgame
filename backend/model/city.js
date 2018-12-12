class City {
    // faceA = [wonder1,wonder2,wonder3]
    // faceB = [wonder1,wonder2,wonder3]
    // wonder = {cost:[...],power:[...],built:"false"}
    constructor(name,baseRessource,faceA,faceB,id) {
        this.name = name;
        this.baseRessource = baseRessource;
        this.faceA = faceA;
        this.faceB = faceB;
        this.currentFace = faceA;
        this.id = id;
        this.numberWonderBuit = 0;
    }
    //face : String "A" or "B"
    chooseFace(face){
        if(face === "A"){
            this.currentFace = this.faceA;
        }else if(face === "B"){
            this.currentFace = this.faceB;
        }
        else return "error: must choose A or B"
    }

    //wonder : int "1", "2" or "3"
    build(wonder){
        if(this.currentFace[wonder].built === true){
            return 1;
        }else{
            return -1;
        }
    }
}
module.exports = City;