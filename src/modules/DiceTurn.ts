import { Player } from "./Player";
import { Dice } from "./Dice";
import { MAX_ROLL, NB_DICES, Suite } from "./defs";

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

    isSuite(suiteType: Suite){
        const counts = this.getCountForAllValues()
        const suiteElts = Array(NB_DICES + 1).fill('').map( (e, k) => k + 1)
        
        switch (suiteType) {
            case Suite.Small:
                suiteElts.pop()
                break;
            case Suite.Big:
                suiteElts.shift()
                break;
            default:
                throw "Not a known Suite type";
        }

        return suiteElts.reduce( (nbEltValidate, diceValue) => nbEltValidate + Math.min(counts[diceValue], 1), 0) === NB_DICES
    }
    isBigSuite(){
        return this.isSuite(Suite.Big)
    }
    isSmallSuite(){
        return this.isSuite(Suite.Small)
    }

    isBrelan(){
        const counts = Object.values(this.getCountForAllValues())
        return Math.max(...counts) >= 3
    }

    isCarre(){
        const counts = Object.values(this.getCountForAllValues())
        return Math.max(...counts) >= 4
    }

    isYams(){
        const counts = Object.values(this.getCountForAllValues())
        return Math.max(...counts) >= NB_DICES
    }

    isFull(){
        const countsForValues = this.getCountForAllValues()
        const counts = Object.values(countsForValues)
        return !!counts.find(count => count === 2) && !!counts.find(count => count === 3) 
    }

    getCountForAllValues(){
        let counts: { [diceValue: number]: number; } = {}

        for(let i = 1; i <= 6; i++){
            counts[i] = this.currentDiceValues.filter(v => v === i).length
        }

        return counts
    }

    getSum(){
        return this.currentDiceValues.reduce( (sum, diceValue) => sum + diceValue, 0)
    }

}