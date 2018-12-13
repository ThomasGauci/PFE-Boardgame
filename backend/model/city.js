class City {
    // faceA = [wonder1,wonder2,wonder3]
    // faceB = [wonder1,wonder2,wonder3]
    // wonder = {cost:[...],power:[...],built:"false"}
    constructor(name,baseRessource,faceA,faceB,id) {
        this.name = name;
        this.baseRessource = baseRessource;
        this.faceA = faceA;
        this.faceB = faceB;
        this.currentFace = null;
        this.currentStep = 0;
        this.id = id;
        this.numberWonderBuit = 0;
        this.usedCards = [];
    }
    //face : String "A" or "B"
    chooseFace(face){
        if(face === "A"){
            this.currentFace = this.faceA;
        }else if(face === "B"){
            this.currentFace = this.faceB;
        }
        else return "error: must choose A or B";
    }

    nextStep(){
        this.currentFace[this.currentStep].built = "true";
        this.currentStep++;
    }

    getCurrentstep(){
        return this.currentFace[this.currentStep];
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