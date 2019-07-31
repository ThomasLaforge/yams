import React, {Component} from 'react';
import './App.scss';
import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import Dice from './components/Dice/Dice';

interface AppState {
  diceValues: number[],
  players: Player[]
}

export default class App extends Component<{}, AppState> {
  
  constructor(props: any){
    super(props)
    this.state = {
      diceValues: [2],
      players: [
        new Player('Thomas', 'fdskf', new ScoringBoardModel({1: 2}, {0: 24, 2: true, 3: false})),
        new Player('Mqélasnissse', 'fddsskf', new ScoringBoardModel({}, {})),
        new Player('Mélanissse', 'fddsskf', new ScoringBoardModel({}, {}))
      ]
    }
  }

  roll = () => {
    this.setState({diceValues: [1,2,3]})
  }

  render(){
    return <div className="App">
      <div className='roll-zone'>
        <div className="current-player">
          <div className="current-player-name">{this.state.players[0].name}</div>
        </div>
        
        <div className="dices-to-roll">
          <Dice value={this.state.diceValues[0]} />
          <Dice value={this.state.diceValues.length > 1 && this.state.diceValues[1]} />
        </div>

        <button
          onClick={this.roll}
        >Roll !</button>
      </div>
      
      <div className='scoring-board-zone'>
        <ScoringBoard 
          players={this.state.players}
        />
      </div>
    </div>
  };
}