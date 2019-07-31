import React, {Component} from 'react';
import './App.scss';

import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import Dice from './components/Dice/Dice';

import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import { Dice as DiceModel } from './modules/Dice';
import { NB_DICES } from './modules/defs';

interface AppState {
  players: Player[],
  dices: DiceModel[],
  nbRemainingRoll: number
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
      nbRemainingRoll: 1
    }
  }

  roll = () => {
    const dices = this.state.dices
    dices.forEach(d => d.roll())
    dices.forEach( (d,i) => i > 2 && d.lock())
    this.setState({ dices, nbRemainingRoll: this.state.nbRemainingRoll - 1 })
  }

  render(){
    return <div className="App">
      <div className='roll-zone'>
        <div className="current-player">
          <div className="current-player-name">{this.state.players[0].name}</div>
        </div>
        
        <div className="dices-to-roll">
          {this.state.dices.filter(d => !d.isLocked).map( (d, k) => 
            <Dice dice={d} />
          )}
        </div>

        <button
          className='roll-btn'
          onClick={this.roll}
          disabled={this.state.nbRemainingRoll === 0}
        >Roll !</button>


        <h2 className='dices-locked-title'>Locked dices</h2>
        <div className="dices-locked">
          {this.state.dices.filter(d => d.isLocked).map( (d, k) => 
            <Dice dice={d} />
          )}
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