import React from 'react';
import './Dice.scss'

import { Dice as DiceModel } from '../../modules/Dice';

// All credits to https://github.com/tryton-vanmeer/React-Dice-Roller

interface DiceProps {
    dice?: DiceModel,
    selected?: boolean,
    onClick?: Function
    roll?: boolean,
    id?: any
}
interface DiceState {

}

export default class Dice extends React.PureComponent<DiceProps, DiceState> {
    private sides = [
        "translateZ(-100px) rotateY(0deg)",
        "translateZ(-100px) rotateX(-180deg)",
        "translateZ(-100px) rotateY(-90deg)",
        "translateZ(-100px) rotateY(90deg)",
        "translateZ(-100px) rotateX(-90deg)",
        "translateZ(-100px) rotateX(90deg)"
    ];

    render(){

        let divs = this.sides.map((side, index) => {
            return <div key={index} className="side">{index+1}</div>
        });
        let roll = !!this.props.dice ? this.props.dice.value - 1 : Math.floor(Math.random() * (this.sides.length))

        return (
            <div 
                key={this.props.id}
                className="die-container" 
                onClick={() => this.props.onClick && this.props.onClick()} 
            >
                <div 
                    className={'die-content d' 
                        + this.sides.length 
                        + (!!this.props.roll ? ' rolling' : '')
                    }
                    style={{
                        'transform': !this.props.roll ? this.sides[roll] : ''
                    }}
                >
                    { divs }
                </div>
            </div>
        );
    }
}