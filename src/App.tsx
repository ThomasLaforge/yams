import React, {Component} from 'react';
import './App.scss';

import ScoringBoard from './components/ScoringBoard/ScoringBoard';
import Dice from './components/Dice/Dice';

import { Player } from './modules/Player';
import { ScoringBoard as ScoringBoardModel } from './modules/ScoringBoard';
import { Dice as DiceModel } from './modules/Dice';
import { NB_DICES, DiceValue, ScoringMission, MAX_ROLL } from './modules/defs';
import { DiceTurn } from './modules/DiceTurn';

interface AppState {
  currentPlayerIndex: number,
  players: Player[],
  dices: DiceModel[],
  nbRemainingRoll: number,
  rolling: boolean,
  myIndex: number
}

export default class App extends Component<{offline: boolean}, AppState> {
  
  constructor(props: any){
    super(props)
    this.state = {
      currentPlayerIndex: 0,
      myIndex: 0,
      players: [
        new Player('Thomas', 'fdskf', new ScoringBoardModel()),
        new Player('Mélanie', 'fddsskf', new ScoringBoardModel()),
      ],
      dices: Array(NB_DICES).fill('').map(e => new DiceModel()),
      nbRemainingRoll: MAX_ROLL - 1,
      rolling: false
    }
  }

  roll = () => {
    const dices = this.state.dices.slice()
    dices.forEach( (d, i) => d.value = d.isLocked ? d.value : d.value = Math.floor(Math.random() * 6) + 1 as DiceValue )
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
    if(this.state.currentPlayerIndex === playerIndex){
      const players = this.state.players.slice()
      players[this.state.currentPlayerIndex].scoringBoard.completeValueContract(diceValue, this.state.dices.filter(d => d.value === diceValue).length)
      this.setState({
        players, 
        nbRemainingRoll: MAX_ROLL - 1, 
        dices: this.state.dices.slice().map(d => {
          d.value = Math.floor(Math.random() * 6) + 1 as DiceValue
          d.isLocked = false
          return d
        }),
        currentPlayerIndex: (this.state.currentPlayerIndex + 1) % this.state.players.length,
        myIndex: this.props.offline ? (this.state.myIndex + 1) % this.state.players.length : this.state.myIndex
      })
    }
  }

  handleClickOnMissionContract = (playerIndex: number, mission: ScoringMission) => {
    console.log('click on mission contract', this.state.currentPlayerIndex === playerIndex, playerIndex, mission)
    if(this.state.currentPlayerIndex === playerIndex){
      const players = this.state.players.slice()

      let contractValue: boolean | number = false
      const turn = new DiceTurn(this.state.dices)
      if(mission === ScoringMission.Chance || (mission === ScoringMission.Brelan && turn.isBrelan())){
        console.log('is brelan or change', mission, ScoringMission.Brelan, ScoringMission.Chance, turn.getSum())
        contractValue = turn.getSum()
      }
      else if(
        (mission === ScoringMission.Carre && turn.isCarre()) ||
        (mission === ScoringMission.Full && turn.isFull()) ||
        (mission === ScoringMission.Yam && turn.isYams()) ||
        (mission === ScoringMission.PetiteSuite && turn.isSmallSuite()) ||
        (mission === ScoringMission.GrandeSuite && turn.isBigSuite()) 
      ){
        contractValue = true
      }

      players[this.state.currentPlayerIndex].scoringBoard.completeContract(mission, contractValue)
      this.setState({
        players, 
        nbRemainingRoll: MAX_ROLL - 1, 
        dices: this.state.dices.slice().map(d => {
          d.value = Math.floor(Math.random() * 6) + 1 as DiceValue
          d.isLocked = false
          return d
        }),
        currentPlayerIndex: (this.state.currentPlayerIndex + 1) % this.state.players.length,
        myIndex: this.props.offline ? (this.state.myIndex + 1) % this.state.players.length : this.state.myIndex
      })
    }
  }

  render(){
    return <div className="App">
      <div className='roll-zone'>
        <div className="current-player">
          <div className="current-player-name">{this.state.players[this.state.currentPlayerIndex].name}</div>
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