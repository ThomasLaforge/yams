import React, {Component} from 'react';
import uniq from 'lodash/uniq'
import {fluc} from '../../Utils'

import {Player as PlayerModel} from '../../modules/Player'
import { getContractPoints, getContractName } from '../../modules/defs';

import './style.scss'

interface ScoringBoardProps {
    players: PlayerModel[],
    isCurrentPlayer: boolean,
    currentPlayerIndex: number,
    clickOnValueContract: Function,
    clickOnMissionContract: Function
}

interface ScoringBoardState {

}

export default class ScoringBoard extends Component<ScoringBoardProps, ScoringBoardState> {
  
  constructor(props: any){
    super(props)
    this.state = {
    }
  }

  get currentPlayer(){
    return this.props.players[this.props.currentPlayerIndex]
  }

  renderDiceValuesScoring(){
    return Array(6).fill('').map( (e, i) => {
      const diceValue = i + 1
      return <tr key={i}>
          <td>{diceValue}</td>
          {this.props.players.map( (p, k) => {
            const hasScore = !!p.scoringBoard.diceValues[diceValue] || p.scoringBoard.diceValues[diceValue] === 0
            return <td 
              key={k} 
              className={ (!hasScore && this.props.isCurrentPlayer && this.props.currentPlayerIndex === k) ? 'possible-case' : ''}
              onClick={() => !hasScore && this.props.clickOnValueContract(k, diceValue)}
            >
              {(!!p.scoringBoard.diceValues[diceValue] || p.scoringBoard.diceValues[diceValue] === 0) ? p.scoringBoard.diceValues[diceValue] * diceValue : ''}
            </td>
          })}
      </tr>
    })
  }

  renderContractScoring(){
    return Array(this.props.players[0].scoringBoard.nbContractsToComplete).fill('').map( (e, i) => {
      return <tr key={i}>
          <td>{fluc(getContractName(i))}</td>
          {this.props.players.map( (p, k) => {
            const contractValue = p.scoringBoard.contracts[i]
            let contractValueToShow = contractValue || ''
            
            if(contractValue === false){
              contractValueToShow = 'X'
            }
            else if(contractValue === true){
              contractValueToShow = getContractPoints(i).toString()
            }
            
            return <td 
                key={k} 
                className={ (contractValueToShow === '' && this.props.isCurrentPlayer && this.props.currentPlayerIndex === k) ? 'possible-case' : ''}              
                onClick={() => contractValueToShow === '' && this.props.clickOnMissionContract(k, i)}
              >
                {contractValueToShow}
              </td>
          })}
      </tr>
    })
  }

  renderTopScoringBoard(){
    const playerNames = this.props.players.map(p => p.name.toLowerCase())
    let shortNames = playerNames.map(pName => pName[0].toLowerCase())

    const maxPlayerNameLength = playerNames.reduce( (max: number, name: string) => Math.max(name.length, max), 0)

    let cpt = 0
    while(uniq(shortNames).length !== shortNames.length && cpt < maxPlayerNameLength){
      // eslint-disable-next-line
      shortNames = shortNames.map( (shortName, i) => {
        const shortNameDuplicate = shortNames.filter( (s: string) => s === shortName).length > 1
        return shortNameDuplicate ? (shortName + (playerNames[i][shortName.length] || '')) : shortName
      })
      cpt++
    }

    // First Letter uppercase
    shortNames = shortNames.map( shortName => shortName.charAt(0).toUpperCase() + shortName.slice(1) )

    return (
      <table className='table'>
      <tbody>
        <tr>
          <th className='empty-case'></th>
          {shortNames.map( (shortName, k) => 
          <th key={k}>
              {shortName}
          </th>
          )}
        </tr>
        
        {this.renderDiceValuesScoring()}

        <tr className='total-score-sub-category'>
          <td>Total sans bonus</td>
          {this.props.players.map( (p, k) => 
          <td key={k}>
              {p.scoringBoard.getValuesScore(false)}
          </td>
          )}
        </tr>
        <tr className='total-score-category'>
          <td>Total avec bonus</td>
          {this.props.players.map( (p, k) => 
          <td key={k}>
              {p.scoringBoard.getValuesScore(true)}
          </td>
          )}
        </tr>
      </tbody>
      </table>
    )
  }

  renderBottomScoringBoard(){
    return (
      <table className='table'>
      <tbody>
        {this.renderContractScoring()}
        <tr className='total-score-category'>
          <td>Total contrats</td>
          {this.props.players.map( (p, k) => 
            <td key={k}>
              {p.scoringBoard.contractScore}
            </td>    
          )}
        </tr>
      </tbody>
      </table>
    )

  }

  renderTotalScore(){
    return (
      <table className='table'>
      <tbody>
        <tr className='total-score-global'>
          <td>Total</td>
          {this.props.players.map( (p, k) => 
            <td key={k}>{p.scoringBoard.score}</td>
          )}
        </tr>
      </tbody>
      </table>
    )
  }

  render(){
    return <div className="scoring-board">
      {/* <div className='image-title' /> */}
      <h2 className="scoring-board-title">Tableau des scores</h2>
      {this.renderTopScoringBoard()}
      {this.renderBottomScoringBoard()}
      {this.renderTotalScore()}
    </div>
  };
}