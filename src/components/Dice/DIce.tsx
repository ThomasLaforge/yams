import React from 'react';
import './Dice.scss'

// All credits to https://github.com/tryton-vanmeer/React-Dice-Roller

interface DiceProps {
    value: false | number
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

    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.render = this.render.bind(this);
    }

    handleClick() {
        let die = document.getElementById("die") as HTMLElement
        let sides = this.sides

        die.classList.add("rolling");

        setTimeout( () => {
            let roll = !!this.props.value ? this.props.value - 1 : Math.floor(Math.random() * (sides.length))
            die.classList.remove("rolling");
            die.style.transform = sides[roll];
        }, 750);
    }

    render() {
        let divs = this.sides.map((side, index) => {
            return <div key={index} className="side">{index+1}</div>
        });

        return (
            <div className="die-container" onClick={ this.handleClick }>
                <div id="die" className={'d' + this.sides.length}>
                    { divs }
                </div>
            </div>
        );
    }
}