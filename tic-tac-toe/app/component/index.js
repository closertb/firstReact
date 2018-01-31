/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-01-29 21:25
 * @version 1.0
 * Description:
 */
import React from 'react';

import  { Board } from './board';

export class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}