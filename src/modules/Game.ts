import { Player } from "./Player";
import { DEFAULT_WITH_CHANCE_RULE } from "./defs";

export class Game {

    constructor(
        public players: Player[],
        public currentPlayerIndex: number = 0,
        public withChanceContract = DEFAULT_WITH_CHANCE_RULE
    ){}

    nextPlayer(){
        this.currentPlayerIndex++
        if(this.currentPlayerIndex === this.nbPlayers){
            this.currentPlayerIndex = 0
        }
    }

    isGameOver(){
        return this.lastPlayer.hasCompleteScoringBoard()
    }

    getPlayerIndex(player: Player){
        return this.players.findIndex(p => p.isEqual(player))
    }

    get lastPlayer(){
        return this.players[this.players.length - 1]
    }

    get nbPlayers(){
        return this.players.length
    }

}