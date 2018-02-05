/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-05 21:35
 * @version 1.0
 * Description:
 */

import React from 'react';
import Block from '../component/block';
import {disorganize, getTargetState, arrayGenerate} from '../util/util';

const level = 5,length = level*level;

function Status(props) {
    const str =  props.value+" x " +props.value;
    return (
        <div className="nav-bar">
            <span className="show-status">{str}</span>
            <span className="go-back"></span>
        </div>
    );
}

export default class Simple extends React.Component {
    constructor() {
        super();
        this.state = {
            level: level,
            squares: arrayGenerate(length),
        };
        this.handleClick = this.handleClick.bind(this);
        let size = Math.min(window.innerWidth-20,window.innerHeight);
        this.blockSize = Math.floor(size/60)*60;
    }
    handleClick(dir, index) {
    };
    render() {
        console.log('block',this.blockSize);
        return (
            <div className="game-box">
                <Status value={this.state.level}/>
                <div className="simple-box">
                    <Block
                        handle={this.handleClick}
                        level={this.state.level}
                        squares={this.state.squares}
                        size = {this.blockSize}
                    />
                    <div className="filter-box"></div>
                </div>
                <div className="start-button be-center"></div>
            </div>
        );
    }
}