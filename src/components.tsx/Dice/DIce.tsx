import React from 'react';
import './Die.css'

// All credits to https://github.com/tryton-vanmeer/React-Dice-Roller

class Die extends React.Component {
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
        var die = document.getElementById("die") as HTMLElement
        var sides = this.sides

        die.classList.add("rolling");

        setTimeout(function () {
            var roll = Math.floor(Math.random() * (sides.length))
            die.classList.remove("rolling");
            die.style.transform = sides[roll];
        }, 750);
    }

    render() {
        let divs = this.sides.map((side, index) => {
            return <div className="side">{index+1}</div>
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

export default Die;