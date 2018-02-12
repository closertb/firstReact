/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-05 21:35
 * @version 1.0
 * Description:
 */

import React from 'react';
import Block from '../component/block';
import {arrayGenerate} from '../util/util';
import {Link} from 'react-router-dom';

function Status(props) {
    const str = props.value + " x " + props.value;
    return (
        <div className="nav-bar">
            <span className="show-status">{str}</span>
            <Link to="/"><span className="go-back"></span></Link>
        </div>
    );
}

export default class Simple extends React.Component {
    constructor(props) {
        super(props);
        this.level = this.props.location.query.level;
        this.length = this.level * this.level;
        this.state = {
            level: this.level,
            squares: arrayGenerate(this.length),
        };
        this.handleClick = this.handleClick.bind(this);
        let size = Math.min(window.innerWidth - 20, window.innerHeight);
        this.blockSize = Math.floor(size / 60) * 60;
    }

    handleClick(dir, index) {
    };

    render() {
        const link = {
            pathname: '/game',
            query: {
                level: this.level
            }
        };
        return (
            <div className="game-box">
                <Status value={this.state.level}/>
                <Block
                    handle={this.handleClick}
                    level={this.state.level}
                    squares={this.state.squares}
                    size={this.blockSize}
                    simple={true}
                />
                <Link to={link}> <div className="start-button be-center"></div></Link>
            </div>
        );
    }
}