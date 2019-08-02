import React, {Component} from 'react';
import './App.scss';

import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import Dice from './components/Dice/Dice';

import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import { Dice as DiceModel } from './modules/Dice';
import { NB_DICES, DiceValue } from './modules/defs';

interface AppState {
  players: Player[],
  dices: DiceModel[],
  nbRemainingRoll: number,
  rolling: boolean
}

export default class App extends Component<{}, AppState> {
  
  constructor(props: any){
    super(props)
    this.state = {
      players: [
        new Player('Thomas', 'fdskf', new ScoringBoardModel({1: 2}, {0: 24, 2: true, 3: false})),
        new Player('Mélanie', 'fddsskf', new ScoringBoardModel({}, {})),
        new Player('Kevin', 'fddsskf', new ScoringBoardModel({}, {}))
      ],
      dices: Array(NB_DICES).fill('').map(e => new DiceModel()),
      nbRemainingRoll: 1,
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

  get possibilities(){
    return ['ok']
  } 

  render(){
    return <div className="App">
      <div className='roll-zone'>
        <div className="current-player">
          <div className="current-player-name">{this.state.players[0].name}</div>
        </div>
        
        <div className="dices-to-roll">
          {this.state.dices.filter(d => !d.isLocked).map( (d, k) => 
            <Dice 
              dice={d}
              onClick={() => this.handleDiceClick(d, k)} 
              roll={this.state.rolling}
            />
          )}
        </div>

        <button
          className='roll-btn'
          onClick={this.roll}
          disabled={this.state.nbRemainingRoll === 0}
        >Roll !</button>


        <div className="dices-locked">
          <h2 className='dices-locked-title'>Locked dices</h2>
          <div className="dices-locked-content">
            {this.state.dices.filter(d => d.isLocked).map( (d, k) => 
              <Dice dice={d} onClick={() => this.handleDiceClick(d, k)} roll={false} />
            )}
          </div>
        </div>

        <div className="turn-possibilities">
          <h2 className='turn-possibilities-title'>Possibilities</h2>
          <div className="turn-possibilities-content">
              {this.possibilities.map(p => <div>{p}</div>)}
          </div>
        </div>
      </div>
      
      <div className='scoring-board-zone'>
        <ScoringBoard 
          players={this.state.players}
        />
      </div>
    </div>
  };
}