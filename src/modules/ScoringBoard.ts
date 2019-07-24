import { ScoringMission, DiceValue } from "./defs";

export class ScoringBoard {

    constructor(
        public diceValues: {},
        public contracts: any
    ){}

    completeContract(type: ScoringMission, value: number, diceValue?: DiceValue){
        switch (type) {
            case ScoringMission.DiceValue:
                diceValue = diceValue as DiceValue
                this.diceValues[diceValue] = value
                break;
        
            default:
                break;
        }       
    }

    get valuesScore(){
        return 0
    }

    get contractScore(){
        return 0
    }

    get score(){
        return this.valuesScore + this.contractScore
    }

    isComplete(){
        return false
    }
}