import { Player } from "./Player";
import { DEFAULT_WITH_CHANCE_RULE, ScoringMission, DiceValue } from "./defs";
import { DiceTurn } from "./DiceTurn";

interface DiceValueContractInfo {
    diceValue: DiceValue;
    nbDice: number;
};

export class Game {

    constructor(
        public players: Player[],
        public currentPlayerIndex: number = 0,
        public withChanceContract = DEFAULT_WITH_CHANCE_RULE,
        public diceTurn = new DiceTurn()
    ){}

    nextPlayer(){
        this.currentPlayerIndex++
        if(this.currentPlayerIndex === this.nbPlayers){
            this.currentPlayerIndex = 0
        }
    }

    getPossibleContractsForCurrentPlayer(){

    }

    canEndTurn(contractType: ScoringMission, value: DiceValueContractInfo | boolean | number){
        // @ts-ignore
        return this.currentPlayer.hasNotCompleteContract(contractType, value && value.hasOwnProperty("diceValue") && value.diceValue) && 
            (
                contractType === ScoringMission.DiceValue ||
                value === false ||
                contractType === ScoringMission.Chance ||
                contractType === ScoringMission.Brelan && this.diceTurn.isBrelan() ||
                contractType === ScoringMission.Carre && this.diceTurn.isCarre() ||
                contractType === ScoringMission.Full && this.diceTurn.isFull() ||
                contractType === ScoringMission.Yam && this.diceTurn.isYams() ||
                contractType === ScoringMission.PetiteSuite && this.diceTurn.isSmallSuite() ||
                contractType === ScoringMission.GrandeSuite && this.diceTurn.isBigSuite()
            )
        }

    endTurn(contractType: ScoringMission, value: { diceValue: DiceValue, nbDice: number } | boolean | number){
        if(this.canEndTurn(contractType, value)){
            // Add contract to player scoring board
            if(contractType === ScoringMission.DiceValue){
                const val = value as { diceValue: DiceValue, nbDice: number }
                this.currentPlayer.scoringBoard.completeValueContract(val.diceValue, val.nbDice)
            }
            else {
                const val = value as boolean | number
                this.currentPlayer.scoringBoard.completeContract(contractType, val)
            }
            // Start new turn
            this.diceTurn = new DiceTurn()
            this.nextPlayer()
        }
        else {
            throw 'try to end a turn but information are bad !'
        }
    }

    isGameOver(){
        return this.lastPlayer.hasCompleteScoringBoard()
    }

    getPlayerIndex(player: Player){
        return this.players.findIndex(p => p.isEqual(player))
    }

    get currentPlayer(){
        return this.players[this.currentPlayerIndex]
    }

    get lastPlayer(){
        return this.players[this.players.length - 1]
    }

    get nbPlayers(){
        return this.players.length
    }

}