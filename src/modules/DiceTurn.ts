import { Player } from "./Player";
import { Dice } from "./Dice";
import { MAX_ROLL, NB_DICES } from "./defs";

export class DiceTurn {

    constructor(
        public dices = Array(NB_DICES).fill('').map( e => new Dice() ),
        public nbRoll = 0
    ){}

    start(){
        this.dices.forEach(d => d.roll())
        this.nbRoll++
    }

    reRoll(fixedDicesIndex: number[]){
        if(this.canReRoll()){
            this.dices.forEach( (d, i) => {
                if(fixedDicesIndex.includes(i)){
                    d.roll()
                }
            })
            this.nbRoll++
        }
        else {
            throw "can't reroll";
        }
    }

    get currentDiceValues(){
        return this.dices.map(d => d.value)
    }

    nbRemainingRoll(){
        return MAX_ROLL - this.nbRoll
    }

    canReRoll(){
        return this.nbRemainingRoll() > 0
    }

}