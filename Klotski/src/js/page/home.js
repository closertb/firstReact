/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-05 22:57
 * @version 1.0
 * Description:
 */
import React from 'react';
import {arrayGenerate} from "../util/util";

export default class Home extends React.Component {
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

    }
}
