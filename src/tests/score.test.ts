import { ScoringBoard } from "../modules/ScoringBoard";
import { ScoringMission } from "../modules/defs";


describe('score', () => {

    describe('values', () => {
        
        test('3 for each value => bonus', () => {
            let scoringBoard = new ScoringBoard({},{})
            for (let i = 0; i < 6; i++) {
                scoringBoard.diceValues[i + 1] = 3
            }
            expect(scoringBoard.valuesScore).toBe(3*1+3*2+3*3+3*4+3*5+3*6+37)
        })

        test('2 for each value => no bonus', () => {
            let scoringBoard = new ScoringBoard({},{})
            for (let i = 0; i < 6; i++) {
                scoringBoard.diceValues[i + 1] = 2
            }
            expect(scoringBoard.valuesScore).toBe(2*1+2*2+2*3+2*4+2*5+2*6)
        })
    })

    describe('contracts', () => {
        
        test('carre + full', () => {
            let scoringBoard = new ScoringBoard({},{})
            let contractsComplete = [
                ScoringMission.Carre, 
                ScoringMission.Full
            ]
            contractsComplete.forEach(c => {
                scoringBoard.contracts[c] = true
            })
            expect(scoringBoard.contractScore).toBe(40 + 30)
        })

        test('grande suite + yam', () => {
            let scoringBoard = new ScoringBoard({},{})
            let contractsComplete = [
                ScoringMission.GrandeSuite, 
                ScoringMission.Yam
            ]
            contractsComplete.forEach(c => {
                scoringBoard.contracts[c] = true
            })
            expect(scoringBoard.contractScore).toBe(25 + 50)
        })
    })

    describe('total', () => {
        
        test('carre + full + 2 for each values', () => {
            let scoringBoard = new ScoringBoard({},{})
            let contractsComplete = [
                ScoringMission.Carre, 
                ScoringMission.Full
            ]
            contractsComplete.forEach(c => {
                scoringBoard.contracts[c] = true
            })
            for (let i = 0; i < 6; i++) {
                scoringBoard.diceValues[i + 1] = 2
            }
            expect(scoringBoard.score).toBe(40 + 30 + 2*1+2*2+2*3+2*4+2*5+2*6)
        })
    })
})