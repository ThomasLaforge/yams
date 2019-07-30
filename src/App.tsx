import React, {Component} from 'react';
import './App.css';
import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import Dice from './components/Dice/Dice';

interface AppState {
  diceValues: number[]
}

export default class App extends Component<{}, AppState> {
  
  constructor(props: any){
    super(props)
    this.state = {
      diceValues: [2]
    }
  }

  roll = () => {
    this.setState({diceValues: [1,2,3]})
  }

  render(){
    return <div className="App">
      <div className='roll-part'>
        <Dice value={this.state.diceValues[0]} />
        <Dice value={this.state.diceValues.length > 1 && this.state.diceValues[1]} />

        <button
          onClick={this.roll}
        >Roll !</button>
      </div>
      
      <ScoringBoard 
        players={[
          new Player('Thomas', 'fdskf', new ScoringBoardModel({1: 2}, {0: 24, 2: true, 3: false})),
          new Player('Mqélasnissse', 'fddsskf', new ScoringBoardModel({}, {})),
          new Player('Mélanissse', 'fddsskf', new ScoringBoardModel({}, {}))
        ]}
      />
    </div>
  };
}