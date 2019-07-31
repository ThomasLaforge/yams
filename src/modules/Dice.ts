import { DiceValue } from "./defs";

export class Dice {

    public value: DiceValue

    constructor(
        value?: DiceValue,
        public isLocked = false,
        rollOnInit = false
    )
    {
        if( !value || rollOnInit ){
            this.value = this.getNewRollValue()
        }
        else {
            this.value = value!
        }
    }


    getNewRollValue() {
        this.roll()
        return this.value
    }

    roll(value?: DiceValue){
        if(!this.isLocked){
            this.value = value || (Math.floor(Math.random() * 6 - 1) + 1) as DiceValue
        }
    }

    lock(){
        this.isLocked = true
    }
}