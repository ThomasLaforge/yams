import { ScoringBoard } from "./ScoringBoard";
import { ScoringMission } from "./defs";

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

    hasNotCompleteContract(contractType: ScoringMission){
        return this.scoringBoard.hasComplete(contractType)
    }

}