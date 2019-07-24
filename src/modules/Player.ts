import { Dice } from "./Dice";
import { ScoringBoard } from "./ScoringBoard";

export class Player {

    constructor(
        public name: string,
        public socketId: string,
        public scoringBoard: ScoringBoard
    ){}

    isEqual(p: Player){
        return this.socketId === p.socketId
    }

    hasCompleteScoringBoard(){
        return this.scoringBoard.isComplete()
    }

}