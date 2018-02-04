/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:20
 * @version 1.0
 * Description:
 */
import React from 'react';
import Block from './block';
import {disorganize, getTargetState} from './util';

const level = 3,length=level*level;

function Status(props) {
    const className = props.isSuccess ? 'show-status success-status' : 'show-status';
    return (
        <div className={className}>{props.value}</div>
    );
}

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            status: '进行中',
            success: false,
            level: level,
            squares: disorganize(level)
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(dir, index) {
        const squares = this.state.squares.slice();
        const newIndex = getTargetState(level, index, dir);
        if (newIndex === index || squares[newIndex] !== 0) {
            return;
        }
        let temp = squares[index];
        squares[index] = squares[newIndex];
        squares[newIndex] = temp;
        var isSuccess = squares.every((t, index) => {
            return t === (index + 1)%length;
        });

        if (isSuccess) {
            this.setState({
                status: '成功了',
                squares: squares,
                success: true
            });
        } else {
            this.setState({
                squares: squares
            });
        }
        console.log('posNew:', newIndex);
    };

    render() {
        return (
            <div>
                <Status value={this.state.status} isSuccess={this.state.success}/>
                <Block
                    handle={this.handleClick}
                    level={this.state.level}
                    squares={this.state.squares}/>
            </div>
        );
    }
}