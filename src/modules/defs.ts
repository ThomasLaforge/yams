import { Player } from "./Player";

export const NB_DICES = 5
export const MAX_ROLL = 3
export const VALUES_MIN_POINT_FOR_BONUS = 63
export const VALUES_POINT_BONUS = 37

// IMPORTANT: if you update DEFAULT_WITH_CHANCE_RULE, update nb contracts
export const DEFAULT_WITH_CHANCE_RULE = false
export const NB_CONTRACTS_WITH_CHANCE_RULE = 8
export const NB_CONTRACTS_WITHOUT_CHANCE_RULE = 7

export type DiceValue = 1 | 2 | 3| 4 | 5 | 6

export enum ScoringMission {
    Brelan,
    PetiteSuite,
    GrandeSuite,
    Full,
    Carre,
    Yam,
    Chance,
    DiceValue
}

export enum Suite {
    Small,
    Big
}

export function getContractName(contractType: ScoringMission){
    switch (contractType) {
        case ScoringMission.PetiteSuite: return 25 
        case ScoringMission.GrandeSuite: return 25 
        case ScoringMission.Full: return 30 
        case ScoringMission.Carre: return 40 
        case ScoringMission.Yam: return 50    
        default: return 0
    }
}

export function getContractPoints(contractType: ScoringMission){
    switch (contractType) {
        case ScoringMission.Brelan: return 'brelan'
        case ScoringMission.PetiteSuite: return 'petite suite' 
        case ScoringMission.GrandeSuite: return 'grande suite'
        case ScoringMission.Full: return 'full'
        case ScoringMission.Carre: return 'carre'
        case ScoringMission.Yam: return 'yam'
        default: return 'unknown mission'
    }
}