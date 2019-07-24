import { Player } from "./Player";

export const NB_DICES = 5
export const MAX_ROLL = 3

export type DiceValue = 1 | 2 | 3| 4 | 5 | 6

export enum ScoringMission {
    DiceValue,
    Brelan,
    PetiteSuite,
    GrandeSuite,
    Full,
    Carre,
    Yams,
    Chance
}