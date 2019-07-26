import { ScoringMission, DiceValue, VALUES_MIN_POINT_FOR_BONUS, VALUES_POINT_BONUS, DEFAULT_WITH_CHANCE_RULE, NB_CONTRACTS_WITH_CHANCE_RULE, NB_CONTRACTS_WITHOUT_CHANCE_RULE, getContractPoints } from "./defs";

export class ScoringBoard {

    constructor(
        public diceValues: { [key: number]: number } = {},
        public contracts: { [key: number]: boolean | number } = {},
        public withChanceRule = DEFAULT_WITH_CHANCE_RULE
    ){}

    // TODO
    completeValueContract(diceValue: DiceValue, nbDice: number){
        this.diceValues[diceValue] = nbDice
    }

    completeContract(type: ScoringMission, score?: number ){
        this.contracts[type] = score || true
    }

    get valuesScore(){
        let score = Object.keys(this.diceValues).map(k => parseInt(k)).reduce( (score, diceValue) => {
            return score + diceValue * this.diceValues[diceValue]
        }, 0)

        if( score >= VALUES_MIN_POINT_FOR_BONUS){
            score += VALUES_POINT_BONUS
        }

        return score
    }

    get contractScore(){
        const CONTRACT_SCORE = Object.keys(this.contracts)
        return CONTRACT_SCORE.reduce( (score, contractKey) => {
            let contractPoints = 0
            let contractType = parseInt(contractKey)
            
            if(!!this.contracts[contractType]){
                if(contractType === ScoringMission.Brelan){
                    contractPoints = this.contracts[contractType] as number
                }
                else {
                    contractPoints = getContractPoints(contractType)
                }
            }

            return score + contractPoints
        }, 0)
    }

    get score(){
        return this.valuesScore + this.contractScore
    }

    isComplete(){
        return this.diceValuesComplete() && this.areAllContractsComplete()
    }

    diceValuesComplete(){
        return Object.keys(this.diceValues).length === 6
    }

    areAllContractsComplete(){
        const nbContractsToComplete = DEFAULT_WITH_CHANCE_RULE ? NB_CONTRACTS_WITH_CHANCE_RULE : NB_CONTRACTS_WITHOUT_CHANCE_RULE
        return Object.keys(this.contracts).length === nbContractsToComplete
    }
}