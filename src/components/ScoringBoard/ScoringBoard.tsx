import React, {Component} from 'react';

import {Player as PlayerModel} from '../../modules/Player'
import { getContractPoints, getContractName } from '../../modules/defs';

interface ScoringBoardProps {
    players: PlayerModel[]
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

  renderTopScoringBoard(){
    return (
        <table>
            <tr>
                <th></th>
                <th>{name}</th>
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
        </table>
    )
  }

  renderBottomScoringBoard(){
      return (
          <table>
                {this.renderContractScoring()}
                <tr>
                    <td>Total contrats</td>
                    {this.props.players.map(p => 
                        <td>
                            {p.scoringBoard.contractScore}
                        </td>    
                    )}
                </tr>
          </table>
      )

  }

  renderTotalScore(){
      return (
        <table>
        <tr>
            <td>Total</td>
            {this.props.players.map(p => 
                <td>{p.scoringBoard.score}</td>
            )}
        </tr>
        </table>
      )
  }

  render(){
    return <div className="scoring-board">
        {this.renderTopScoringBoard()}
        {this.renderBottomScoringBoard()}
        {this.renderTotalScore()}
    </div>
  };
}