/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-01-29 21:20
 * @version 1.0
 * Description:
 */

import React from 'react';

export class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <button className="square" onClick={() =>this.setState({
                value:'X'
            })}>
                {this.state.value}
            </button>
        );
    }
}