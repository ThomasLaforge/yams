import { Player } from "./Player";

export class Game {

    constructor(
        public players: Player[],
        public currentPlayerIndex: number = 0,
        public withChanceContract = false
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