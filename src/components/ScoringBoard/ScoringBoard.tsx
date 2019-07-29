import React, {Component} from 'react';

import {Player as PlayerModel} from '../../modules/Player'
import { getContractPoints, getContractName } from '../../modules/defs';

interface ScoringBoardProps {
    player: PlayerModel
}

interface ScoringBoardState {

}

export default class ScoringBoard extends Component<ScoringBoardProps, ScoringBoardState> {
  
  constructor(props: any){
    super(props)
    this.state = {
    }
  }

  renderDiceValuesScoring(){
      return Array(6).fill('').map( (e, i) => {
          const diceValue = i + 1
          return <tr>
              <td>{diceValue}</td>
              <td>{this.props.player.scoringBoard.diceValues[diceValue]}</td>
          </tr>
      })
  }

  renderContractScoring(){
      return Array(this.props.player.scoringBoard.nbContractsToComplete).fill('').map( (e, i) => {
        const contractValue = this.props.player.scoringBoard.contracts[i]
        let contractValueToShow = ''
        if(contractValue === false){
            contractValueToShow = 'X'
        }
        else if(!!contractValue){
            contractValueToShow = getContractPoints(i).toString()
        }
        return <tr>
            <td>{getContractName(i)}</td>
            <td>{contractValueToShow}</td>
        </tr>
      })
  }

  render(){
    const {name, scoringBoard} = this.props.player

    return <div className="scoring-board">
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>{this.props.player.name}</th>
                </tr>
                
                {this.renderDiceValuesScoring()}

                <tr>
                    <td>Total sans bonus</td>
                    <td>{scoringBoard.getValuesScore(false)}</td>
                </tr>
                <tr>
                    <td>Total avec bonus</td>
                    <td>{scoringBoard.getValuesScore(true)}</td>
                </tr>
                
                {this.renderContractScoring()}

                <tr>
                    <td>Total contrats</td>
                    <td>{scoringBoard.contractScore}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{scoringBoard.score}</td>
                </tr>
            </tbody>
        </table>
    </div>
  };
}