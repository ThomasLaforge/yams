import { ScoringBoard } from "./ScoringBoard";
import { ScoringMission, DiceValue } from "./defs";

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

    hasNotCompleteContract(contractType: ScoringMission, value?: DiceValue){
        return !this.scoringBoard.hasComplete(contractType, value)
    }

    getContractsNotCompleted(){
        let contractsToDo = []

        contractsToDo.push(...Array(6)
            .fill('')
            .map( (e, i) => ({ mission: ScoringMission.DiceValue, value: (i + 1) as DiceValue }))
            .filter( e => this.hasNotCompleteContract(e.mission, e.value) )
        )

        contractsToDo.push(...Array(this.scoringBoard.nbContractsToComplete)
            .fill('')
            .map( (e, i) => ({ mission: i }))
            .filter( e => this.hasNotCompleteContract(e.mission) )
        )

        return contractsToDo
    }

}