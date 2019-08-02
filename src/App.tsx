import React, {Component} from 'react';
import './App.scss';

import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import Dice from './components/Dice/Dice';

import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import { Dice as DiceModel } from './modules/Dice';
import { NB_DICES, DiceValue, ScoringMission } from './modules/defs';

interface AppState {
  currentPlayerIndex: number,
  players: Player[],
  dices: DiceModel[],
  nbRemainingRoll: number,
  rolling: boolean,
  myIndex: number
}

export default class App extends Component<{}, AppState> {
  
  constructor(props: any){
    super(props)
    this.state = {
      currentPlayerIndex: 0,
      myIndex: 0,
      players: [
        new Player('Thomas', 'fdskf', new ScoringBoardModel({1: 2}, {0: 24, 2: true, 3: false})),
        new Player('Mélanie', 'fddsskf', new ScoringBoardModel({}, {})),
        new Player('Kevin', 'fddsskf', new ScoringBoardModel({}, {}))
      ],
      dices: Array(NB_DICES).fill('').map(e => new DiceModel()),
      nbRemainingRoll: 3,
      rolling: false
    }
  }

  roll = () => {
    const dices = this.state.dices.slice()
    dices.forEach( (d, i) => d.value = (i + 1) as DiceValue )
    this.setState({ dices, nbRemainingRoll: this.state.nbRemainingRoll - 1, rolling: true }, () => {
      setTimeout(() => {
        this.setState({ rolling: false })
      }, 750)
    })
  }

  handleDiceClick = (d: DiceModel, index: number) => {
    let nbOtherDiceWithSameLockStatus = 0

    let dGlobalIndex = this.state.dices.findIndex(dice => {
      if(dice.isLocked === d.isLocked){
        nbOtherDiceWithSameLockStatus++
      }
      return dice.isLocked === d.isLocked && nbOtherDiceWithSameLockStatus - 1 === index
    })

    let dices = this.state.dices.slice()
    dices[dGlobalIndex].switchIsLocked()
    this.setState({ dices })
  }

  handleClickOnValueContract = (playerIndex: number, diceValue: DiceValue) => {
    console.log('click on value contract', this.state.currentPlayerIndex === playerIndex, playerIndex, diceValue)
  }

  handleClickOnMissionContract = (playerIndex: number, mission: ScoringMission) => {
    console.log('click on mission contract', this.state.currentPlayerIndex === playerIndex, playerIndex, mission)
  }

  render(){
    return <div className="App">
      <div className='roll-zone'>
        <div className="current-player">
          <div className="current-player-name">{this.state.players[0].name}</div>
        </div>
        
        {this.state.nbRemainingRoll === 0 && (
          <div className="roll-result">
            <h2 className="roll-result-title">Result</h2>
            <div className="roll-result-info">You have to chose a contract.</div>
            <div className="roll-result-content">
              {this.state.dices.map( (d, k) => (
                <Dice
                  id={k}
                  dice={d}
                  roll={false}
                />
              ))}
            </div>
          </div>
        )}

        {this.state.nbRemainingRoll > 0 && 
          [<div className="dices-to-roll">
            {this.state.dices.filter(d => !d.isLocked).map( (d, k) => 
              <Dice 
                id={k}
                dice={d}
                onClick={() => this.handleDiceClick(d, k)} 
                roll={this.state.rolling}
              />
              )}
          </div>,
          
          <div className="roll-info-zone">
            <div className="remaining-rolls-sentence">
              {this.state.nbRemainingRoll > 0 
                ? `You still have ${this.state.nbRemainingRoll} roll${this.state.nbRemainingRoll === 1 ? '' : 's'}`
                : `You don't have any more roll ...`
              } 
            </div>

            <button
              className='roll-btn'
              onClick={this.roll}
              disabled={this.state.nbRemainingRoll === 0}
              >Roll !</button>
          </div>,

          this.state.dices.filter(d => d.isLocked).length > 0 &&
          <div className="dices-locked">
            <h2 className='dices-locked-title'>Locked dices</h2>
            <div className="dices-locked-content">
              {this.state.dices.filter(d => d.isLocked).map( (d, k) => 
                <Dice 
                  id={k}
                  dice={d} 
                  onClick={() => this.handleDiceClick(d, k)} 
                  roll={false} 
                />
              )}
            </div>
          </div>
          ]}
      </div>
      
      <div className='scoring-board-zone'>
        <ScoringBoard 
          players={this.state.players}
          currentPlayerIndex={this.state.currentPlayerIndex}
          isCurrentPlayer={this.state.myIndex === this.state.currentPlayerIndex}
          clickOnValueContract={this.handleClickOnValueContract}
          clickOnMissionContract={this.handleClickOnMissionContract}
        />
      </div>
    </div>
  };
}