import { DiceTurn } from "../modules/DiceTurn";
import { Dice } from "../modules/Dice";
import { DiceValue } from "../modules/defs";
import { Game } from "../modules/Game";
import { Player } from "../modules/Player";
import { ScoringBoard } from "../modules/ScoringBoard";

const createTurnFromDiceValues = (diceValues: DiceValue[]) => 
    new DiceTurn(diceValues.map( v => new Dice(v) ))

describe('contracts', () => {
    describe('has complete', () => {

        const isFullRoll1 = createTurnFromDiceValues([2,2,2,4,4])
        const isNotFullRoll1 = createTurnFromDiceValues([3,2,2,4,4])
        const player = new Player('toto', 'tata', new ScoringBoard({2: 2}, {1: true}))
        const game = new Game([player])

        // test('is full', () => {
        //     expect(isFullRoll1.isFull()).toBe(true)
        // })
    })

    describe('full', () => {

        const isFullRoll1 = createTurnFromDiceValues([2,2,4,4,4])
        const isFullRoll2 = createTurnFromDiceValues([2,2,2,4,4])

        const isNotFullRoll1 = createTurnFromDiceValues([3,2,2,4,4])

        test('is full', () => {
            expect(isFullRoll1.isFull()).toBe(true)
            expect(isFullRoll2.isFull()).toBe(true)
        })

        test('is not full', () => {
            expect(isNotFullRoll1.isFull()).toBe(false)
        })
    })

    describe('brelan', () => {

        const isBrelanRoll1 = createTurnFromDiceValues([2,2,4,4,4])
        const isBrelanRoll2 = createTurnFromDiceValues([2,2,2,4,4])

        const isNotBrelanRoll1 = createTurnFromDiceValues([3,2,2,4,4])

        test('is brelan', () => {
            expect(isBrelanRoll1.isBrelan()).toBe(true)
            expect(isBrelanRoll2.isBrelan()).toBe(true)
        })

        test('is not brelan', () => {
            expect(isNotBrelanRoll1.isBrelan()).toBe(false)
        })
    })

    describe('carre', () => {

        const isCarreRoll = createTurnFromDiceValues([2,4,4,4,4])
        const isYamRoll = createTurnFromDiceValues([2,2,2,2,2])

        const isNotCarreRoll = createTurnFromDiceValues([3,2,2,4,4])

        test('is carre', () => {
            expect(isCarreRoll.isCarre()).toBe(true)
            expect(isYamRoll.isCarre()).toBe(true)
        })

        test('is not carre', () => {
            expect(isNotCarreRoll.isCarre()).toBe(false)
        })
    })

    describe('yam', () => {

        const isYamRoll = createTurnFromDiceValues([2,2,2,2,2])

        const isNotYamRoll = createTurnFromDiceValues([3,2,2,4,4])

        test('is yam', () => {
            expect(isYamRoll.isCarre()).toBe(true)
        })

        test('is not yam', () => {
            expect(isNotYamRoll.isCarre()).toBe(false)
        })
    })

    describe('suites', () => {

        
        describe('big suite', () => {
            const isBigSuiteRoll1 = createTurnFromDiceValues([2,3,4,5,6])
            const isBigSuiteRoll2 = createTurnFromDiceValues([6,3,4,2,5])
            const isNotBigSuiteRoll = createTurnFromDiceValues([3,2,2,4,4])

            
            test('is big suite in order', () => {
                expect(isBigSuiteRoll1.isBigSuite()).toBe(true)
            })
            test('is big suite not in order', () => {
                expect(isBigSuiteRoll2.isBigSuite()).toBe(true)
            })
            
            test('is not big suite', () => {
                expect(isNotBigSuiteRoll.isBigSuite()).toBe(false)
            })
        })
        
        describe('small suite', () => {
            const isSmallSuiteRoll1 = createTurnFromDiceValues([1,2,3,4,5])
            const isSmallSuiteRoll2 = createTurnFromDiceValues([5,2,3,4,1])
            const isNotSmallSuiteRoll = createTurnFromDiceValues([3,2,2,4,4])

            test('is small suite in order', () => {
                expect(isSmallSuiteRoll1.isSmallSuite()).toBe(true)
            })
            test('is small suite not in order', () => {
                expect(isSmallSuiteRoll2.isSmallSuite()).toBe(true)
            })

            test('is not small suite', () => {
                expect(isNotSmallSuiteRoll.isSmallSuite()).toBe(false)
            })
        })
    })
})