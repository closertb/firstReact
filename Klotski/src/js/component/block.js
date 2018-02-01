/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-01 22:17
 * @version 1.0
 * Description:
 */
import React from 'react';


function Square(props) {
    return (
        <li className="square" onClick={props.onClick}>
        <span>{props.value}</span>
        </li>
);
}

export default class Block extends React.Component{
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    render() {
        return (
            <ul className="widget-block">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </ul>
        );
    }
}