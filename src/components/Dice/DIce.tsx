import React from 'react';
import './Dice.scss'

import { Dice as DiceModel } from '../../modules/Dice';

// All credits to https://github.com/tryton-vanmeer/React-Dice-Roller

interface DiceProps {
    dice?: DiceModel,
    selected?: boolean
}
interface DiceState {

}

export default class Dice extends React.Component<DiceProps, DiceState> {
    private sides = [
        "translateZ(-100px) rotateY(0deg)",
        "translateZ(-100px) rotateX(-180deg)",
        "translateZ(-100px) rotateY(-90deg)",
        "translateZ(-100px) rotateY(90deg)",
        "translateZ(-100px) rotateX(-90deg)",
        "translateZ(-100px) rotateX(90deg)"
    ];
    private dieRef = React.createRef<HTMLDivElement>();

    componentDidMount(){
        let initRoll = !!this.props.dice ? this.props.dice.value - 1 : Math.floor(Math.random() * (this.sides.length))
        this.dieRef.current!.style.transform = this.sides[initRoll];
    }

    componentDidUpdate(){
        this.props.dice && !this.props.dice.isLocked && this.roll()
    }

    roll = () => {
        let sides = this.sides
        this.dieRef.current!.classList.add("rolling");

        setTimeout( () => {
            let roll = !!this.props.dice ? this.props.dice.value - 1 : Math.floor(Math.random() * (sides.length))
            this.dieRef.current!.classList.remove("rolling");
            this.dieRef.current!.style.transform = sides[roll];
        }, 750);
    }

    render(){
        let divs = this.sides.map((side, index) => {
            return <div key={index} className="side">{index+1}</div>
        });

        return (
            <div className="die-container" /*onClick={ this.roll }*/>
                <div ref={this.dieRef} className={'die-content d' + this.sides.length}>
                    { divs }
                </div>
            </div>
        );
    }
}